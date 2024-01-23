import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ModalProvider, Modal } from "./context/Modal";
import configureStore from "./store";
import * as sessionActions from "./store/session";
// import * as listingsActions from "./store/listings";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
  // window.listingsActions = listingsActions;
}

// Material UI Theme

const theme = createTheme({
  palette: {
    primary: {
      light: "#212529", //grey
      main: "#000000", //black
    },
    secondary: {
      light: "#fafafa", //white
      main: "#84734d", //gold
    },
  },
});

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
            <Modal />
          </BrowserRouter>
        </Provider>
      </ModalProvider>
    </ThemeProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
