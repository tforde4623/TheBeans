from app.models import db, Post

def seed_posts():
    post0 = Post(
        title='3Min AeroPress Recipe!',
        description='Add the coffee, add the hot water, stir for however long as you want as long as it is under 3min, press, your done!', 
        category_id='2',
        img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/33236921-af56-4a70-9e16-2fdc12776d6b.jpg',
        user_id=1
    )
    post1 = Post(
        title='Cool Beans Bro',
        description='Nice beans bro!! Here are some I found!', 
        category_id='1',
        img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/77d72531-fbb5-4d41-b0b4-1e44172e895d.jpg',
        user_id=1
    )
    post2 = Post(
        title='Sick Coffee Beans',
        description='These are some sick single origin coffee beans I found at the grocery store!', 
        category_id='1',
        img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/a09eb505-b582-43fc-848e-fae7d11a3ed4.jpg',
        user_id=1
    )

    # commit these seeds to database
    posts = [post0, post1, post2]
    [db.session.add(post) for post in posts]
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
