import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Icon,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import {
  FaArrowRightFromBracket,
  FaChevronLeft,
  FaLock,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/userApi";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const onHandleSignOut = () => {
    userApi.signOut();
    navigate("/login");
  };
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      bg={"coldBlue"}
    >
      <Card borderRadius="md" boxShadow="lg" bg={"white"}>
        <CardBody textAlign="center">
          <Box mb={4} p={4}>
            <Icon as={FaLock} boxSize={12} color="primaryBlue" />
          </Box>
          <Heading as="h1" size="xl" mb={2}>
            Unauthorized Access
          </Heading>
          <Text fontSize="lg" mb={4}>
            You do not have permission to access this page.
          </Text>
        </CardBody>
        <CardFooter>
          <Flex width="full" justifyContent="center" gap={2}>
            <Button
              leftIcon={<FaChevronLeft />}
              colorScheme={"gray"}
              size="md"
              onClick={() => navigate("/")}
            >
              Back
            </Button>
            <Button
              leftIcon={<FaArrowRightFromBracket />}
              onClick={onHandleSignOut}
              color={"white"}
              backgroundColor="primaryBlue"
              _hover={{ bg: "darkBlue" }}
              size="md"
            >
              logout
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default UnauthorizedPage;
