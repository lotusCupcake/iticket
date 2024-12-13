import {
  Avatar,
  Box,
  Icon,
  Image,
  Tooltip,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { CgLogOut, CgMenuLeftAlt } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/userApi";
import { SidebarDrawer } from ".";

const Header = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const onHandleSignOut = () => {
    userApi.signOut();
    navigate("/login");
  };

  return (
    <>
      <Flex
        w="full"
        h="20"
        bg="white"
        pos="fixed"
        zIndex="1000"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        boxShadow="md"
      >
        {/* Section Kiri */}
        <Flex align="center" w={{ base: "auto", md: "200px" }}>
          {user?.role === "ADMIN" && (
            <Tooltip label="Menu" hasArrow placement="right">
              <Box
                cursor="pointer"
                onClick={onOpen}
                display={{ base: "flex", md: "none" }}
                mr={4}
              >
                <Icon as={CgMenuLeftAlt} boxSize={10} color="primaryBlue" />
              </Box>
            </Tooltip>
          )}

          {user?.role !== "ADMIN" && (
            <Tooltip label="Logout" hasArrow placement="right">
              <Box cursor="pointer" onClick={onHandleSignOut}>
                <Icon
                  as={CgLogOut}
                  boxSize={{ base: 12, md: 14 }}
                  color="primaryBlue"
                />
              </Box>
            </Tooltip>
          )}
        </Flex>

        {/* Section Tengah - Logo */}
        {user?.role !== "ADMIN" && (
          <Box
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            display={{
              base: "none",
              md: "block",
            }}
          >
            <Image
              src="/logo-horizontal-blue.png"
              alt="logo"
              h="60px"
              maxW="200px"
            />
          </Box>
        )}

        {/* Section Kanan - Avatar */}
        <Flex justify="flex-end" w={{ base: "auto", md: "200px" }}>
          <Tooltip label="Profile" hasArrow placement="left">
            <Avatar
              name={user?.name}
              cursor="pointer"
              size="md"
              shadow={"md"}
              src={user?.photo}
              onClick={() => navigate("/profile")}
            />
          </Tooltip>
        </Flex>
      </Flex>

      {/* Sidebar Drawer untuk mobile */}
      <SidebarDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
