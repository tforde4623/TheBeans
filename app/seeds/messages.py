from app.models import db, Message


def seed_msgs():
    messages = [
        Message(content='test message', owner_id=1, room_id=1)
    ]

    [db.session.add(message) for message in messages]
    db.session.commit()


def undo_msgs():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
