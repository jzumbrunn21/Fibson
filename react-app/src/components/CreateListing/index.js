import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./CreateListing.css";
import { createListingThunk } from "../../store/listings";

const CreateListing = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [price, setPrice] = useState(1);
  const [guitar_type, set_guitar_type] = useState("");
  const [body_type, set_body_type] = useState("");
  const [wood_type, set_wood_type] = useState("");
  const [color, setColor] = useState("");
  const [pickup_type, set_pickup_type] = useState("");
  const [joint_type, set_joint_type] = useState("");
  const [fretboard_material, set_fretboard_material] = useState("");
  const [frets, setFrets] = useState(0);
  const [inlays, setInlays] = useState("");
  const [handedness, setHandedness] = useState("");
  const [description, setDescription] = useState("");
  const [pickguard, setPickguard] = useState(false);
  const [pickup_selector, set_pickup_selector] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validators will go here later

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

    const createdListing = await dispatch(createListingThunk(listingData));
    if (createdListing) {
      history.push(`/listings/${createdListing.id}`);
    } else {
      return "Error creating your listing";
    }
  };
  return (
    <>
      <div className="create-listing-form-container">
        <h2>Create your Guitar Listing</h2>
        <form onSubmit={handleSubmit}>
          <div className="make-model-year">
            <label>
              Make
              <input
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
            </label>
            <label>
              Model
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </label>
            <label>
              Year
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
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
                <option value="Mahogony">Mahogony</option>
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
            </label>
            <button type="submit">Create your Guitar Listing</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
