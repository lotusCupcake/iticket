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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Header, Sidebar, Footer } from "./components";
import { useState } from "react";
import { FaFloppyDisk, FaPen, FaPlus, FaTrash } from "react-icons/fa6";
const LayoutDashboard = () => {
  const [navSize, setNavSize] = useState("large");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteCategory, setDeleteCategory] = useState(null);
  const deleteDisclosure = useDisclosure();

  const openDeleteModal = (category) => {
    setDeleteCategory(category);
    deleteDisclosure.onOpen();
  };

  return (
    <Flex direction="column" minHeight="100vh" backgroundColor={"coldBlue"}>
      <Sidebar navSize={navSize} changeNavSize={setNavSize} />
      <Header />
      <Box
        ml={navSize === "small" ? "75px" : "220px"}
        // mt="20"
        mt="40"
        mb="16"
        p={4}
        height="full"
      >
        {/* <Card boxShadow="md">
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Text fontSize={"2xl"} fontWeight={"bold"} color={"primaryBlue"}>
                Categories
              </Text>
              <Button
                leftIcon={<FaPlus />}
                color={"white"}
                backgroundColor="primaryBlue"
                _hover={{ bg: "darkBlue" }}
                onClick={onOpen}
              >
                Add Category
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr backgroundColor={"primaryBlue"}>
                      <Th textAlign="center" color={"white"}>
                        No
                      </Th>
                      <Th color={"white"}>Name</Th>
                      <Th color={"white"}>Description</Th>
                      <Th textAlign="center" color={"white"}>
                        Actions
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {[...Array(10).keys()].map((i) => (
                      <Tr key={i}>
                        <Td textAlign="center">{i + 1}</Td>
                        <Td>Lorem ipsum dolor sit amet {i + 1}.</Td>
                        <Td>
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Perspiciatis facere hic laboriosam, obcaecati
                          quam pariatur?
                        </Td>
                        <Td textAlign={"center"}>
                          <Button size="md" colorScheme="gray" mr={2}>
                            <Icon as={FaPen} />
                          </Button>
                          <Button size="md" colorScheme="red">
                            <Icon
                              as={FaTrash}
                              onClick={() =>
                                openDeleteModal(
                                  `Lorem ipsum dolor sit amet ${i + 1}.`
                                )
                              }
                            />
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Text>
          </CardBody>
          <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color={"primaryBlue"}>Add Category</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input focusBorderColor="lightBlue" />
                </FormControl>
                <FormControl isRequired mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea focusBorderColor="lightBlue" />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="gray" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  color={"white"}
                  backgroundColor="primaryBlue"
                  _hover={{ bg: "darkBlue" }}
                >
                  Add
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal
            isOpen={deleteDisclosure.isOpen}
            onClose={deleteDisclosure.onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Konfirmasi</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Apakah Anda yakin ingin menghapus kategori {deleteCategory}?
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="gray"
                  mr={3}
                  onClick={deleteDisclosure.onClose}
                >
                  Batal
                </Button>
                <Button colorScheme="red">Hapus</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Card> */}

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
      </Box>
      <Footer />
    </Flex>
  );
};

export default LayoutDashboard;
