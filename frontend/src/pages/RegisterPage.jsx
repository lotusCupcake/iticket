import LayoutAuth from "../layouts/LayoutAuth";
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaArrowRightFromBracket,
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <LayoutAuth>
      <Heading size="xl" textAlign="center" mb={3} color="#022D6D">
        Register
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
          <label htmlFor="name">Name</label>
        </HStack>
        <InputGroup size="lg" mb={4}>
          <InputLeftElement
            pointerEvents="none"
            color={useColorModeValue("gray.500")}
            fontSize="1.25rem"
          >
            <FaUser />
          </InputLeftElement>
          <Input
            id="name"
            placeholder="user"
            type="text"
            focusBorderColor="#022D6D"
          />
        </InputGroup>
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
        </InputGroup>{" "}
        <HStack mb={2}>
          <label htmlFor="email">Role</label>
        </HStack>
        <Select
          placeholder="Select role"
          size="lg"
          mb={4}
          focusBorderColor="#022D6D"
        >
          <option value="STUDENT">Student</option>
          <option value="HANDLER">Handler</option>
        </Select>
        <HStack mb={2}>
          <label htmlFor="password">Password</label>
        </HStack>
        <InputGroup size="lg" mb={4}>
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
        <HStack mb={2}>
          <label htmlFor="retypePassword">Retype Password</label>
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
            id="retypePassword"
            placeholder="Retype Password"
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
          Sign Up
        </Button>
        <Text
          fontSize="sm"
          textAlign="center"
          color={useColorModeValue("gray.600", "gray.400")}
          mt={2}
        >
          Do you already have an account?{" "}
          <a
            onClick={() => navigate("/login")}
            style={{ color: "#022D6D", cursor: "pointer" }}
          >
            Login
          </a>
        </Text>
      </form>
    </LayoutAuth>
  );
};

export default RegisterPage;
