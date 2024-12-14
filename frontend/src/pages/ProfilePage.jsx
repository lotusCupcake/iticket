import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormHelperText,
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

  const [formValues, setFormValues] = useState({
    name: "",
    password: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (user) {
      setFormValues({
        name: user.name || "",
        password: "",
        photo: null,
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formValues.name);
    if (formValues.password) data.append("password", formValues.password);
    if (formValues.photo) data.append("photo", formValues.photo);

    try {
      await userApi.updateProfile(data);

      toast({
        title: "Profile updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      fetchProfile();
    } catch (error) {
      toast({
        title: "Failed to update profile!",
        description:
          error.response?.data?.message || "An unexpected error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
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
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large!",
          description: `The maximum file size is 2MB. Selected file is ${(
            file.size /
            1024 /
            1024
          ).toFixed(2)}MB`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }
      setFormValues((prev) => ({ ...prev, photo: file }));
    }
  };

  return (
    <LayoutDashboard>
      <Card width={{ base: "full", md: "30%" }} boxShadow="md" mx="auto">
        <CardHeader>
          <Flex alignItems="center" justifyContent="center">
            <Avatar
              name={formValues.name}
              size="xl"
              src={
                formValues.photo
                  ? URL.createObjectURL(formValues.photo)
                  : user?.photo
              }
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
              <FormHelperText>Maximum file size is 2MB</FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                focusBorderColor="lightBlue"
                value={formValues.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                focusBorderColor="lightBlue"
                value={user?.email}
                disabled
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Role</FormLabel>
              <Input
                name="role"
                focusBorderColor="lightBlue"
                value={user?.role}
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
                isLoading={loading}
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
