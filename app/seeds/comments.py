from app.models import db, Comment

def seed_comments():
    comment0 = Comment(
        content='Great Post! Thanks!',
        user_id=1,
        post_id=1,
    )

    comment1 = Comment(
        content='Great Post! Thanks!',
        user_id=1,
        post_id=1,
    )

    comment2 = Comment(
        content='Great Post! Thanks!',
        user_id=1,
        post_id=1,
    )

    comment3 = Comment(
        content='Great Post! Thanks!',
        user_id=1,
        post_id=1,
    )

    comments = [comment0, comment1, comment2, comment3]
    [db.session.add(c) for c in comments]
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
