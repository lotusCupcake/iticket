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
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightToBracket, FaEnvelope, FaLock } from "react-icons/fa6";
import { useState } from "react";
import { userApi } from "../api/userApi";
import useUserStore from "../store/userStore";

const LoginPage = () => {
  const fetchProfile = useUserStore((state) => state.fetchProfile);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();

  const onHandleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formValues;

    if (!email || !password) {
      toast({
        title: "Please fill all the form fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      await userApi.login(email, password);

      fetchProfile();

      navigate("/");

      setFormValues({ email: "", password: "" });

      toast({
        title: "Success login",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Oops, something went wrong! " + error.response.data.message,
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
      <form onSubmit={onHandleLogin}>
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
            name="email"
            placeholder="username@example.com"
            type="email"
            focusBorderColor="primaryBlue"
            value={formValues.email}
            onChange={handleChange}
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
            name="password"
            placeholder="Password"
            type="password"
            focusBorderColor="primaryBlue"
            value={formValues.password}
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
