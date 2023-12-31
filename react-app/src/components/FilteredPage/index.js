import React, { useEffect, useState } from "react";
import { readAllListingsThunk } from "../../store/listings";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./FilteredPage.css";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const FilteredPage = () => {
  const dispatch = useDispatch();
  const { type, category } = useParams();
  const listings = useSelector((state) =>
    Object.values(state.listings.listings)
  );
  // console.log("FILTERED LISTINGS", listings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(readAllListingsThunk(type, category)).then(() => setIsLoading(false));
  }, [dispatch, type, category]);

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <>
      <div className="listings-filter">
        {listings && listings.length > 0 ? (
          <h2>Check out our {category} collection:</h2>
        ) : (
          <h2>There are no {category} guitars in our inventory yet!</h2>
        )}
      </div>
      <div className="all-listings-container">
        {listings.map(
          (listing) =>
            listing.guitar && (
              <Link
                to={`/listings/${listing.guitar.id}`}
                key={listing.guitar.id}
                className="single-listing-container"
              >
                <div>
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
                    infiniteLoop={true}
                  >
                    {listing.images &&
                      listing.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={listing.guitar.model}
                          className="all-listing-image"
                        />
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
            )
        )}
      </div>
    </>
  );
};

export default FilteredPage;
