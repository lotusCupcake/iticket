import { Avatar, Box } from "@chakra-ui/react";

const Header = () => {
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
      <Avatar bg="primaryGray" size="md" src="https://bit.ly/broken-link" />
    </Box>
  );
};

export default Header;
