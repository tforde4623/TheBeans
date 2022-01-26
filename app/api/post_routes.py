from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Post
from app.forms import CreatePostForm
from .upload_img  import upload_img
import uuid

post_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# TODO uncomment the login_required for routes
## GET '/api/posts' ##
@post_routes.route('/', methods=['get'])
@login_required
def posts():
    """
    get all posts route (will include owner for display on posts)
    sort by 'newest'
    res -> [{poststuff, owner: ownerstuff}...]
    """
    posts = Post.query.all()
    return jsonify([post.to_dict_with_owner_comments() for post in posts])


## GET '/api/posts/:postId' ##
@post_routes.route('/<id>')
@login_required
def post_by_id(id):
    """
    get a single post by id
    res -> {poststuff, owner: ownerstuff}
    """
    post = Post.query.filter_by(id=id).one()
    return jsonify(post.to_dict_with_owner_comments())


@post_routes.route('/', methods=['post'])
@login_required
def create_post():
    """
    this route will be used to handle uploading images
    and storing them remotely
    """
    form = CreatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token'];
    form.data['title'] = request.form.get('title')
    form.data['description'] = request.form.get('description')
    form.data['category_id'] = request.form.get('category_id')

    if form.validate_on_submit() and 'i' in request.files:
        # generate uuid for filename
        file_name = uuid.uuid4()
        # save fields to db
        new_post = Post(title=request.form.get('title'),
                        description=request.form.get('description'),
                        # store aws url as imgUrl
                        img_url=f'https://bucketobeans.s3.us-east-2.amazonaws.com/{file_name}.jpg',
                        user_id=request.form.get('user_id'))
        db.session.add(new_post)
        db.session.commit()

        # upload photo to s3 bucket
        data = request.files['i']
        upload_img(data, file_name)

        # on success return the new posts info as a dict
        return jsonify(new_post.to_dict_with_owner_comments())

    err_msgs = validation_errors_to_error_messages(form.errors)

    if 'i' not in request.files:
        err_msgs.append('Image required.')

    return jsonify({'errors': err_msgs}), 401


## PUT '/api/posts/:postId' ##
@post_routes.route('/<id>', methods=['put'])
@login_required
def edit_post(id):
    """
    edit a post by id
    expects { title..., description... }
    image stays constant, can edit title or description
    still validates input
    """
    form = CreatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token'];

    if form.validate_on_submit():
        data = request.json
        old_post = Post.query.filter_by(id=id).one()
        old_post.title = data['title']
        old_post.description = data['description']
        db.session.commit()

        return jsonify(old_post.to_dict_with_owner_comments())

    # we know errors are present if we get here
    err_msgs = validation_errors_to_error_messages(form.errors)
    return jsonify({'errors': err_msgs}), 401


## DELETE '/api/posts/:postId' ##
@post_routes.route('/<id>', methods=['delete'])
#@login_required
def delete_post(id):
    """
    delete a post by id
    """
    post = Post.query.filter_by(id=id).one()
    db.session.delete(post)
    db.session.commit()
    return jsonify({}), 204
