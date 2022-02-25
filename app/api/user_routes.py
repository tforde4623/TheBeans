from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Post, Room
from sqlalchemy import or_

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
    return jsonify([post.to_dict_with_owner_comments() for post in posts])


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return jsonify(user.to_dict())


@user_routes.route('/search/<searchTerm>')
@login_required
def search_users(searchTerm):
    query = f'%{searchTerm.replace("+", " ")}%'
    users = User.query.filter(User.username.ilike(query)).limit(5).all()

    return jsonify([user.to_dict() for user in users])


@user_routes.route('/<user_id>/rooms')
@login_required
def get_user_rooms(user_id):
    if current_user.id == int(user_id):
        user_rooms = Room.query.filter(
            or_(Room.sender_id == user_id, Room.recipient_id == user_id)).all()

        return jsonify([room.get_room_with_other(
            current_user.to_dict()['id'], User) for room in user_rooms])

    return jsonify({'errors': 'unauthorized'})
