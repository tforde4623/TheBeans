from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Category

category_routes = Blueprint('categories', __name__)


# GET '/api/categories' get a list of all categories
@category_routes.route('/')
@login_required
def get_categories():
    cats = Category.query.all()
    return jsonify([c.to_dict() for c in cats])


# GET '/api/categories/:categoryId/posts' get all posts associated with category
@category_routes.route('/<catId>/posts')
@login_required
def get_posts_by_category(catId):
    cat = Category.query.filter_by(id=catId).one()
    return jsonify([p.to_dict for p in cat.posts])
