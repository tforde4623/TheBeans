from app.models import db, Category

def seed_categories():
    category1 = Category(
        name='Beans'
    )

    category2 = Category(
        name='Recipes'
    )

    category3 = Category(
        name='Cafes'
    )

    cats = [category1, category2, category3]
    [db.session.add(category) for category in cats]
    db.session.commit()

def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
