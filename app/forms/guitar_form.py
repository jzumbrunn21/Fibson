from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, SubmitField, BooleanField
from wtforms.validators import DataRequired, NumberRange, Length
from app.models import Guitar


class GuitarForm(FlaskForm):

    make = StringField('make', validators=[DataRequired(), Length(min=1, max=50, message='Guitar make must be between 1 and 50 characters')])
    model = StringField('model', validators=[DataRequired(), Length(min=1, max=50, message='Guitar model must be between 1 and 50 characters')])
    year = IntegerField('year', validators=[DataRequired(), NumberRange(min=1900, max=2024, message='Year must be')])
    guitar_type = SelectField('guitar_type', choices=[('Electric', 'Electric'), ('Acoustic', 'Acoustic'), ('Bass', 'Bass'), ('Other', 'Other')], validators=[DataRequired()])
    body_type = SelectField('body_type', choices=[('Solid-Body', 'Solid-Body'), ('Semi-Hollow', 'Semi-Hollow'), ('Hollow', 'Hollow')], validators=[DataRequired()])
    wood_type = SelectField('wood_type', choices=[('Alder', 'Alder'), ('Ash', 'Ash'), ('Mahogony', 'Mahogony') ('Maple', 'Maple'), ('Rosewood', 'Rosewood'), ('Walnut', 'Walnut'), ('Exotic', 'Exotic')], validators=[DataRequired()])
    color = StringField('color', validators=[DataRequired(), Length(min=1, max=50, message='Guitar color must be between 1 and 50 characters')])
    pickup_type = SelectField('pickup_type', choices=[('Single-Coil', 'Single-Coil'), ('Humbucker', 'Humbucker'), ('Both', 'Both'), ('None','None')], validators=[DataRequired()])
    joint_type = SelectField('joint_type', choices=[('Glued-Neck', 'Glued-Neck'), ('Bolt-on-Neck', 'Bolt-on-Neck')], validators=[DataRequired()])
    fretboard_material = SelectField('fretboard_material', choices=[('Ebony', 'Ebony'), ('Mahogany', 'Mahogany'), ('Maple', 'Maple'), ('Rosewood','Rosewood'), ('Exotic', 'Exotic')], validators=[DataRequired()])
    frets = IntegerField('frets', validators=[DataRequired(), NumberRange(min=18, max=26, message='Fret number needs to be between 18 and 26')])
    inlays = SelectField('inlays', choices=[('Pearl-Dot', 'Pearl-Dot'), ('Trapezoid', 'Trapezoid'), ('Other', 'Other'), ('None','None')], validators=[DataRequired()])
    handedness = SelectField('handedness', choices=[('Right', 'Right'), ('Left', 'Left')], validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired(), Length(min=25, max=2000, message='Description must be between 25 and 2000 characters')])
    pickguard = BooleanField('pickguard', validators=[DataRequired()])
    pickup_selector = SelectField('pickup_selector', choices=[('2-Switch', '2-Switch'), ('3-Switch', '3-Switch'), ('5-Switch', '5-Switch'), ('None', 'None')], validators=[DataRequired()])
    submit = SubmitField('submit')
