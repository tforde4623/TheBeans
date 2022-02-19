from flask import Blueprint, request, jsonify
from flask_login import login_required
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


# POST '/api/likes' create a like #
@like_routes('/', methods=['POST'])
@login_required
def create_like():
    form = LikeForm()
    form['csrf-token'].data = request.cookies('csrf-token')

    data = request.json

    if form.validate_on_submit():
        new_like = Like(user_id=data['user_id'], post_id=data['post_id'])
        db.session.add(new_like)
        db.session.commit()
        return jsonify(new_like)

    return jsonify({'errors': val_err_msgs(form.errors)})
