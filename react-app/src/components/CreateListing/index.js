import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./CreateListing.css";
import {
  createListingThunk,
  uploadListingImageThunk,
} from "../../store/listings";

const CreateListing = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [price, setPrice] = useState(1);
  const [guitar_type, set_guitar_type] = useState("Electric");
  const [body_type, set_body_type] = useState("Solid-Body");
  const [wood_type, set_wood_type] = useState("Alder");
  const [color, setColor] = useState("");
  const [pickup_type, set_pickup_type] = useState("Single-Coil");
  const [joint_type, set_joint_type] = useState("Glued-Neck");
  const [fretboard_material, set_fretboard_material] = useState("Ebony");
  const [frets, setFrets] = useState(0);
  const [inlays, setInlays] = useState("Pearl-Dot");
  const [handedness, setHandedness] = useState("Right");
  const [description, setDescription] = useState("");
  const [pickguard, setPickguard] = useState(true);
  const [pickup_selector, set_pickup_selector] = useState("2-Switch");
  const [urls, setUrls] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validators will go here later
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
    if (!urls) {
      newErrors.images = "You must add at least one image";
    }
    if (urls && urls.length > 5) {
      newErrors.images = "Only 5 images can be added to your listing";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const listingData = {
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

    setIsLoading(true);
    const createdListing = await dispatch(createListingThunk(listingData));
    console.log("CREATED LISTING", createdListing);
    const guitarId = createdListing.id;
    // console.log("GUITAR ID", guitarId);
    for (let url of urls) {
      const formData = new FormData();
      formData.append("url", url);
      const createdImage = await dispatch(
        uploadListingImageThunk(formData, guitarId)
      );
    }

    setIsLoading(false);
    if (createdListing && guitarId) {
      history.push(`/listings/${guitarId}`);
    } else {
      return "Error creating your listing";
    }
  };

  if (isLoading) return <div>...Loading...</div>;
  return (
    <div className="create-listing-form-container">
      <div className="form-container">
        <h2>Create your Guitar Listing</h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <h4>Let's start with some basic information</h4>
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
          <div className="line-break"></div>
          <h4>What is your guitar made of?</h4>
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
          <div className="line-break"></div>
          <h4>Pickup Information</h4>
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
          <div className="line-break"></div>
          <h4>Onto the neck</h4>
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
          <div className="line-break"></div>
          <h4>Tell the world about your axe</h4>
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
          <div className="line-break"></div>
          <h4>Let's see that guitar!</h4>
          <div className="image-upload-container">
            <label>
              Upload your guitar image
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  setUrls([...e.target.files]);
                }}
              />
              {errors.images && <span className="error">{errors.images}</span>}
            </label>
          </div>
          <div className="line-break"></div>
          <div>
            <button type="submit">Create your Guitar Listing</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
