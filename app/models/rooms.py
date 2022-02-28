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
    # a boolean that starts are false to display a 'new convo' type alert
    # to the user that did not initiate the room
    recipient_has_seen = db.Column(db.Boolean, default=False, nullable=False)

    messages = db.relationship('Message')

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'recipient_has_seen': self.recipient_has_seen
        }

    def get_room_msgs(self):
        return {
            'id': self.id,
            'messages': [msg.to_dict() for msg in self.messages]
        }

    def get_room_with_other(self, curr_user_id, user_model):
        r_dict = self.to_dict()

        if curr_user_id == r_dict['recipient_id']:
            other_id = r_dict['sender_id']
        elif curr_user_id == r_dict['sender_id']:
            other_id = r_dict['recipient_id']

        r_dict['other_user'] = user_model.query.filter_by(
            id=other_id).one().to_dict()

        return r_dict
