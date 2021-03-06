from .db import db


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(), nullable=False)
    owner_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable=False)
    room_id = db.Column(
        db.Integer,
        db.ForeignKey('rooms.id'),
        nullable=False)
    created_at = db.Column(
        db.DateTime,
        default=db.func.current_timestamp())

    owner = db.relationship('User')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'owner_id': self.owner_id,
            'room_id': self.room_id,
            'created_at': self.created_at.isoformat(),
            'owner_obj': self.owner.to_dict()
        }
