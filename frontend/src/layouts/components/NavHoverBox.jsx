import { Flex, Text, Icon } from "@chakra-ui/react";

export default function NavHoverBox({ title }) {
  return (
    <>
      <Flex
        pos="absolute"
        mt="calc(25px - 7.5px)"
        ml="-15px"
        width={0}
        height={0}
        borderTop="10px solid transparent"
        borderBottom="10px solid transparent"
        borderRight="20px solid #82AAAD"
      />
      <Flex
        h="100%"
        w="100%"
        alignItems="center"
        justify="center"
        backgroundColor="#82AAAD"
        borderRadius="10px"
        color="coldBlue"
        textAlign="center"
      >
        <Text size="sm" fontWeight="normal">
          {title}
        </Text>
      </Flex>
    </>
  );
}
