from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length
from app.models import Review

class ReviewForm(FlaskForm):
    description = StringField('description', validators=[DataRequired(), Length(min=25, max=2000, message='Description must be between 25 and 2000 characters')])
    stars = IntegerField('stars', validators=[DataRequired(), NumberRange(min=1, max=5, message='Stars must be between 1 and 5')])
    submit = SubmitField('submit')
