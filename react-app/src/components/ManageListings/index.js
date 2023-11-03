import React, { useEffect, useState } from "react";
import {
  readAllUserListingsThunk,
} from "../../store/listings";
import { useSelector, useDispatch } from "react-redux";
import "./ManageListings.css";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteListingModal from "../DeleteListingModal";

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
                  <Link to={`/listings/${listing.guitar.id}`}>
                    <div className="manage-all-listing-image">
                      {listing.images && listing.images.length > 0 && (
                        <img
                          src={listing.images[0].url}
                          alt={`${listing.guitar.make}, ${listing.guitar.model}`}
                        />
                      )}
                    </div>
                  </Link>
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
