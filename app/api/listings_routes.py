from flask import Blueprint, request, jsonify
from app.models import db, Guitar, GuitarImage
from app.forms import GuitarForm, GuitarImageForm
from flask_login import current_user, login_required
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


listings_routes = Blueprint("listings", __name__)



@listings_routes.route('/')
#Grabs all guitars and their images(images in a list)
def all_listings():
    guitars = Guitar.query.all()
    response = []

    for guitar in guitars:
        guitarImages = GuitarImage.query.filter_by(guitar_id=guitar.id).all()
        images = [image.url for image in guitarImages]
        response.append({
            'guitar': guitar.to_dict(),
            'images': images
        })

    return {'listings': response}


@listings_routes.route('/create', methods=['POST'])
@login_required
def create_listing():
    form = GuitarForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        guitar = Guitar(
            merchant_id=current_user.id,
            make=form.data['make'],
            model=form.data['model'],
            year=form.data['year'],
            price=form.data['price'],
            guitar_type=form.data['guitar_type'],
            body_type=form.data['body_type'],
            wood_type=form.data['wood_type'],
            color=form.data['color'],
            pickup_type=form.data['pickup_type'],
            joint_type=form.data['joint_type'],
            fretboard_material=form.data['fretboard_material'],
            frets=form.data['frets'],
            inlays=form.data['inlays'],
            handedness=form.data['handedness'],
            description=form.data['description'],
            pickguard=form.data['pickguard'],
            pickup_selector=form.data['pickup_selector']
        )
        db.session.add(guitar)
        db.session.commit()

        return guitar.to_dict(), 201

    else:

        return {'Errors': form.errors}, 404
    # Do I add images here or in a seperate route?
    # Build out then come back to this.

@listings_routes.route('/<int:id>/upload-image', methods=['POST'])
@login_required
def upload_image(id):
    form = GuitarImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('HITTING THE ROUTE')

    if form.validate_on_submit():
        image = form.data["url"]
        print("IMAGE", image)
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print("**Upload**", upload)

        if "url" not in upload:
            return "URL NOT IN UPLOAD"
        url = upload["url"]
        new_image = GuitarImage(url=upload['url'], guitar_id=id)
        db.session.add(new_image)
        db.session.commit()
        return {'guitarImage': new_image.to_dict()}

    if form.errors:
        return {'Errors': form.errors}, 404



@listings_routes.route('/manage')
@login_required
def manage_listings():
    guitars = Guitar.query.filter(Guitar.merchant_id == current_user.id).all()
    response = []

    for guitar in guitars:
        guitarImages = GuitarImage.query.filter_by(guitar_id=guitar.id).all()
        images = [{'id': image.id, 'url': image.url} for image in guitarImages]
        response.append({
            'guitar': guitar.to_dict(),
            'images': images
        })

    return {'listings': response}



@listings_routes.route('/<int:id>')
def guitar_detail(id):
    response = []
    guitar = Guitar.query.get(id)
    guitarImages = GuitarImage.query.filter_by(guitar_id=guitar.id).all()
    images = [image.url for image in guitarImages]
    response.append({
        'guitar': guitar.to_dict(),
        'images': images
    })

    return {'listing': response}



@listings_routes.route('/update/<int:id>', methods=['PUT'])
@login_required
def update_listing(id):
    form = GuitarForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        guitarUpdated = Guitar.query.get(id)

        guitarUpdated.make=form.data['make']
        guitarUpdated.model=form.data['model']
        guitarUpdated.year=form.data['year']
        guitarUpdated.price=form.data['price']
        guitarUpdated.guitar_type=form.data['guitar_type']
        guitarUpdated.body_type=form.data['body_type']
        guitarUpdated.wood_type=form.data['wood_type']
        guitarUpdated.color=form.data['color']
        guitarUpdated.pickup_type=form.data['pickup_type']
        guitarUpdated.joint_type=form.data['joint_type']
        guitarUpdated.fretboard_material=form.data['fretboard_material']
        guitarUpdated.frets=form.data['frets']
        guitarUpdated.inlays=form.data['inlays']
        guitarUpdated.handedness=form.data['handedness']
        guitarUpdated.description=form.data['description']
        guitarUpdated.pickguard=form.data['pickguard']
        guitarUpdated.pickup_selector=form.data['pickup_selector']

        db.session.commit()

        return guitarUpdated.to_dict(), 200

    else:
        return {'Errors': form.errors}, 404



@listings_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_listing(id):
    deleted_listing = Guitar.query.get(id)

    if deleted_listing:
        db.session.delete(deleted_listing)
        db.session.commit()
        return "DELETED LISTING"
    else:
        return "Error with deleting listing"

@listings_routes.route('/<int:id>/image', methods=['DELETE'])
@login_required
def delete_image(id):
    guitar = Guitar.query.get(id)
    # print("*******************DELETED LISTING", deleted_listing)
    guitarImages = GuitarImage.query.filter_by(guitar_id=guitar.id).all()
    images = [{'id': image.id, 'url': image.url} for image in guitarImages]
    first_image = images[0]['id']
    guitarImage = GuitarImage.query.filter_by(id=first_image).first()
    print('********************************************************', guitarImage)


    file_to_delete = remove_file_from_s3(guitarImage.url)


    if file_to_delete:
        db.session.delete(guitarImage)
        db.session.commit()
        return "Image Deleted"
    else:
        print("FILE TO DELETE",file_to_delete)
        return "Error deleting your image"
