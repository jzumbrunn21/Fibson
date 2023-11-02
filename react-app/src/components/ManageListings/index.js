import React, { useEffect } from "react";
import {
  readAllUserListingsThunk,
  deleteListingThunk,
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
  const history = useHistory();

  useEffect(() => {
    dispatch(readAllUserListingsThunk());
  }, [dispatch]);

  // const handleDelete = async (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   return (
  //     <>
  //       <OpenModalButton
  //         className="delete-button"
  //         buttonText="Delete"
  //         modalComponent={<DeleteListingModal
  //         guitarId={listing.guitar.id}
  //         />}
  //       />
  //     </>
  //   );
  // };
  const handleUpdate = async (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <>
      <div className="listings-filter">
        <h1>Manage your Guitar Listings:</h1>
        <button onClick={() => history.push("/create")}>
          Create a Guitar Listing
        </button>
      </div>
      <div className="all-listings-container">
        {listings.map((listing) => (
          <>
            <Link
              to={`/listings/${listing.guitar.id}`}
              key={listing.guitar.id}
              className="single-listing-container"
            >
              <div className="all-listing-image">
                <img
                  src={listing.images[0]}
                  alt={`${listing.guitar.make}, ${listing.guitar.model}`}
                />
              </div>
              <div className="all-listings-info-container">
                <h3>
                  {listing.guitar.year} {listing.guitar.make}{" "}
                  {listing.guitar.model}
                </h3>
                <h5>{listing.guitar.color}</h5>
                <h5>${listing.guitar.price}</h5>
              </div>
              <div className="manage-button-container">
                <button onClick={handleUpdate}>Update</button>
                {/* <button onClick={handleDelete}>Delete</button> */}
                <OpenModalButton
                  className="delete-button"
                  buttonText="Delete"
                  modalComponent={
                    <DeleteListingModal guitarId={listing.guitar.id} />
                  }
                />
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  );
};
export default ManageListings;
