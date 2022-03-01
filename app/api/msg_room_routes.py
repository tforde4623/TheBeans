from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Room, User
from sqlalchemy import or_, and_


# this file contains routes pertaining to Messages and Rooms
# most of the message "crud" will be done using sockets in a seperate file

chat_routes = Blueprint('chat', __name__)


# TODO: we need to make sure the user isn't making a convo with themself,
# or with someone who they already have a chat with
@chat_routes.route('/rooms', methods=['POST'])
@login_required
def create_room():
    data = request.json
    errors = {}

    if 'recipient_id' not in data:
        errors['recipient_id'] = 'required data'

    else:
        search_room = Room.query.filter(
            or_(
                and_(
                    Room.sender_id == data['recipient_id'],
                    Room.recipient_id == current_user.id),
                and_(
                    Room.recipient_id == data['recipient_id'],
                    Room.sender_id == current_user.id)
            )
        ).all()

        if len(search_room):
            return jsonify(
                {'errors': 'room already exists', 'room_id': search_room[0]})

        new_room = Room(
            sender_id=current_user.id,
            recipient_id=data['recipient_id'])

        db.session.add(new_room)
        db.session.commit()

        return jsonify(
            new_room.get_room_with_other(
                current_user.to_dict()['id'], User))

    return jsonify({'errors': errors})


@chat_routes.route('/rooms/<room_id>/messages')
@login_required
def room_msgs(room_id):
    room = Room.query.filter_by(id=room_id).one()

    if room.sender_id == current_user.id or \
            room.recipient_id == current_user.id:
        return jsonify(room.get_room_msgs())

    return jsonify({'errors': 'unauthorized'})
