from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)


def make_val_msgs(validation_errors):
    """
    turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@comment_routes.route('/<post_id>')
@login_required
def get_comments(post_id):
    """
    get comments using a specific postId
    """
    comments = Comment.query.filter_by(post_id=post_id).all()
    return jsonify([c.to_dict_with_author() for c in comments])


@comment_routes.route('/', methods=['post'])
@login_required
def add_comment():
    """
    add a comment
    """
    data = request.json
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.data['content'] = data['content']

    if form.validate_on_submit():
        new_post = Comment(content= data['content'],
                           post_id= data['post_id'],
                           user_id= current_user.id
        )
        db.session.add(new_post)
        db.session.commit()

        return jsonify(new_post.to_dict_with_author())

    return jsonify({ 'errs': make_val_msgs(form.errors) }), 401


@comment_routes.route('/<id>', methods=['put'])
@login_required
def edit_comment(id):
    """
    edit a comments content by post_id
    """
    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.json
    form.data['content'] = data['content']

    if form.validate_on_submit():

        comment = Comment.query.filter_by(id=id).one()

        comment.content = data['content']
        db.session.commit()

        return jsonify(comment.to_dict_with_author())

    if form.errors:
        return jsonify({ 'errs': make_val_msgs(form.errors) })


@comment_routes.route('/<comment_id>', methods=['delete'])
@login_required
def delete_comment(comment_id):
    """
    delete a comment by id
    """
    comment = Comment.query.filter_by(id=comment_id).one()

    if comment.author.id == current_user.id:
        db.session.delete(comment)
        db.session.commit()

        return jsonify({}), 204

    return jsonify({ 'err': 'could not delete record' }), 401
