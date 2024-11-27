import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

const LayoutAuth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Flex h="100vh" w="full" alignItems="center" justifyContent="center">
      <Flex
        w={{ base: "90%", md: "900px" }}
        h="auto"
        boxShadow="xl"
        borderRadius="md"
        overflow="hidden"
      >
        <Box
          w="50%"
          bgGradient="linear(to-b, #FFBF00, #022D6D)"
          color="white"
          p={8}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading size="lg" mb={3}>
            Welcome
          </Heading>
          <Box
            w="40%"
            borderColor="white"
            boxShadow="md"
            mb={4}
            borderBottomWidth={3}
          ></Box>
          <Text fontSize="lg" textAlign="center" mb={4} fontWeight="bold">
            Your Expertize, Ther Solution
          </Text>
          <Button
            rightIcon={<FaArrowRightFromBracket />}
            colorScheme="white"
            variant="outline"
            size="lg"
            w="full"
            _hover={{
              borderColor: "#012457",
              color: "#012457",
            }}
            rounded={"2xl"}
            onClick={() =>
              location.pathname == "/login"
                ? navigate("/register")
                : navigate("/login")
            }
          >
            {location.pathname == "/login" ? "Sign Up" : "Sign In"}
          </Button>
        </Box>
        <Box
          w="50%"
          p={7}
          bg={useColorModeValue("white", "gray.700")}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box display="flex" justifyContent="center" mb={6}>
            <img src="/logo-vertikal.jpg" alt="Logo" width="150px" />
          </Box>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default LayoutAuth;
