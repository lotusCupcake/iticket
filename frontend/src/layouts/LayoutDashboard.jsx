import { Box, Flex } from "@chakra-ui/react";
import { Header, Sidebar, Footer } from "./components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useUserStore from "../store/userStore";
import { ROLES } from "../constant/roles";

const LayoutDashboard = ({ children }) => {
  const [navSize, setNavSize] = useState("large");
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const fetchProfile = useUserStore((state) => state.fetchProfile);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Flex direction="column" minHeight="100vh" backgroundColor={"coldBlue"}>
      {/* Sidebar desktop */}
      {user?.role === ROLES.ADMIN && (
        <Box display={{ base: "none", md: "block" }}>
          <Sidebar navSize={navSize} changeNavSize={setNavSize} />
        </Box>
      )}

      <Header user={user} />

      <Box
        ml={{
          base: 0,
          md:
            user?.role === ROLES.ADMIN
              ? navSize === "small"
                ? "75px"
                : "220px"
              : "0",
        }}
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
