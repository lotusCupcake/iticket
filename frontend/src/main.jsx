import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/montserrat";

const theme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "1024px",
    xl: "1440px",
  },
  colors: {
    primaryBlue: "#022D6D",
    darkBlue: "#012457",
    coldBlue: "#F9F9F9",
    primaryYellow: "#FFBF00",
    primaryGray: "#6b7280",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
