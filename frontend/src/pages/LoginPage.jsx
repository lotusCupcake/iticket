import LayoutAuth from "../layouts/LayoutAuth";
import {
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
      <Heading size="xl" textAlign="center" mb={3} color="#022D6D">
        Login
      </Heading>
      <Box
        w="30%"
        borderColor="#FFBF00"
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
            color={useColorModeValue("gray.500")}
            fontSize="1.25rem"
          >
            <FaEnvelope />
          </InputLeftElement>
          <Input
            id="email"
            placeholder="username@example.com"
            type="email"
            focusBorderColor="#022D6D"
          />
        </InputGroup>
        <HStack mb={2}>
          <label htmlFor="password">Password</label>
        </HStack>
        <InputGroup size="lg" mb={14}>
          <InputLeftElement
            pointerEvents="none"
            color={useColorModeValue("gray.500")}
            fontSize="1.25rem"
          >
            <FaLock />
          </InputLeftElement>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            focusBorderColor="#022D6D"
          />
        </InputGroup>
        <Button
          rightIcon={<FaArrowRightFromBracket />}
          color={"white"}
          backgroundColor="#022D6D"
          _hover={{ bg: "#012457" }}
          type="submit"
          size="lg"
          w="full"
          rounded={"2xl"}
        >
          Sign In
        </Button>
        <Text
          fontSize="sm"
          textAlign="center"
          color={useColorModeValue("gray.600", "gray.400")}
          mt={2}
        >
          Dont have an account yet?{" "}
          <a
            onClick={() => navigate("/register")}
            style={{ color: "#022D6D", cursor: "pointer" }}
          >
            Register here
          </a>
        </Text>
      </form>
    </LayoutAuth>
  );
};

export default LoginPage;
