import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footy-container">
      <div className="footy-title">
        <h5>Technology Used:</h5>
      </div>
      <div className="tech-used">
        <ul>
          <li>
            <img
              src={"https://img.icons8.com/?size=48&id=20909&format=png"}
              alt="HTML"
            />
          </li>
          <li>
            <img
              src={"https://img.icons8.com/?size=48&id=21278&format=png"}
              alt="CSS"
            />
          </li>
          <li>
            <img
              src={"https://img.icons8.com/?size=48&id=PXTY4q2Sq2lG&format=png"}
              alt="Javascript"
            />
          </li>
          <li>
            <img
              src={"https://img.icons8.com/?size=40&id=bzf0DqjXFHIW&format=png"}
              alt="React"
            />
          </li>
          <li>
            <img
              src={"https://img.icons8.com/?size=48&id=13441&format=png"}
              alt="Python"
            />
          </li>
          <li>
            <img
              src={"https://img.icons8.com/?size=64&id=ewGOClUtmFX4&format=png"}
              alt="Flask"
            />
          </li>
        </ul>
      </div>
      <div className="footy-me">
        <h5>Fibson by Josh Zumbrunn</h5>
        <h5>Check out Github!</h5>
        <a href="https://github.com/jzumbrunn21">
          <img
            src={"https://img.icons8.com/?size=64&id=52539&format=png"}
            alt="Github"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
