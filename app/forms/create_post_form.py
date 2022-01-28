from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Category

def choice_exists(form, field):
    catId = field.data
    cat = Category.query.filter(Category.id == catId).first()
    if not cat:
        raise ValidationError('Category by that ID does not exist')

class CreatePostForm(FlaskForm):
    title = StringField(
            'title', validators=[DataRequired(), Length(min=1, max=100)])
    description = TextAreaField(
            'description', validators=[DataRequired()])
    category_id = SelectField(
            'cateogory_id', choices=[(1, 1), (2, 2), (3, 3)], validators=[DataRequired(), choice_exists])
