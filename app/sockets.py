import os
from flask_socketio import ConnectionRefusedError, SocketIO, emit, join_room
from flask_login import current_user
from app.models import db, Message, Room

if os.environ.get("FLASK_ENV") == 'production':
    origins = [
        # hero stuff here
    ]
else:
    origins = "*"

socket = SocketIO(cors_allowed_origins=origins)


@socket.on('connect')
def handle_connect():
    if not current_user.is_authenticated:
        raise ConnectionRefusedError('unauthorized')


@socket.on('message')
def handle_message(data):
    room_id = str(data['room_id'])
    room = Room.query.filter_by(id=room_id).one()

    # add msg to db
    if current_user.id == room.sender_id or \
            current_user.id == room.recipient_id:
        new_msg = Message(
            content=data['content'],
            owner_id=current_user.id,
            room_id=room_id)

        db.session.add(new_msg)
        db.session.commit()

        emit('message', new_msg.to_dict(), broadcast=True, to=room_id)


@socket.on('join-room')
def handle_join(data):
    room_id = str(data['room_id'])
    room = Room.query.filter_by(id=room_id).one()

    if current_user.id == room.sender_id or \
            current_user.id == room.recipient_id:

        # if the user is the 'recipient' of the convo (not the initiator)
        # and their joining the room we want to set seen to True if it is false
        if room.recipient_id == current_user.id and \
                room.recipient_has_seen is False:
            room.recipient_has_seen = True
            db.session.merge(room)
            db.session.commit()

        join_room(room_id)
