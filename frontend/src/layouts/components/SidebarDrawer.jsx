import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Image,
  VStack,
  Icon,
} from "@chakra-ui/react";
import MenuItem from "./MenuItem";
import {
  FaShapes,
  FaListCheck,
  FaUsers,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { userApi } from "../../api/userApi";

export const SidebarDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleSignOut = () => {
    userApi.signOut();
    navigate("/login");
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent
        backgroundImage="linear-gradient(to right, darkBlue, primaryBlue)"
        color="white"
      >
        <DrawerHeader>
          <Image
            src="/logo-horizontal-white.png"
            alt="logo"
            h={"auto"}
            w={"150px"}
            mb={4}
          />
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={4} align="stretch">
            <MenuItem
              navSize="large"
              icon={FaShapes}
              title="Categories"
              active={location.pathname === "/categories"}
              handlingNavigate={() => handleNavigate("/categories")}
            />
            <MenuItem
              navSize="large"
              icon={FaListCheck}
              title="Assign Issues"
              active={
                location.pathname === "/assign-issues" ||
                location.pathname === "/"
              }
              handlingNavigate={() => handleNavigate("/assign-issues")}
            />
            <MenuItem
              navSize="large"
              icon={FaUsers}
              title="Accounts"
              active={location.pathname === "/accounts"}
              handlingNavigate={() => handleNavigate("/accounts")}
            />
            <Flex
              mt={8}
              alignItems="center"
              cursor="pointer"
              onClick={handleSignOut}
              color="coldBlue"
              _hover={{ bg: "darkBlue" }}
              p={3}
              borderRadius={8}
            >
              <Icon as={FaArrowRightFromBracket} fontSize="xl" mr={3} />
              Logout
            </Flex>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarDrawer;
