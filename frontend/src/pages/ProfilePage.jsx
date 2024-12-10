import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaChevronLeft, FaFloppyDisk } from "react-icons/fa6";
import LayoutDashboard from "../layouts/LayoutDashboard";
import useUserStore from "../store/userStore";
import { useEffect, useState } from "react";
import { userApi } from "../api/userApi";

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  const fetchProfile = useUserStore((state) => state.fetchProfile);

  useEffect(() => {
    fetchProfile();
  }, []);

  const [formValues, setFormValues] = useState({
    name: user?.name || "",
    password: "",
    photo: null,
  });

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formValues.name);
    if (formValues.password) data.append("password", formValues.password);
    if (formValues.photo) data.append("photo", formValues.photo);

    try {
      await userApi.updateProfile(data);

      toast({
        title: "Success updated profile!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      fetchProfile();
    } catch (error) {
      toast({
        title: "Oops, something went wrong!, " + error.response.data.message,
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

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files?.[0]) {
      setFormValues((prev) => ({ ...prev, photo: e.target.files[0] }));
    }
  };

  return (
    <LayoutDashboard>
      <Card width="30%" boxShadow="md" mx="auto">
        <CardHeader>
          <Flex alignItems="center" justifyContent="center">
            <Avatar
              name={user?.name}
              size="xl"
              src={user?.photo}
              shadow={"md"}
            />
          </Flex>
        </CardHeader>
        <hr />
        <form onSubmit={handleSubmit}>
          <CardBody display="flex" flexDirection="column" gap={4}>
            <Text fontSize={"lg"} fontWeight={"bold"}>
              Personal Info
            </Text>
            <FormControl>
              <FormLabel>Photo</FormLabel>
              <Input
                name="photo"
                type="file"
                accept="image/*"
                focusBorderColor="lightBlue"
                onChange={handleFileChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                focusBorderColor="lightBlue"
                defaultValue={user?.name}
                value={formValues.name}
                onChange={handleChange}
              />
            </FormControl>{" "}
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                focusBorderColor="lightBlue"
                defaultValue={user?.email}
                disabled
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Role</FormLabel>
              <Input
                name="role"
                focusBorderColor="lightBlue"
                defaultValue={user?.role}
                disabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                focusBorderColor="lightBlue"
                placeholder="*********"
                value={formValues.password}
                onChange={handleChange}
              />
            </FormControl>
          </CardBody>
          <CardFooter>
            <Flex width="full" justifyContent="space-between">
              <Button
                leftIcon={<FaChevronLeft />}
                colorScheme={"gray"}
                size="md"
                onClick={() => window.history.back()}
              >
                Back
              </Button>
              <Button
                leftIcon={<FaFloppyDisk />}
                color={"white"}
                backgroundColor="primaryBlue"
                _hover={{ bg: "darkBlue" }}
                size="md"
                type="submit"
              >
                Update
              </Button>
            </Flex>
          </CardFooter>
        </form>
      </Card>
    </LayoutDashboard>
  );
};

export default ProfilePage;
