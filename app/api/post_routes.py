from flask import Blueprint, jsonify, request
#from flask_login import login_required
from app.models import db, Post

post_routes = Blueprint('posts', __name__)


# TODO uncomment the login_required for routes
## GET '/api/posts' ##
@post_routes.route('/', methods=['get'])
#@login_required
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
    data = request.json
    new_post = Post(title=data['title'],
                    description=data['description'],
                    img_url=data['img_url'],
                    user_id=data['user_id'])
    db.session.add(new_post)
    db.session.commit()
    
    return jsonify(new_post.to_dict_with_owner())


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
