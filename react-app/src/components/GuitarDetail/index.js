import React, { useEffect } from "react";
import "./GuitarDetail.css";
import { readOneListingThunk } from "../../store/listings";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const GuitarDetail = () => {
  const dispatch = useDispatch();
  const { guitarId } = useParams();
  const listing = useSelector(
    (state) => Object.values(state.listings.listing)[0]
  );
  console.log("LISTING", listing);

  useEffect(() => {
    dispatch(readOneListingThunk(guitarId));
  }, [dispatch]);
  return (
    <>
      <div className="main-guitar-detail">
        {listing && (
          <>
            <div className="single-guitar-images-container">
              {/* <h3>Images</h3> */}
              {listing[0].images.map((image, index) => (
                <img key={index} src={image} alt={listing[0].guitar.model} />
              ))}
            </div>
            <div className="single-guitar-info-container">
              <h2>
                {listing[0].guitar.year} {listing[0].guitar.make}{" "}
                {listing[0].guitar.model}
              </h2>
              <h4>Finish: {listing[0].guitar.color}</h4>
              <h4>Handedness: {listing[0].guitar.handedness}</h4>
              <h4>Price: ${listing[0].guitar.price}</h4>
              <button>Add to Cart</button>
            </div>
          </>
        )}
      </div>

      {listing && (
        <div className="single-guitar-description">
          <h2>
            Learn about the {listing[0].guitar.year} {listing[0].guitar.make}{" "}
            {listing[0].guitar.model}
          </h2>
          <h4>{listing[0].guitar.description}</h4>
          <h2>Specs</h2>
          <p>Type: {listing[0].guitar.guitar_type}</p>
          <p>Body Type: {listing[0].guitar.body_type}</p>
          <p>Wood: {listing[0].guitar.wood_type}</p>
          <p>Pickup Type: {listing[0].guitar.pickup_type}</p>
          <p>Joint: {listing[0].guitar.joint_type}</p>
          <p>Fretboard Wood: {listing[0].guitar.fretboard_material}</p>
          <p>Fret Count: {listing[0].guitar.frets}</p>
          <p>Inlay Design: {listing[0].guitar.inlays}</p>
          <p>Pickguard: {listing[0].guitar.pickguard}</p>
          <p>Pickup Selector: {listing[0].guitar.pickup_selector}</p>
        </div>
      )}
    </>
  );
};

export default GuitarDetail;
