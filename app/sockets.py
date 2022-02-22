import os
from flask_socketio import ConnectionRefusedError, SocketIO, emit, join_room
from flask_login import current_user, login_required

if os.environ.get("FLASK_ENV") == 'production':
    origins = [
        # hero stuff here
    ]
else:
    origins = "*"

socket = SocketIO(cors_allowed_origins=origins)


@socket.on('connect')
@login_required
def handle_connect():
    if not current_user.is_authenticated:
        raise ConnectionRefusedError('unauthorized')


@socket.on('message')
def handle_message(data):
    # TODO: auth
    print('test')
    room_id = str(data['room_id'])
    emit('message', data, broadcast=True, to=room_id)


@socket.on('join-room')
def handle_join(data):
    print(f'joined room {data}')
    join_room(str(data['room_id']))
