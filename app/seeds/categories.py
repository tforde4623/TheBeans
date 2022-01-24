from app.models import db, Category

def seed_categories():
    category1 = Category(
        name='Beans',
        img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/33236921-af56-4a70-9e16-2fdc12776d6b.jpg'
    )

    category2 = Category(
        name='Recipes',
        img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/77d72531-fbb5-4d41-b0b4-1e44172e895d.jpg'
    )

    category3 = Category(
        name='Cafes',
        img_url='https://bucketobeans.s3.us-east-2.amazonaws.com/a09eb505-b582-43fc-848e-fae7d11a3ed4.jpg'
    )

    cats = [category1, category2, category3]
    [db.session.add(category) for category in cats]
    db.session.commit()

def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
