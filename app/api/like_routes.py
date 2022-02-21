from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Like
from app.forms import LikeForm

like_routes = Blueprint('likes', __name__)


def val_err_msgs(validation_errors):
    """
    turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append({field: error})
    return errorMessages


# GET '/api/likes/' get all likes
@like_routes.route('/')
@login_required
def get_likes():
    likes = Like.query.all()
    return jsonify([like.to_dict() for like in likes])


# POST '/api/likes/' create a like #
@like_routes.route('/', methods=['POST'])
@login_required
def create_like():
    form = LikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    data = request.json

    check = Like.query.filter_by(
        user_id=data['user_id'],
        post_id=data['post_id']).all()

    if form.validate_on_submit() and not len(check):
        new_like = Like(user_id=data['user_id'], post_id=data['post_id'])
        db.session.add(new_like)
        db.session.commit()
        return jsonify(new_like.to_dict())

    if len(form.errors):
        return jsonify({'errors': val_err_msgs(form.errors)}), 401

    else:
        return jsonify({'errors': 'unauthorized'}), 401


# DELETE '/api/likes/:likeId' removes a like
@like_routes.route('/<int:like_id>', methods=['DELETE'])
@login_required
def remove_like(like_id):
    like = Like.query.filter_by(id=like_id).one()

    if current_user.id == like.user_id:
        db.session.delete(like)
        db.session.commit()
        return jsonify(like_id)

    return jsonify({'errors': 'unauthorized'}), 401
