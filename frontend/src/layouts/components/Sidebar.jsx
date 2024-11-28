import { useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Image,
  Menu,
  Link,
  MenuButton,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import NavItem from "./MenuItem";
import {
  FaArrowRightFromBracket,
  FaChevronLeft,
  FaChevronRight,
  FaListCheck,
  FaShapes,
  FaUsers,
} from "react-icons/fa6";
const Sidebar = ({ navSize, changeNavSize }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex
      pos="fixed"
      left="0"
      top="0"
      h="100vh"
      backgroundColor={"primaryBlue"}
      boxShadow="2xl"
      borderRadius={navSize == "small" ? "0 15px 15px 0" : "0 30px 30px 0"}
      w={navSize == "small" ? "75px" : "220px"}
      flexDir="column"
      justifyContent="space-between"
      zIndex="1000"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <Flex w="100%" justifyContent="space-between" alignItems="center">
          <Image
            src="../public/logo-horizontal-white.png"
            mt={1}
            w={"full"}
            h="60px"
            alt="logo"
            display={navSize == "small" ? "none" : "flex"}
          />
          <IconButton
            color={"white"}
            background="none"
            mt={9}
            ml={3}
            _hover={{ background: "none" }}
            icon={navSize == "small" ? <FaChevronRight /> : <FaChevronLeft />}
            onClick={() => {
              changeNavSize(navSize == "small" ? "large" : "small");
            }}
          />
        </Flex>
        <NavItem navSize={navSize} icon={FaShapes} title="Categories" />
        <NavItem
          navSize={navSize}
          icon={FaListCheck}
          title="Assign Issues"
          active
        />
        <NavItem navSize={navSize} icon={FaUsers} title="Accounts" />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Flex
          mt={30}
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
        >
          <Menu placement="right">
            <Tooltip
              label="Logout"
              placement="right"
              hasArrow
              backgroundColor="rgba(0,0,0,0.75)"
              isOpen={navSize == "small" && isHovered}
            >
              <Link
                p={3}
                borderRadius={8}
                _hover={{ textDecor: "none", backgroundColor: "darkBlue" }}
                w={navSize == "large" && "100%"}
                onMouseEnter={() => navSize == "small" && setIsHovered(true)}
                onMouseLeave={() => navSize == "small" && setIsHovered(false)}
              >
                <MenuButton w="100%">
                  <Flex color={"coldBlue"}>
                    <Icon as={FaArrowRightFromBracket} fontSize="xl" />
                    <Text
                      fontWeight={"semibold"}
                      ml={5}
                      display={navSize == "small" ? "none" : "flex"}
                    >
                      Logout
                    </Text>
                  </Flex>
                </MenuButton>
              </Link>
            </Tooltip>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
