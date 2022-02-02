from random import randint
from app.models import db, Comment

def seed_comments():
    commentContent = [
        'Nice Post!',
        'Looks Good!',
        'Wow!',
        'I could use some of that.',
        'Where did you go?',
        'That looks delicious!',
        'Thanks for the content',
        'Ill have to try it',
        'Thanks man!',
        'Cool!',
        'I think I saw that',
        'Good stuff'
    ]

    # add a comment with a user_id and post_id for all strings
    for i in range(len(commentContent)): # every comment
        for j in range(1, 17): # 9 posts
            db.session.add(
                Comment(
                    content= commentContent[i],
                    post_id=j,
                    user_id= randint(1, 3)
                )
            )

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
