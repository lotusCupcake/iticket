import LayoutAuth from "../layouts/LayoutAuth";
import {
  chakra,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket, FaEnvelope, FaLock } from "react-icons/fa6";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <LayoutAuth>
      <Heading size="xl" textAlign="center" mb={3} color="primaryBlue">
        Login
      </Heading>
      <Box
        w="30%"
        borderColor="primaryYellow"
        boxShadow="md"
        mb={14}
        borderBottomWidth={3}
        mx="auto"
      ></Box>
      <form>
        <HStack mb={2}>
          <label htmlFor="email">Email</label>
        </HStack>
        <InputGroup size="lg" mb={4}>
          <InputLeftElement
            pointerEvents="none"
            color={useColorModeValue("primaryGray")}
            fontSize="1.25rem"
          >
            <FaEnvelope />
          </InputLeftElement>
          <Input
            id="email"
            placeholder="username@example.com"
            type="email"
            focusBorderColor="primaryBlue"
          />
        </InputGroup>
        <HStack mb={2}>
          <label htmlFor="password">Password</label>
        </HStack>
        <InputGroup size="lg" mb={14}>
          <InputLeftElement
            pointerEvents="none"
            color={useColorModeValue("primaryGray")}
            fontSize="1.25rem"
          >
            <FaLock />
          </InputLeftElement>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            focusBorderColor="primaryBlue"
          />
        </InputGroup>
        <Button
          rightIcon={<FaArrowRightFromBracket />}
          color={"white"}
          backgroundColor="primaryBlue"
          _hover={{ bg: "darkBlue" }}
          type="submit"
          size="lg"
          w="full"
          rounded={"2xl"}
          onClick={() => navigate("/assign-issues")}
        >
          Sign In
        </Button>
        <Text
          fontSize="sm"
          textAlign="center"
          color={useColorModeValue("primaryGray")}
          mt={2}
        >
          Dont have an account yet?{" "}
          <chakra.a
            onClick={() => navigate("/register")}
            color="primaryBlue"
            cursor="pointer"
            _hover={{ color: "darkBlue", textDecoration: "underline" }}
          >
            Register here
          </chakra.a>
        </Text>
      </form>
    </LayoutAuth>
  );
};

export default LoginPage;
