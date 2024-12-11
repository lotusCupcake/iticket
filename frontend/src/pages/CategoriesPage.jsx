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
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import LayoutDashboard from "../layouts/LayoutDashboard";
import { useState, useEffect } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa6";
import { categoriesApi } from "../api/categoriesApi";
import useCategoriesStore from "../store/categoriesStore";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "react-chakra-ui-table-v2/dist/index.ts";
import { Form } from "react-router-dom";

const CategoriesPage = () => {
  const categories = useCategoriesStore((state) => state.categories);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);

  useEffect(() => {
    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({ name: "", description: "" });
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [deleteCategoryData, setDeleteCategoryData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteDisclosure = useDisclosure();

  const openAddModal = () => {
    setIsEdit(false);
    setFormData({ name: "", description: "" });
    onOpen();
  };

  const openEditModal = (category) => {
    setIsEdit(true);
    setFormData(category);
    setSelectedCategoryId(category._id);
    onOpen();
  };

  const toast = useToast();

  const handleSave = async () => {
    try {
      if (isEdit) {
        const response = await categoriesApi.updateCategory(
          selectedCategoryId,
          formData.name,
          formData.description
        );
        toast({
          title: response.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        const response = await categoriesApi.addCategory(
          formData.name,
          formData.description
        );
        toast({
          title: response.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
      fetchCategories();
      onClose();
    } catch (error) {
      toast({
        title: "Oops, something went wrong! " + error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await categoriesApi.deleteCategory(
        deleteCategoryData._id
      );
      toast({
        title: response.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      fetchCategories();
      deleteDisclosure.onClose();
    } catch (error) {
      toast({
        title: "Oops, something went wrong! " + error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((_, index) => index + 1, {
      header: "No",
      cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("actions", {
      header: "Actions",
      cell: (info) => (
        <>
          <Tooltip label="Edit" hasArrow placement="top">
            <Button
              size="sm"
              colorScheme="yellow"
              mr={2}
              onClick={() => openEditModal(info.row.original)}
            >
              <Icon as={FaPen} />
            </Button>
          </Tooltip>{" "}
          <Tooltip label="Delete" hasArrow placement="top">
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => {
                setDeleteCategoryData(info.row.original);
                deleteDisclosure.onOpen();
              }}
            >
              <Icon as={FaTrash} />
            </Button>
          </Tooltip>
        </>
      ),
    }),
  ];

  return (
    <LayoutDashboard>
      <Card boxShadow="md">
        <CardHeader>
          <Flex justify="space-between" align="center">
            <Text fontSize={"2xl"} fontWeight={"bold"} color={"primaryBlue"}>
              Categories Management
            </Text>
            <Button
              leftIcon={<FaPlus />}
              color={"white"}
              backgroundColor="primaryBlue"
              _hover={{ bg: "darkBlue" }}
              onClick={openAddModal}
            >
              Add Category
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <DataTable columns={columns} data={categories} />
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <Form onSubmit={handleSave}>
          <ModalContent>
            <ModalHeader color={"primaryBlue"}>
              {isEdit ? "Edit Category" : "Add Category"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  focusBorderColor="lightBlue"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  focusBorderColor="lightBlue"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
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
                type="submit"
              >
                {isEdit ? "Update" : "Add"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Modal>

      <Modal
        isOpen={deleteDisclosure.isOpen}
        onClose={deleteDisclosure.onClose}
      >
        <ModalOverlay />
        <Form onSubmit={handleDelete}>
          <ModalContent>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete{" "}
              <strong>{deleteCategoryData?.name}</strong>?
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="gray"
                mr={3}
                onClick={deleteDisclosure.onClose}
              >
                Cancel
              </Button>
              <Button colorScheme="red" type="submit">
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Modal>
    </LayoutDashboard>
  );
};

export default CategoriesPage;
