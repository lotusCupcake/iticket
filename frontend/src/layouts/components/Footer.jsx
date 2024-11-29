import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      w="full"
      h="16"
      bg="white"
      display="flex"
      alignItems="center"
      justifyContent="end"
      mt="auto"
      bottom="0"
    >
      <Text fontSize="sm" color="primaryBlue" mr={5}>
        © {new Date().getFullYear()} iTicket. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
