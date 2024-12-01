import { Avatar, Box, Icon } from "@chakra-ui/react";
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
      <Box cursor="pointer" onClick={onHandleSignOut}>
        <Icon as={CgLogOut} boxSize={14} color="primaryBlue" />
      </Box>
      <Avatar
        name={user?.name}
        cursor="pointer"
        size="md"
        src={user?.photo}
        onClick={() => navigate("/profile")}
      />
    </Box>
  );
};

export default Header;
