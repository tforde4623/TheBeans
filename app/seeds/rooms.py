from app.models import db, Room


def seed_rooms():
    rooms = [
        Room(sender_id=1, recipient_id=2),
        Room(sender_id=3, recipient_id=1)
    ]

    [db.session.add(room) for room in rooms]
    db.session.commit()


def undo_rooms():
    db.session.execute('TRUNCATE rooms RESTART IDENTITY CASCADE;')
    db.session.commit()
