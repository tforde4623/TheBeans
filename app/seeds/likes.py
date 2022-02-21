from app.models import db, Like


def seed_likes():
    likes = [
        Like(user_id=1, post_id=1),
        Like(user_id=1, post_id=2)
    ]

    [db.session.add(like) for like in likes]
    db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
