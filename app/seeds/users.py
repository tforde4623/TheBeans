from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo1 = User(
        username='Demo1', email='demo1@test.com', password='password')
    demo2 = User(
        username='Demo2', email='demo2@test.com', password='password')
    demo3 = User(
        username='Demo3', email='demo3@test.com', password='password')

    [db.session.add(user) for user in [demo1, demo2, demo3]]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
