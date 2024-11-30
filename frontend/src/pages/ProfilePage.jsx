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
} from "@chakra-ui/react";
import { FaFloppyDisk } from "react-icons/fa6";
import LayoutDashboard from "../layouts/LayoutDashboard";

const ProfilePage = () => {
  return (
    <LayoutDashboard>
      <Card width="30%" boxShadow="md" mx="auto">
        <CardHeader>
          <Flex alignItems="center" justifyContent="center">
            <Avatar size="xl" src="https://bit.ly/broken-link" />
          </Flex>
        </CardHeader>
        <hr />
        <CardBody display="flex" flexDirection="column" gap={4}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Personal Info
          </Text>
          <FormControl isRequired>
            <FormLabel>Photo</FormLabel>
            <Input type="file" focusBorderColor="lightBlue" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input focusBorderColor="lightBlue" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Role</FormLabel>
            <Input focusBorderColor="lightBlue" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" focusBorderColor="lightBlue" />
          </FormControl>
        </CardBody>
        <CardFooter>
          <Flex width="full" justifyContent="flex-end">
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
