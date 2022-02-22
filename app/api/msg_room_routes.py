from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Room


# this file contains routes pertaining to Messages and Rooms
# most of the message "crud" will be done using sockets in a seperate file

chat_routes = Blueprint('chat', __name__)


@chat_routes.route('/rooms', methods=['POST'])
@login_required
def create_room():
    data = request.json()
    errors = {}

    if 'recipient_id' not in data:
        errors['recipient_id'] = 'required data'

    else:
        new_room = Room(
            sender_id=current_user.id,
            recipient_id=data['recipient_id'])

        db.session.add(new_room)
        db.session.commit()

        return jsonify(new_room.to_dict())

    return jsonify({'errors': errors})


@chat_routes.route('/rooms/<room_id>/messages')
@login_required
def room_msgs(room_id):
    room = Room.query.filter_by(id=room_id).one()

    if room.sender_id == current_user.id or \
            room.recipient_id == current_user.id:
        return jsonify(room.get_room_msgs())

    return jsonify({'errors': 'unauthorized'})
