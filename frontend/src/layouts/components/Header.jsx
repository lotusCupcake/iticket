import { Avatar, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box
      w="full"
      h="20"
      bg="white"
      pos="fixed"
      zIndex="1000"
      display="flex"
      alignItems="center"
      justifyContent="right"
      px={4}
      boxShadow="md"
    >
      <Avatar
        cursor="pointer"
        size="md"
        src="https://bit.ly/broken-link"
        onClick={() => navigate("/profile")}
      />
    </Box>
  );
};

export default Header;
