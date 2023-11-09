import React, { useEffect, useState } from "react";
import "./GuitarDetail.css";
import { readOneListingThunk } from "../../store/listings";
import { addToCartThunk, readUserCartThunk } from "../../store/shoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const GuitarDetail = () => {
  const dispatch = useDispatch();
  const { guitarId } = useParams();
  const listing = useSelector(
    (state) => Object.values(state.listings.listing)[0]
  );
  const sessionUser = useSelector((state) => state.session.user);
  console.log("LISTING", listing);
  const [listingEdit, setListingEdit] = useState(listing);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setListingEdit(listing);
    dispatch(readOneListingThunk(guitarId)).then(() => setIsLoading(false));
  }, [dispatch]);

  const handleAddToCart = async (e) => {
    e.preventDefault();

    await dispatch(addToCartThunk(listing, sessionUser.id, guitarId));

    alert("Added to cart");
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }
  return (
    <>
      <div className="main-guitar-detail">
        {listing && listing[0] && (
          <>
            <div className="single-guitar-images-container">
              {/* <h3>Images</h3> */}
              <Carousel
                className="carousel"
                autoPlay={true}
                width={800}
                infiniteLoop={true}
              >
                {listing[0].images &&
                  listing[0].images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={listing[0].guitar.model}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="single-guitar-info-container">
              <h2>
                {listing[0].guitar.year} {listing[0].guitar.make}{" "}
                {listing[0].guitar.model}
              </h2>
              <h4>Finish: {listing[0].guitar.color}</h4>
              <h4>Handedness: {listing[0].guitar.handedness}</h4>
              <h4>Price: ${listing[0].guitar.price}</h4>
              {sessionUser && (
                <button onClick={handleAddToCart}>Add to Cart</button>
              )}
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
          <p>Pickguard: {listing[0].guitar.pickguard ? "Yes" : "No"}</p>
          <p>Pickup Selector: {listing[0].guitar.pickup_selector}</p>
        </div>
      )}
    </>
  );
};

export default GuitarDetail;
