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
  FaQuestion,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/userApi";
import useUserStore from "../store/userStore";

const UnauthorizedPage = () => {
  const user = useUserStore((state) => state.user);
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
            <Icon as={FaQuestion} boxSize={12} color="primaryBlue" />
          </Box>
          <Heading as="h1" size="xl" mb={2}>
            Not Found
          </Heading>
          <Text fontSize="lg" mb={4}>
            The page you are looking for does not exist.
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
            {user && (
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
            )}
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default UnauthorizedPage;
