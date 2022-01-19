from app.models import db, Post

def seed_posts():
    post0 = Post(
        title='3Min AeroPress Recipe!',
        description='Add the coffee, add the hot water, stir for however long as you want as long as it is under 3min, press, your done!', 
        img_url='https://perfectdailygrind.com/wp-content/uploads/2017/02/aero7-e1488309193248.jpg',
        user_id=1
    )
    post1 = Post(
        title='Cool Beans Bro',
        description='Nice beans bro!! Here are some I found!', 
        img_url='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/1200px-Roasted_coffee_beans.jpg',
        user_id=1
    )
    post2 = Post(
        title='Sick Coffee Beans',
        description='These are some sick single origin coffee beans I found at the grocery store!', 
        img_url='https://perfectdailygrind.com/wp-content/uploads/2021/02/Wush-Wush-1.jpg',
        user_id=1
    )

    # commit these seeds to database
    posts = [post0, post1, post2]
    [db.session.add(post) for post in posts]
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
