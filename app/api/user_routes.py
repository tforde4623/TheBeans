from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from app.models import Post

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return jsonify({'users': [user.to_dict() for user in users]})


@user_routes.route('/<int:id>/posts')
@login_required
def user_posts(id):
    posts = Post.query.filter_by(user_id=id).all()
    return jsonify([post.to_dict() for post in posts])


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return jsonify(user.to_dict())
