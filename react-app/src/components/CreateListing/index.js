import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./CreateListing.css";
import { createListingThunk } from "../../store/listings";

const CreateListing = () => {
  const dispatch = useDispatch();

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
  };
  return (
    <>
      <div className="create-listing-form-container">
        <h2>Create your Guitar Listing</h2>
      </div>
    </>
  );
};

export default CreateListing;
