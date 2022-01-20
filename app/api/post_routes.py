from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Post
from app.forms import CreatePostForm
from .upload_img  import upload_img

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
    res -> [{poststuff, owner: ownerstuff}...]
    """
    posts = Post.query.all()
    return jsonify([ post.to_dict_with_owner() for post in posts ])


## GET '/api/posts/:postId' ##
@post_routes.route('/<id>')
#@login_required
def post_by_id(id):
    """
    get a single post by id
    res -> {poststuff, owner: ownerstuff}
    """
    post = Post.query.filter_by(id=id).one()
    return jsonify(post.to_dict_with_owner())


## POST '/api/posts' ##
@post_routes.route('/', methods=['post'])
#@login_required
def new_post():
    """
    add new post
    res -> {poststuff, owner: ownerstuff}
    should contain: { title..., description..., img_url..., user_id... }
    """
    form = CreatePostForm()
    # take csrf token from cookie put into form for validation
    form['csrf_token'].data = request.cookies['csrf_token']; # TODO: test this

    if form.validate_on_submit():
        data = request.json

        # attempt to do a file upload (TODO: add validation on filetype)
        upload_img(data['img_file'])

        new_post = Post(title=data['title'],
                        description=data['description'],
                        # store aws url as imgUrl
                        img_url=data['imgUrl'],
                        user_id=data['userId'])
        db.session.add(new_post)
        db.session.commit()
        return jsonify(new_post.to_dict_with_owner())

    # if form submission fails
    return {'errors', validation_errors_to_error_messages(form.errors)}, 401


## PUT '/api/posts/:postId' ##
@post_routes.route('/<id>', methods=['put'])
#@login_required
def edit_post(id):
    """
    edit a post by id
    expects { title..., description..., img_url...  ? }
    """
    data = request.json
    old_post = Post.query.filter_by(id=id).one()
    old_post.title = data['title']
    old_post.description = data['description']
    old_post.img_url = data['img_url']
    db.session.commit()

    return jsonify(old_post.to_dict_with_owner())


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
