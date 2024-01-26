import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "primary.dark",
        color: "secondary.light",
        maxHeight: "fit-content",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Typography variant="h5">Technology Used:</Typography>
        </Box>
        <Box display="flex" direction="row" spacing={2}>
          <img
            src={"https://img.icons8.com/?size=48&id=20909&format=png"}
            alt="HTML"
          />

          <img
            src={"https://img.icons8.com/?size=48&id=21278&format=png"}
            alt="CSS"
          />

          <img
            src={"https://img.icons8.com/?size=48&id=PXTY4q2Sq2lG&format=png"}
            alt="Javascript"
          />

          <img
            src={"https://img.icons8.com/?size=40&id=bzf0DqjXFHIW&format=png"}
            alt="React"
          />

          <img
            src={"https://img.icons8.com/?size=48&id=13441&format=png"}
            alt="Python"
          />

          <img
            src={"https://img.icons8.com/?size=64&id=ewGOClUtmFX4&format=png"}
            alt="Flask"
          />
        </Box>

        <Box>
          <h5>Fibson by Josh Zumbrunn</h5>
          <h5>Check out more!</h5>
          <div className="socials">
            <div>
              <a href="https://github.com/jzumbrunn21">
                <img
                  src={"https://img.icons8.com/?size=64&id=52539&format=png"}
                  alt="Github"
                />
              </a>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/josh-zumbrunn-622622274/">
                <img
                  src={
                    "https://img.icons8.com/?size=48&id=xuvGCOXi8Wyg&format=png"
                  }
                  alt="Linkedin"
                />
              </a>
            </div>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
