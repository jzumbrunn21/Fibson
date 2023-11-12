import React, { useEffect, useState } from "react";
import "./GuitarDetail.css";
import { readOneListingThunk } from "../../store/listings";
import { addToCartThunk, readUserCartThunk } from "../../store/shoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const GuitarDetail = () => {
  const dispatch = useDispatch();
  const { guitarId } = useParams();
  const listing = useSelector(
    (state) => Object.values(state.listings.listing)[0]
  );
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
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

    history.push(`/cart/${sessionUser.id}`);
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
                // width={"40%"}
                // height={400}
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
              <div className="single-guitar-info-container">
                <h2>
                  {listing[0].guitar.year} {listing[0].guitar.make}{" "}
                  {listing[0].guitar.model}
                </h2>
                <div className="newer-line-break"></div>
                <h4>Finish: {listing[0].guitar.color}</h4>
                <div className="newer-line-break"></div>
                <h4>Handedness: {listing[0].guitar.handedness}</h4>
                <div className="newer-line-break"></div>
                <h4>Price: ${listing[0].guitar.price}</h4>
                <div className="newer-line-break"></div>
                {sessionUser && (
                  <button onClick={handleAddToCart}>
                    <h3>Add to Cart</h3>
                  </button>
                )}
              </div>
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
          <div className="new-line-break"></div>
          <h2>Specs</h2>
          <div className="specs">
            <div>
              <h2>Materials</h2>
              <h4>Type: {listing[0].guitar.guitar_type}</h4>
              <h4>Body Type: {listing[0].guitar.body_type}</h4>
              <h4>Wood: {listing[0].guitar.wood_type}</h4>
            </div>
            <div className="vert-line"></div>
            <div>
              <h2>Pickups</h2>
              <h4>Pickup Type: {listing[0].guitar.pickup_type}</h4>
              <h4>Pickguard: {listing[0].guitar.pickguard ? "Yes" : "No"}</h4>
              <h4>Pickup Selector: {listing[0].guitar.pickup_selector}</h4>
            </div>
            <div className="vert-line"></div>
            <div>
              <h2>Neck</h2>
              <h4>Joint: {listing[0].guitar.joint_type}</h4>
              <h4>Fretboard Wood: {listing[0].guitar.fretboard_material}</h4>
              <h4>Fret Count: {listing[0].guitar.frets}</h4>
              <h4>Inlay Design: {listing[0].guitar.inlays}</h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GuitarDetail;
