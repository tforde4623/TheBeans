from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(300), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    author = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')

    def to_dict_with_author(self):
        """ returns a dict of base post instance """
        return {
            'id': self.id,
            'description': self.description,
            'post_id': self.post_id,
            'user_id': self.user_id,
            'created_at': str(self.created_at),
            'author': self.author.to_dict()
        }

