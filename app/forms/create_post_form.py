from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length


class CreatePostForm(FlaskForm):
    title = StringField(
            'title', validators=[DataRequired(), Length(min=1, max=100)])
    description = TextAreaField(
            'description', validators=[DataRequired()])
    img_url = TextAreaField('image url', validators=[DataRequired()])
    # user id technically won't require user input
    user_id = IntegerField('user id', validators=[DataRequired()])
