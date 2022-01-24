from .db import db


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    img_url = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    author = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post')
    category = db.relationship('Category', back_populates='posts')

    def to_dict(self):
        """ returns a dict of base post instance """
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category_id': self.category_id,
            'img_url': self.img_url,
            'user_id': self.user_id,
            'created_at': str(self.created_at),
        }

    def to_dict_with_owner(self):
        """will return dictified post obj with owner also as a dict"""
        return {
            **self.to_dict(),
            'author': self.author.to_dict()
        }
