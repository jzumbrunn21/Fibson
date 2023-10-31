from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import GuitarImage


class GuitarImageForm(FlaskForm):

    url = StringField('url', validators=[DataRequired()])
