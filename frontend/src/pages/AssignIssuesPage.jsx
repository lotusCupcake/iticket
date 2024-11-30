import {
  Button,
  Card,
  CardBody,
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
import LayoutDashboard from "../layouts/LayoutDashboard";
import { useState } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa6";

const AssingIssuesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteCategory, setDeleteCategory] = useState(null);
  const deleteDisclosure = useDisclosure();

  const openDeleteModal = (category) => {
    setDeleteCategory(category);
    deleteDisclosure.onOpen();
  };

  return (
    <LayoutDashboard>
      <Card boxShadow="md">
        <CardHeader>
          <Text fontSize={"2xl"} fontWeight={"bold"} color={"primaryBlue"}>
            Assign Issues
          </Text>
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
                    <Th color={"white"}>Category</Th>
                    <Th color={"white"}>Priority</Th>
                    <Th color={"white"}>Description</Th>
                    <Th color={"white"}>Status</Th>
                    <Th color={"white"}>Handler</Th>
                    <Th textAlign="center" color={"white"}>
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {[...Array(10).keys()].map((i) => (
                    <Tr key={i}>
                      <Td textAlign="center">{i + 1}</Td>
                      <Td>Lorem ipsum dolor sit amet {i + 1}</Td>
                      <Td>Lorem ipsum dolor sit amet {i + 1}</Td>
                      <Td>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Velit animi totam delectus ratione in repellat?{" "}
                        {i + 1}
                      </Td>
                      <Td>Lorem {i + 1}</Td>
                      <Td>Ipsum {i + 1}</Td>
                      <Td textAlign={"center"}>
                        <Button
                          size="md"
                          leftIcon={<FaPen />}
                          color={"white"}
                          backgroundColor="primaryBlue"
                          _hover={{ bg: "darkBlue" }}
                          onClick={() =>
                            openDeleteModal(
                              `Lorem ipsum dolor sit amet ${i + 1}.`
                            )
                          }
                        >
                          Assign
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
      </Card>
    </LayoutDashboard>
  );
};

export default AssingIssuesPage;
