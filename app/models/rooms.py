from .db import db


class Room(db.Model):
    __tablename__ = 'rooms'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable=False)
    recipient_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable=False)

    messages = db.relationship('Message')

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id
        }

    def get_room_msgs(self):
        return {
            'room_id': self.room_id,
            'messages': [msg.to_dict() for msg in self.messages]
        }
