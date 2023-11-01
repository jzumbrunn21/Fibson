import React, { useEffect } from "react";
import { readAllListingsThunk } from "../../store/listings";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const AllListingsPage = () => {
  const dispatch = useDispatch();
  const allListings = useSelector((state) =>
    Object.values(state.listings.listings)
  );

  useEffect(() => {
    dispatch(readAllListingsThunk());
  }, [dispatch]);
  return (
    <>
      <h1>All Guitars</h1>
      <div className="all-listings-container">
        {allListings.map((listing) => (
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
            <div all-listings-info-container>
              <h3>
                {listing.guitar.year} {listing.guitar.make}{" "}
                {listing.guitar.model}
              </h3>
              <h5>{listing.guitar.color}</h5>
              <h5>${listing.guitar.price}</h5>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AllListingsPage;
