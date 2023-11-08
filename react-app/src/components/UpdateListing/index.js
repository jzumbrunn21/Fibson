import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  readOneListingThunk,
  updateListingThunk,
  uploadListingImageThunk,
  deleteListingImageThunk,
} from "../../store/listings";
import "./UpdateListing.css";

const UpdateListing = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { guitarId } = useParams();
  //   console.log("guitarID", guitarId);

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState(1);
  const [guitar_type, set_guitar_type] = useState("");
  const [body_type, set_body_type] = useState("");
  const [wood_type, set_wood_type] = useState("");
  const [color, setColor] = useState("");
  const [pickup_type, set_pickup_type] = useState("");
  const [joint_type, set_joint_type] = useState("");
  const [fretboard_material, set_fretboard_material] = useState("");
  const [frets, setFrets] = useState("");
  const [inlays, setInlays] = useState("");
  const [handedness, setHandedness] = useState("");
  const [description, setDescription] = useState("");
  const [pickguard, setPickguard] = useState(true);
  const [pickup_selector, set_pickup_selector] = useState("");

  const [urls, setUrls] = useState(null);
  const [urlOne, setUrlOne] = useState(null);
  const [urlTwo, setUrlTwo] = useState(null);
  const [urlThree, setUrlThree] = useState(null);
  const [urlFour, setUrlFour] = useState(null);
  const [urlFive, setUrlFive] = useState(null);

  const [currentImageOne, setCurrentImageOne] = useState(null);
  const [currentImageTwo, setCurrentImageTwo] = useState(null);
  const [currentImageThree, setCurrentImageThree] = useState(null);
  const [currentImageFour, setCurrentImageFour] = useState(null);
  const [currentImageFive, setCurrentImageFive] = useState(null);

  const [imageIdOne, setImageIdOne] = useState(null);
  const [imageIdTwo, setImageIdTwo] = useState(null);
  const [imageIdThree, setImageIdThree] = useState(null);
  const [imageIdFour, setImageIdFour] = useState(null);
  const [imageIdFive, setImageIdFive] = useState(null);

  const [errors, setErrors] = useState({});

  const prepopulateFields = async () => {
    let response = await dispatch(readOneListingThunk(guitarId));
    let res = response.listing[0];
    setMake(res.guitar.make);
    setModel(res.guitar.model);
    setYear(res.guitar.year);
    setPrice(res.guitar.price);
    set_guitar_type(res.guitar.guitar_type);
    set_body_type(res.guitar.body_type);
    set_wood_type(res.guitar.wood_type);
    setColor(res.guitar.color);
    set_pickup_type(res.guitar.pickup_type);
    set_joint_type(res.guitar.joint_type);
    set_fretboard_material(res.guitar.fretboard_material);
    setFrets(res.guitar.frets);
    setInlays(res.guitar.inlays);
    setHandedness(res.guitar.handedness);
    setDescription(res.guitar.description);
    setPickguard(res.guitar.pickguard);
    set_pickup_selector(res.guitar.pickup_selector);

    setUrls(res.images);
    setUrlOne(res.images[0].url);
    setUrlTwo(
      res.images.length > 1 && res.images[1].url ? res.images[1].url : null
    );
    setUrlThree(
      res.images.length > 2 && res.images[2].url ? res.images[2].url : null
    );
    setUrlFour(
      res.images.length > 3 && res.images[3].url ? res.images[3].url : null
    );
    setUrlFive(
      res.images.length > 4 && res.images[4].url ? res.images[4].url : null
    );

    setCurrentImageOne(
      res.images.length > 0 && res.images[0].url ? res.images[0].url : null
    );
    setCurrentImageTwo(
      res.images.length > 1 && res.images[1].url ? res.images[1].url : null
    );
    setCurrentImageThree(
      res.images.length > 2 && res.images[2].url ? res.images[2].url : null
    );
    setCurrentImageFour(
      res.images.length > 3 && res.images[3].url ? res.images[3].url : null
    );
    setCurrentImageFive(
      res.images.length > 4 && res.images[4].url ? res.images[4].url : null
    );

    setImageIdOne(
      res.images.length > 0 && res.images[0].id ? res.images[0].id : null
    );
    setImageIdTwo(
      res.images.length > 1 && res.images[1].id ? res.images[1].id : null
    );
    setImageIdThree(
      res.images.length > 2 && res.images[2].id ? res.images[2].id : null
    );
    setImageIdFour(
      res.images.length > 3 && res.images[3].id ? res.images[3].id : null
    );
    setImageIdFive(
      res.images.length > 4 && res.images[4].id ? res.images[4].id : null
    );
  };

  console.log(imageIdOne, imageIdTwo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!make || make.length < 1 || make.length > 50) {
      newErrors.make =
        "Make is required and must be between 1 and 50 characters";
    }
    if (!model || model.length < 1 || model.length > 50) {
      newErrors.model =
        "Model is required and must be between 1 and 50 characters";
    }

    if (year < 1900 || year > 2024) {
      newErrors.year = "Year must be between 1900 and 2024";
    }

    if (!color || color.length < 1 || color.length > 50) {
      newErrors.color =
        "Color is required and must be between 1 and 50 characters";
    }

    if (frets < 18 || frets > 26) {
      newErrors.frets = "Fret count must be between 18 and 26";
    }

    if (!description || description.length < 25 || description.length > 2000) {
      newErrors.description =
        "Description is required and must be between 25 and 2000 characters";
    }
    if (price < 1 || price >= 1000001) {
      newErrors.price = "Price must be between $1 and $1,000,000";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedListingData = {
      make,
      model,
      year,
      price,
      guitar_type,
      body_type,
      wood_type,
      color,
      pickup_type,
      joint_type,
      fretboard_material,
      frets,
      inlays,
      handedness,
      description,
      pickguard,
      pickup_selector,
    };

    if (urlOne !== currentImageOne) {
      const formData = new FormData();
      formData.append("url", urlOne);

      await dispatch(deleteListingImageThunk(guitarId, imageIdOne)).then(
        await dispatch(uploadListingImageThunk(formData, guitarId))
      );
    }
    if (urlTwo !== currentImageTwo) {
      const formData = new FormData();
      formData.append("url", urlTwo);

      await dispatch(deleteListingImageThunk(guitarId, imageIdTwo)).then(
        await dispatch(uploadListingImageThunk(formData, guitarId))
      );
    }

    if (urlThree !== currentImageThree) {
      const formData = new FormData();
      formData.append("url", urlThree);

      await dispatch(deleteListingImageThunk(guitarId, imageIdThree)).then(
        await dispatch(uploadListingImageThunk(formData, guitarId))
      );
    }

    if (urlFour !== currentImageFour) {
      const formData = new FormData();
      formData.append("url", urlFour);

      await dispatch(deleteListingImageThunk(guitarId, imageIdFour)).then(
        await dispatch(uploadListingImageThunk(formData, guitarId))
      );
    }

    if (urlFive !== currentImageFive) {
      const formData = new FormData();
      formData.append("url", urlFive);

      await dispatch(deleteListingImageThunk(guitarId, imageIdFive)).then(
        await dispatch(uploadListingImageThunk(formData, guitarId))
      );
    }

    const updatedListing = await dispatch(
      updateListingThunk(updatedListingData, guitarId)
    );

    if (updatedListing) {
      history.push(`/listings/${guitarId}`);
    } else {
      return "ERROR IN REACT";
    }
  };

  useEffect(() => {
    prepopulateFields();
  }, []);

  return (
    <>
      <div className="create-listing-form-container">
        <h2>Let's restring that guitar</h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="make-model-year">
            <label>
              Make
              <input
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
              {errors.make && <span className="error">{errors.make}</span>}
            </label>
            <label>
              Model
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              {errors.model && <span className="error">{errors.model}</span>}
            </label>
            <label>
              Year
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              {errors.year && <span className="error">{errors.year}</span>}
            </label>
          </div>
          <div className="guitar-body-wood-type">
            <label>
              Guitar Type
              <select
                value={guitar_type}
                onChange={(e) => set_guitar_type(e.target.value)}
              >
                <option value="Electric">Electric</option>
                <option value="Acoustic">Acoustic</option>
                <option value="Bass">Bass</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Body Type
              <select
                value={body_type}
                onChange={(e) => set_body_type(e.target.value)}
              >
                <option value="Solid-Body">Solid-Body</option>
                <option value="Semi-Hollow">Semi-Hollow</option>
                <option value="Hollow">Hollow</option>
              </select>
            </label>
            <label>
              Wood Type
              <select
                value={wood_type}
                onChange={(e) => set_wood_type(e.target.value)}
              >
                <option value="Alder">Alder</option>
                <option value="Ash">Ash</option>
                <option value="Mahogony">Mahogony</option>
                <option value="Maple">Maple</option>
                <option value="Rosewood">Rosewood</option>
                <option value="Walnut">Walnut</option>
                <option value="Exotic">Exotic</option>
              </select>
            </label>
            <label>
              Color
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              {errors.color && <span className="error">{errors.color}</span>}
            </label>
          </div>
          <div className="pickups">
            <label>
              Pickup Type
              <select
                value={pickup_type}
                onChange={(e) => set_pickup_type(e.target.value)}
              >
                <option value="Single-Coil">Single-Coil</option>
                <option value="Humbucker">Humbucker</option>
                <option value="Both">Combo Pickups</option>
                <option value="None">None</option>
              </select>
            </label>
            <label>
              Pickup Selector
              <select
                value={pickup_selector}
                onChange={(e) => set_pickup_selector(e.target.value)}
              >
                <option value="2-Switch">2-Switch</option>
                <option value="3-Switch">3-Switch</option>
                <option value="5-Switch">5-Switch</option>
                <option value="None">None</option>
              </select>
            </label>
            <label>
              Pickguard
              <input
                type="radio"
                value="true"
                checked={pickguard === true}
                onChange={(e) => setPickguard(e.target.value === "true")}
              />
            </label>
            <label>
              No Pickguard
              <input
                type="radio"
                value="false"
                checked={pickguard === false}
                onChange={(e) => setPickguard(e.target.value === "true")}
              />
            </label>
            <label>
              Handedness
              <select
                value={handedness}
                onChange={(e) => setHandedness(e.target.value)}
              >
                <option value="Right">Right</option>
                <option value="Left">Left</option>
              </select>
            </label>
          </div>
          <div className="frets-neck">
            <label>
              Fretboard Material
              <select
                value={fretboard_material}
                onChange={(e) => set_fretboard_material(e.target.value)}
              >
                <option value="Ebony">Ebony</option>
                <option value="Mahogany">Mahogany</option>
                <option value="Maple">Maple</option>
                <option value="Rosewood">Rosewood</option>
                <option value="Exotic">Exotic</option>
              </select>
            </label>
            <label>
              Number of Frets
              <input
                type="number"
                value={frets}
                onChange={(e) => setFrets(e.target.value)}
              />
              {errors.frets && <span className="error">{errors.frets}</span>}
            </label>
            <label>
              Inlays
              <select
                value={inlays}
                onChange={(e) => setInlays(e.target.value)}
              >
                <option value="Glued-Neck">Pearl-Dot</option>
                <option value="Trapezoid">Trapezoid</option>
                <option value="Other">Other</option>
                <option value="None">None</option>
              </select>
            </label>
            <label>
              Neck Joint
              <select
                value={joint_type}
                onChange={(e) => set_joint_type(e.target.value)}
              >
                <option value="Glued-Neck">Glued-Neck</option>
                <option value="Bolt-on-Neck">Bolt-on-Neck</option>
              </select>
            </label>
          </div>
          <div className="create-description">
            <label>
              Description
              <textarea
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </label>
            <label>
              Price
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && <span className="error">{errors.price}</span>}
            </label>
          </div>
          <div className="image-upload-container">
            {urls && (
              <label>
                Update your guitar image
                <ul className="update-image-list">
                  <li className="indiv-option">
                    <img
                      src={
                        urls && urls.length > 0 && urls[0].url
                          ? urls[0].url
                          : null
                      }
                      alt={"Image Url"}
                      className="update-image-small-view"
                    ></img>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setUrlOne(e.target.files[0])}
                    />
                  </li>
                  <li className="indiv-option">
                    <img
                      src={
                        urls && urls.length > 1 && urls[1].url
                          ? urls[1].url
                          : null
                      }
                      alt={"Image Url"}
                      className="update-image-small-view"
                    ></img>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setUrlTwo(e.target.files[0])}
                    />
                  </li>
                  <li className="indiv-option">
                    <img
                      src={
                        urls && urls.length > 2 && urls[2].url
                          ? urls[2].url
                          : null
                      }
                      alt={"Image Url"}
                      className="update-image-small-view"
                    ></img>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setUrlThree(e.target.files[0])}
                    />
                  </li>
                  <li className="indiv-option">
                    <img
                      src={
                        urls && urls.length > 3 && urls[3].url
                          ? urls[3].url
                          : null
                      }
                      alt={"Image Url"}
                      className="update-image-small-view"
                    ></img>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setUrlFour(e.target.files[0])}
                    />
                  </li>
                  <li className="indiv-option">
                    <img
                      src={
                        urls && urls.length > 4 && urls[4].url
                          ? urls[4].url
                          : null
                      }
                      alt={"Image Url"}
                      className="update-image-small-view"
                    ></img>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setUrlFive(e.target.files[0])}
                    />
                  </li>
                </ul>
              </label>
            )}
          </div>
          <button type="submit">Update your Guitar Listing</button>
        </form>
      </div>
    </>
  );
};

export default UpdateListing;
