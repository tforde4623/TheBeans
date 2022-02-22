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
    print(users)

    return jsonify([user.to_dict() for user in users])


# helper for next route:
# include user dict of the user that is not you
def prepRoom(room, curr_user_id):
    r_dict = room.to_dict()
    print(r_dict)
    if curr_user_id == r_dict['recipient_id']:
        other_id = r_dict['sender_id']
    else:
        other_id = r_dict['recipient_id']

    r_dict['other_user'] = User.query.filter_by(
        id=other_id).one().to_dict()

    return r_dict


@user_routes.route('/<user_id>/rooms')
@login_required
def get_user_rooms(user_id):
    if current_user.id == int(user_id):
        user_rooms = Room.query.filter(
            or_(Room.sender_id == user_id, Room.recipient_id == user_id)).all()

        return jsonify([prepRoom(room, current_user) for room in user_rooms])

    return jsonify({'errors': 'unauthorized'})
