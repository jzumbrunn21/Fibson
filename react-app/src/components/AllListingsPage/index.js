import React, { useEffect, useState } from "react";
import { readAllListingsThunk } from "../../store/listings";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./AllListingsPage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AllListingsPage = () => {
  const dispatch = useDispatch();
  const allListings = useSelector((state) =>
    Object.values(state.listings.listings)
  );
  const [listings, setListings] = useState(allListings);
  console.log("ALL", allListings);

  useEffect(() => {
    setListings(allListings);
    dispatch(readAllListingsThunk());
  }, []);

  return (
    <>
      <div className="listings-filter">
        <h1>All Guitars</h1>
      </div>
      <div className="all-listings-container">
        {allListings.map((listing) => (
          <Link
            to={`/listings/${listing.guitar.id}`}
            key={listing.guitar.id}
            className="single-listing-container"
          >
            <div className="all-listing-image">
              {/* <img
                src={listing.images[0]}
                alt={`${listing.guitar.make}, ${listing.guitar.model}`}
              /> */}
              <Carousel
                showThumbs={false}
                showArrows={false}
                autoPlay={true}
                showIndicators={false}
                interval={5000}
              >
                {listing.images &&
                  listing.images.map((image, index) => (
                    <img key={index} src={image} alt={listing.guitar.model} />
                  ))}
              </Carousel>
            </div>
            <div className="all-listings-info-container">
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
