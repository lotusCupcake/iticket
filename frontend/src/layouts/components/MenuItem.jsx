import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";

export default function MenuItem({ icon, title, active, navSize }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Tooltip
          label={title}
          placement="right"
          hasArrow
          backgroundColor="rgba(0,0,0,0.75)"
          isOpen={navSize == "small" && isHovered}
        >
          <Link
            backgroundColor={active && "coldBlue"}
            p={3}
            borderRadius={8}
            _hover={
              !active && { textDecor: "none", backgroundColor: "darkBlue" }
            }
            w={navSize == "large" && "100%"}
            onMouseEnter={() => navSize == "small" && setIsHovered(true)}
            onMouseLeave={() => navSize == "small" && setIsHovered(false)}
          >
            <MenuButton w="100%">
              <Flex color={active ? "primaryBlue" : "coldBlue"}>
                <Icon as={icon} fontSize="xl" />
                <Text
                  fontWeight={"semibold"}
                  ml={5}
                  display={navSize == "small" ? "none" : "flex"}
                >
                  {title}
                </Text>
              </Flex>
            </MenuButton>
          </Link>
        </Tooltip>
      </Menu>
    </Flex>
  );
}
