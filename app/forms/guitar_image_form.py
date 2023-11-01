from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from app.routes.aws_helpers import ALLOWED_EXTENSIONS
from app.models import GuitarImage


class GuitarImageForm(FlaskForm):

    url = FileField('Guitar Image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Submit Image')
