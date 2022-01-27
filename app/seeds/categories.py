from app.models import db, Category

def seed_categories():
    category1 = Category(
        name='Beans',
        img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/beans.png'
    )

    category2 = Category(
        name='Recipes',
        img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/recipes.png'
    )

    category3 = Category(
        name='Cafes',
        img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/cafe.png'
    )

    cats = [category1, category2, category3]
    [db.session.add(category) for category in cats]
    db.session.commit()

def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
