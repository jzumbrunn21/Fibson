import React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import guitar from "./guitar.jpg";
const SplashPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Splash Image/All Guitars */}
      <Box
        className="splash-page-header"
        backgroundColor="primary.dark"
        sx={{
          height: "400px",
          width: "100%",
          // mb: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box className="header-title" padding="40px">
          <Typography variant="h5" color="secondary.light">
            Find your dream guitar!
          </Typography>
          <Typography variant="h5" color="secondary.light" mt="15px">
            Explore our newest guitars in stock
          </Typography>
        </Box>
        <ImageListItem
          className="splash-page-header-image"
          justifySelf="center"
        >
          <img
            src={guitar}
            alt="All Listings"
            style={{ height: "400px", width: "800px" }}
          />
        </ImageListItem>
        <Box
          className="header-all-listings"
          alignSelf="flex-end"
          // mx="100px"
          mb="40px"
        >
          <Button
            href="/listings"
            sx={{
              backgroundColor: "secondary.dark",
              color: "secondary.light",
              p: "10px",
              height: "fit-content",
            }}
          >
            <Typography>Shop All Guitars</Typography>
          </Button>
        </Box>
      </Box>

      {/* Info Boxes */}
      <ImageList
        className="info-boxes"
        sx={{ display: "flex", justifyContent: "space-evenly", width: "80%" }}
      >
        <ImageListItem className="black-box">
          <img
            src={
              "https://images.ctfassets.net/m8onsx4mm13s/4qm6G6cNU4mSAb566UuIJ1/5dfd9c110728306b565b59671a95cc83/In-Time-For-Holidays__2_.png"
            }
            alt="Free Shipping"
            className="black-box-image"
            // objectFit="cover"
          />
          <Box
            className="black-box-deets1"
            position="absolute"
            top={0}
            left={0}
            zIndex={1}
          >
            <Typography variant="h6" color="secondary.light">
              Free Shipping
            </Typography>
            <Typography variant="h7" color="secondary.light">
              On online orders over $50.
            </Typography>
          </Box>
        </ImageListItem>
        <ImageListItem className="black-box">
          <img
            src={
              "https://images.ctfassets.net/m8onsx4mm13s/6IvzKzqfqdVRKgZHjBqFIk/de259c13ae15133900b72c494b76c694/Lifetime-Warranty__2_.png"
            }
            alt="Lifetime Warranty"
            className="black-box-image"
            objectFit="contain"
          />
          <Box
            className="black-box-deets2"
            position="absolute"
            top={0}
            left={0}
            zIndex={1}
          >
            <Typography variant="h6" color="secondary.light">
              Lifetime Warranty
            </Typography>
            <Typography variant="h7" color="secondary.light">
              Free, limited warranty on material and workmanship
            </Typography>
          </Box>
        </ImageListItem>
        <ImageListItem className="black-box">
          <img
            src={
              "https://images.ctfassets.net/m8onsx4mm13s/24dB0X9zp0nHGgGooFJUGn/2d7bed365abe0a24ffa79eb21b4e1f3a/Financing-Available__2_.png"
            }
            alt="Financing Available"
            className="black-box-image"
            object-fit="contain"
          />
          <Box
            className="black-box-deets3"
            position="absolute"
            top={0}
            left={0}
            zIndex={1}
          >
            <Typography variant="h6" color="secondary.light">
              Financing Available
            </Typography>
            <Typography variant="h7" color="secondary.light">
              Options available through your wallet at checkout.
            </Typography>
          </Box>
        </ImageListItem>
      </ImageList>

      {/* Splash Categories */}
      <Box className="splash-categories">
        <h2>Shop by Category</h2>
        <ul>
          <li>
            <NavLink
              className="splash-nav"
              exact
              to="/listings/filter/make/Gibson"
            >
              <img
                src={
                  "https://cf1.zzounds.com/media/productmedia/fit,600by800/quality,85/8_Full_Left_Front_49354-7e457b83dc9420b5962a29e23635caac.jpg"
                }
                alt="Gibson"
              />{" "}
              <h4>Gibson ▸ </h4>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="splash-nav"
              exact
              to="/listings/filter/make/Fender"
            >
              <img
                src={
                  "https://cf1.zzounds.com/media/productmedia/fit,600by800/quality,85/8_Full_Left_Front_NA-57de9073231835d223baf4c6f759fae3.jpg"
                }
                alt="Fender"
              />{" "}
              <h4>Fender ▸</h4>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="splash-nav"
              exact
              to="/listings/filter/make/PRS"
            >
              <img
                src={
                  "https://cf1.zzounds.com/media/productmedia/fit,600by800/quality,85/8_Full_Left_Front_NA-318bf1e9f2d567cbff3e388f316482fe.jpg"
                }
                alt="PRS"
              />{" "}
              <h4>PRS ▸</h4>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="splash-nav"
              exact
              to="/listings/filter/make/Ibanez"
            >
              <img
                src={
                  "https://cf1.zzounds.com/media/productmedia/fit,600by800/quality,85/8_Full_Left_Front_NA-ee30d18005405a5b3834b59504affcd3.jpg"
                }
                alt="Ibanez"
              />{" "}
              <h4>Ibanez ▸</h4>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="splash-nav"
              exact
              to="/listings/filter/make/Taylor"
            >
              <img
                src={
                  "https://cf1.zzounds.com/media/productmedia/fit,600by800/quality,85/8_Full_Left_Front_NA-a51a32c0d34978c1aae618063eb8a7a9.jpg"
                }
                alt="Taylor"
              />{" "}
              <h4>Taylor ▸</h4>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="splash-nav"
              exact
              to="/listings/filter/make/Martin"
            >
              <img
                src={
                  "https://cf1.zzounds.com/media/productmedia/fit,600by800/quality,85/8_Full_Left_Front_48136-165007dfb2a0ed24e91646c479093d05.jpg"
                }
                alt="Martin"
              />{" "}
              <h4>Martin ▸</h4>
            </NavLink>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default SplashPage;
