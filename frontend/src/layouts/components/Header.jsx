import { Avatar, Box, Icon, Tooltip } from "@chakra-ui/react";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/userApi";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const onHandleSignOut = () => {
    userApi.signOut();
    navigate("/login");
  };
  return (
    <Box
      w="full"
      h="20"
      bg="white"
      pos="fixed"
      zIndex="1000"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={4}
      boxShadow="md"
    >
      <Tooltip label="Logout" hasArrow placement="right">
        <Box cursor="pointer" onClick={onHandleSignOut}>
          <Icon as={CgLogOut} boxSize={14} color="primaryBlue" />
        </Box>
      </Tooltip>
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
    </Box>
  );
};

export default Header;
