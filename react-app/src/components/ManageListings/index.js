import React, { useEffect, useState } from "react";
import { readAllUserListingsThunk } from "../../store/listings";
import { useSelector, useDispatch } from "react-redux";
import "./ManageListings.css";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteListingModal from "../DeleteListingModal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ManageListings = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) =>
    Object.values(state.listings.listings)
  );
  const [usersListings, setUsersListings] = useState(listings);
  const history = useHistory();

  useEffect(() => {
    setUsersListings(listings);
    dispatch(readAllUserListingsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="manage-listings-filter">
        <h1>Manage your Guitar Listings:</h1>
        <button onClick={() => history.push("/create")}>
          Create a Guitar Listing
        </button>
      </div>
      <div className="manage-all-listings-container">
        {listings.map(
          (listing) =>
            listing.guitar && (
              <div key={listing.guitar.id}>
                {/* <h1>{listing.guitar.id}</h1> */}
                <div className="manage-single-listing-container">
                  {listing && listings[0] && (
                    <Link to={`/listings/${listing.guitar.id}`}>
                      <div className="manage-all-listing-image">
                        <Carousel
                          showThumbs={false}
                          showArrows={false}
                          autoPlay={true}
                          showIndicators={false}
                          interval={2000}
                        >
                          {/* {listing.images && listing.images.length > 0 && (
                          <img
                            src={listing.images[0].url}
                            alt={`${listing.guitar.make}, ${listing.guitar.model}`}
                          />
                        )} */}
                          {listing.images &&
                            listing.images.map((image, index) => (
                              <img
                                key={index}
                                src={image.url}
                                alt={listing.guitar.model}
                              />
                            ))}
                        </Carousel>
                      </div>
                    </Link>
                  )}
                  <div className="manage-all-listings-info-container">
                    <h3>
                      {listing.guitar.year} {listing.guitar.make}{" "}
                      {listing.guitar.model}
                    </h3>
                    <h5>{listing.guitar.color}</h5>
                    <h5>${listing.guitar.price}</h5>
                    <div className="manage-button-container">
                      <button
                        onClick={() => {
                          history.push(`/update/${listing.guitar.id}`);
                        }}
                      >
                        Update
                      </button>
                      {/* <button onClick={handleDelete}>Delete</button> */}
                      <OpenModalButton
                        className="delete-button"
                        buttonText="Delete"
                        modalComponent={
                          <DeleteListingModal guitarId={listing.guitar.id} />
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};
export default ManageListings;
