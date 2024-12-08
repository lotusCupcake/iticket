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
  useToast,
} from "@chakra-ui/react";
import {
  FaArrowRightToBracket,
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/userApi";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    retypePassword: "",
  });

  const toast = useToast();

  const onHandleRegister = async (e) => {
    e.preventDefault();

    const { name, email, role, password, retypePassword } = formValues;

    if ((!name || !email || !role || !password, !retypePassword)) {
      toast({
        title: "Please fill all the form fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (password !== retypePassword) {
      toast({
        title: "Password and Retype Password doesn't match",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      await userApi.register(name, email, role, password);

      navigate("/login");

      setFormValues({
        name: "",
        email: "",
        role: "",
        password: "",
        retypePassword: "",
      });

      toast({
        title: "Success Register, wait for admin approval",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Failed to Register, " + error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

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
      <form onSubmit={onHandleRegister}>
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
            name="name"
            id="name"
            placeholder="user"
            type="text"
            focusBorderColor="primaryBlue"
            value={formValues.name}
            onChange={handleChange}
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
            name="email"
            id="email"
            placeholder="username@example.com"
            type="email"
            focusBorderColor="primaryBlue"
            value={formValues.email}
            onChange={handleChange}
          />
        </InputGroup>{" "}
        <HStack mb={2}>
          <label htmlFor="email">Role</label>
        </HStack>
        <Select
          name="role"
          placeholder="Select Role"
          size="lg"
          mb={4}
          focusBorderColor="primaryBlue"
          onChange={handleChange}
        >
          <option value="STUDENT" selected={formValues.role === "STUDENT"}>
            Student
          </option>
          <option value="HANDLER" selected={formValues.role === "HANDLER"}>
            Handler
          </option>
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
            name="password"
            id="password"
            placeholder="Password"
            type="password"
            focusBorderColor="primaryBlue"
            value={formValues.password}
            onChange={handleChange}
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
            name="retypePassword"
            id="retypePassword"
            placeholder="Retype Password"
            type="password"
            focusBorderColor="primaryBlue"
            value={formValues.retypePassword}
            onChange={handleChange}
          />
        </InputGroup>
        <Button
          rightIcon={<FaArrowRightToBracket />}
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
