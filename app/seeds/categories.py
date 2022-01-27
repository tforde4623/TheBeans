from app.models import db, Category

def seed_categories():
    category1 = Category(
        name='Beans',
        img_url='https://raw.githubusercontent.com/tforde4623/TheBeans/main/img-assets/beans-category.png'
    )

    category2 = Category(
        name='Recipes',
        img_url='https://raw.githubusercontent.com/tforde4623/TheBeans/main/img-assets/recipe-category.png'
    )

    category3 = Category(
        name='Cafes',
        img_url='https://raw.githubusercontent.com/tforde4623/TheBeans/main/img-assets/cafe-category.png'
    )

    cats = [category1, category2, category3]
    [db.session.add(category) for category in cats]
    db.session.commit()

def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
