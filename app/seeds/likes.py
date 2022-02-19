from app.models import db, Like


def seed_likes():
    likes = [
        Like(1, 1),
        Like(1, 2)
    ]

    [db.session.add(like) for like in likes]
    db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
