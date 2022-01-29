from app.models import db, Post

def seed_posts():
    posts = [
        Post(
            title='Foam Art',
            description='This is a method I found to make really cool foam art! \
                1. Pour the foam on top of the coffee! \
                2. Drink it!',
            category_id=2,
            img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/54ac12a2-ac22-4807-93db-e2a72ffe2754.jpg',
            user_id=1
        ),
        Post(
            title='Wush Wush',
            description='These are some delicious single origin coffee beans I found!',
            category_id=1,
            img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/156fc0b2-cead-43b8-93f9-ec0af4c150d9.jpg',
            user_id=1
        ),
        Post(
            title='Coffee Face',
            description='Not a recipe just looks funny!',
            category_id=2,
            img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/3d2ab2d4-06d0-4b06-a3f7-5067e3c7bd3e.jpg',
            user_id=2
        ),
        Post(
            title='Great Cafe!',
            description='This is NOT starbucks!',
            category_id=3,
            img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/bd7e1730-358f-4877-94dd-67d7c018f0a2.jpg',
            user_id=2
        ),
        Post(
            title='Yummy French Press Recipe',
            description='This is a really good french press recipe! \
                1. Grind your coffee! (in between medium and course) \
                2. Put coffee and water in french press! \
                3. Press it!',
            category_id=2,
            img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/436bf56c-402d-4177-8504-67cb7aff55dc.jpg',
            user_id=2
        ),
        Post(
            title='Yummy Aeropress Recipe!',
            description='This is a yummy aero press recipe! \
                1. Grind coffee \
                2. Put coffee in aero press with plunger upside down \
                3. Pour in water 30 seconds off boiling \
                4. Mix and wait for a minute \
                5. Press!',
            category_id=2,
            img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/b1a11681-1ca4-4816-901d-07c7c6e70f5a.jpg',
            user_id=3
        ),
        Post(
            title='Ok Pour Over Recipe',
            description='This is a pour over recipe! Make coffee!',
            img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/882cbad3-e7fc-405b-b0c0-ed5a7ef89dae.jpg',
            category_id=2,
            user_id=3
        ),
        Post(
            title='Bear Hug',
            description='Bear hug espresso is some really good coffee from a local roastery.',
            img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/a86897ff-71f9-4774-821e-20a10d938980.jpg',
            category_id=1,
            user_id=3
        ),
        Post(
            title='Dogwood Roaster\'s',
            description='Dog wood is a local roaster and cafe that has really good coffee!',
            img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/6fed8f26-35f9-4b3e-906d-dceb57a29251.jpg',
            category_id=3,
            user_id=3

        )
    ]

    # commit these seeds to database
    [db.session.add(post) for post in posts]
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
