import { Box, Flex, Text } from "@chakra-ui/react";
import { Header, Sidebar, Footer } from "./components";
import { useState } from "react";
const LayoutDashboard = () => {
  const [navSize, setNavSize] = useState("large");
  return (
    <Flex direction="column" minHeight="100vh" backgroundColor={"coldBlue"}>
      <Sidebar navSize={navSize} changeNavSize={setNavSize} />
      <Header />
      <Box
        ml={navSize === "small" ? "75px" : "220px"}
        mt="20"
        mb="16"
        p={4}
        height="100vh"
      >
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla sequi
          aut fugiat illo tempora similique aperiam dolorem dignissimos. Esse ab
          quia id, laboriosam nesciunt atque.
        </Text>
      </Box>
      <Footer />
    </Flex>
  );
};

export default LayoutDashboard;
