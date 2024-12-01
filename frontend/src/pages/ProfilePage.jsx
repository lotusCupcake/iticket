import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { FaChevronLeft, FaFloppyDisk } from "react-icons/fa6";
import LayoutDashboard from "../layouts/LayoutDashboard";
import useUserStore from "../store/userStore";
import { useEffect } from "react";

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  const fetchProfile = useUserStore((state) => state.fetchProfile);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <LayoutDashboard>
      <Card width="30%" boxShadow="md" mx="auto">
        <CardHeader>
          <Flex alignItems="center" justifyContent="center">
            <Avatar name={user?.name} size="xl" src={user?.photo} />
          </Flex>
        </CardHeader>
        <hr />
        <CardBody display="flex" flexDirection="column" gap={4}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Personal Info
          </Text>
          <FormControl isRequired>
            <FormLabel>Photo</FormLabel>
            <Input name="photo" type="file" focusBorderColor="lightBlue" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name  "
              focusBorderColor="lightBlue"
              defaultValue={user?.name}
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
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              focusBorderColor="lightBlue"
              defaultValue={user?.password}
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
            >
              Save Changes
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </LayoutDashboard>
  );
};

export default ProfilePage;
