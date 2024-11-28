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
      <Heading size="xl" textAlign="center" mb={3} color="primaryBlue">
        Register
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
          <label htmlFor="name">Name</label>
        </HStack>
        <InputGroup size="lg" mb={4}>
          <InputLeftElement
            pointerEvents="none"
            color={useColorModeValue("primaryGray")}
            fontSize="1.25rem"
          >
            <FaUser />
          </InputLeftElement>
          <Input
            id="name"
            placeholder="user"
            type="text"
            focusBorderColor="primaryBlue"
          />
        </InputGroup>
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
        </InputGroup>{" "}
        <HStack mb={2}>
          <label htmlFor="email">Role</label>
        </HStack>
        <Select
          placeholder="Select role"
          size="lg"
          mb={4}
          focusBorderColor="primaryBlue"
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
        <HStack mb={2}>
          <label htmlFor="retypePassword">Retype Password</label>
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
            id="retypePassword"
            placeholder="Retype Password"
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
        >
          Sign Up
        </Button>
        <Text
          fontSize="sm"
          textAlign="center"
          color={useColorModeValue("primaryGray")}
          mt={2}
        >
          Do you already have an account?{" "}
          <chakra.a
            onClick={() => navigate("/login")}
            color="primaryBlue"
            cursor="pointer"
            _hover={{ color: "darkBlue", textDecoration: "underline" }}
          >
            Login
          </chakra.a>
        </Text>
      </form>
    </LayoutAuth>
  );
};

export default RegisterPage;
