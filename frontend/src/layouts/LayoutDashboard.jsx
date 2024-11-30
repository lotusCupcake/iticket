import { Box, Flex } from "@chakra-ui/react";
import { Header, Sidebar, Footer } from "./components";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const LayoutDashboard = ({ children }) => {
  const [navSize, setNavSize] = useState("large");
  const location = useLocation();
  return (
    <Flex direction="column" minHeight="100vh" backgroundColor={"coldBlue"}>
      <Sidebar navSize={navSize} changeNavSize={setNavSize} />
      <Header />
      <Box
        ml={navSize === "small" ? "75px" : "220px"}
        mt={location.pathname === "/profile" ? "40" : "20"}
        mb="16"
        p={4}
        height="full"
      >
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default LayoutDashboard;
