import {
  Badge,
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
  Select,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import LayoutDashboard from "../layouts/LayoutDashboard";
import { useState, useEffect } from "react";
import {
  FaFileImage,
  FaFolderClosed,
  FaPen,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";
import { ticketsApi } from "../api/ticketsApi";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "react-chakra-ui-table-v2/dist/index.ts";
import useTicketsStore from "../store/ticketsStore";
import useCategoriesStore from "../store/categoriesStore";
import { PRIORITIES } from "../constant/priorities";
import { STATUES } from "../constant/statues";

const MyTicketPage = () => {
  const categories = useCategoriesStore((state) => state.categories);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const tickets = useTicketsStore((state) => state.tickets);
  const fetchTickets = useTicketsStore((state) => state.fetchTickets);

  useEffect(() => {
    fetchTickets();
    fetchCategories();
  }, []);

  const [attachmentUrl, setAttachmentUrl] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    category: [],
    priority: "",
    description: "",
    attachment: null,
  });
  const [record, setRecord] = useState({
    handler: "",
    resolution: "",
    histories: [],
  });
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [deleteTicketData, setDeleteTicketData] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const attachmentDisclosure = useDisclosure();
  const {
    isOpen: isOpenRecord,
    onOpen: onOpenRecord,
    onClose: onCloseRecord,
  } = useDisclosure();

  const openRecordModal = (ticket) => {
    setRecord({
      handler: ticket.assignments ? ticket.assignments.user.name : "UNASSIGN",

      resolution:
        ticket.assignments && ticket.assignments.resolution !== null
          ? ticket.assignments.resolution
          : "-",

      histories: ticket.histories || [],
    });
    onOpenRecord();
  };
  const openAttachmentModal = (url) => {
    setAttachmentUrl(url);
    attachmentDisclosure.onOpen();
  };

  const openAddModal = () => {
    setIsEdit(false);
    setFormData({
      categoryId: "",
      priority: "",
      description: "",
      attachment: null,
    });
    onOpen();
  };

  const openEditModal = (ticket) => {
    setIsEdit(true);
    setFormData(ticket);
    setSelectedTicketId(ticket._id);
    onOpen();
  };

  const toast = useToast();

  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("categoryId", formData.category._id);
      data.append("priority", formData.priority);
      data.append("description", formData.description);
      if (formData.attachment) data.append("attachment", formData.attachment);

      if (isEdit) {
        const response = await ticketsApi.updateTicket(selectedTicketId, data);
        toast({
          title: response.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        const response = await ticketsApi.addTicket(data);
        toast({
          title: response.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
      fetchTickets();
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
      const response = await ticketsApi.deleteTicket(deleteTicketData._id);
      toast({
        title: response.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      fetchTickets();
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

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, attachment: e.target.files[0] }));
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((_, index) => index + 1, {
      header: "No",
      cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor("category.name", {
      header: "Category",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("attachment", {
      header: "Attachment",
      cell: (info) =>
        info.getValue() ? (
          <Button
            leftIcon={<FaFileImage />}
            size="sm"
            colorScheme="orange"
            onClick={() => openAttachmentModal(info.getValue())}
          >
            Open
          </Button>
        ) : (
          "-"
        ),
    }),
    columnHelper.accessor("priority", {
      header: "Priority",
      cell: (info) => {
        const value = info.getValue();
        let colorScheme;
        if (value === PRIORITIES.HIGH) {
          colorScheme = "red";
        } else if (value === PRIORITIES.MEDIUM) {
          colorScheme = "yellow";
        } else {
          colorScheme = "green";
        }
        return <Badge colorScheme={colorScheme}>{value}</Badge>;
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const value = info.getValue();
        let colorScheme;
        if (value === "OPEN") {
          colorScheme = "yellow";
        } else if (value === "IN_PROGRESS") {
          colorScheme = "blue";
        } else if (value === "RESOLVED") {
          colorScheme = "green";
        } else {
          colorScheme = "red";
        }
        return (
          <Badge colorScheme={colorScheme}>{value.replace(/_/g, " ")}</Badge>
        );
      },
    }),
    columnHelper.accessor("record", {
      header: "Record",
      cell: (info) => (
        <Button
          leftIcon={<FaFolderClosed />}
          size="sm"
          colorScheme="blue"
          onClick={() => openRecordModal(info.row.original)}
        >
          Open
        </Button>
      ),
    }),
    columnHelper.accessor("actions", {
      header: "Actions",
      cell: (info) => (
        <>
          <Tooltip
            label={info.row.original.assignments ? "Assigned" : "Edit"}
            hasArrow
            placement="top"
          >
            <Button
              size="sm"
              colorScheme="yellow"
              mr={2}
              onClick={() => openEditModal(info.row.original)}
              disabled={!!info.row.original.assignments}
            >
              <Icon as={FaPen} />
            </Button>
          </Tooltip>
          <Tooltip
            label={info.row.original.assignments ? "Assigned" : "Delete"}
            hasArrow
            placement="top"
          >
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => {
                setDeleteTicketData(info.row.original);
                deleteDisclosure.onOpen();
              }}
              disabled={!!info.row.original.assignments}
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
              Dashboard
            </Text>
            <Button
              leftIcon={<FaPlus />}
              color={"white"}
              backgroundColor="primaryBlue"
              _hover={{ bg: "darkBlue" }}
              onClick={openAddModal}
            >
              Add Ticket
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <DataTable columns={columns} data={tickets} />
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"primaryBlue"}>
            {isEdit ? "Edit Ticket" : "Add Ticket"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                focusBorderColor="lightBlue"
                value={formData.category?._id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: { _id: e.target.value },
                  })
                }
                placeholder="Select Category"
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Priority</FormLabel>
              <Select
                focusBorderColor="lightBlue"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                placeholder="Select Priority"
              >
                {Object.values(PRIORITIES).map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </Select>
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
            <FormControl mt={4}>
              <FormLabel>Attachment</FormLabel>
              <Input
                type="file"
                accept="image/*"
                focusBorderColor="lightBlue"
                onChange={handleFileChange}
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
              onClick={handleSave}
            >
              {isEdit ? "Update" : "Add"}
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
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete <strong>this ticket</strong>?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={deleteDisclosure.onClose}
            >
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={attachmentDisclosure.isOpen}
        onClose={attachmentDisclosure.onClose}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent p={0}>
          <ModalCloseButton color="white" />
          <ModalBody p={0}>
            {attachmentUrl ? (
              <img
                src={attachmentUrl}
                alt="Attachment"
                style={{
                  width: "100%",
                  height: "50vh",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Text>No Image Available</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenRecord} onClose={onCloseRecord} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="primaryBlue">Record Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Handler</FormLabel>
              <Input
                value={record.handler}
                isReadOnly
                focusBorderColor={
                  record.handler === "UNASSIGN" ? "red.500" : "lightBlue"
                }
                borderColor={
                  record.handler === "UNASSIGN" ? "red.500" : "lightBlue"
                }
              />
            </FormControl>
            <Card boxShadow="md" mb={4}>
              <CardBody>
                {record.histories && record.histories.length > 0 ? (
                  record.histories.map((history) => (
                    <Flex justify="space-between" key={history._id} w="100%">
                      <Flex direction="column" mb={4}>
                        <Text fontWeight="bold" color="gray.600">
                          Status
                        </Text>
                        <Badge
                          colorScheme={
                            history.status === STATUES.OPEN
                              ? "yellow"
                              : history.status === STATUES.ASSIGNED
                              ? "orange"
                              : history.status === STATUES.IN_PROGRESS
                              ? "blue"
                              : history.status === STATUES.RESOLVED
                              ? "green"
                              : "red"
                          }
                        >
                          {history.status.replace(/_/g, " ")}
                        </Badge>
                      </Flex>
                      <Flex direction="column" w="50%">
                        <Text fontWeight="bold" color="gray.600">
                          Tanggal
                        </Text>
                        <Text color="gray.700">
                          {new Intl.DateTimeFormat("id-ID", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          }).format(new Date(history.createdAt))}
                        </Text>
                      </Flex>
                    </Flex>
                  ))
                ) : (
                  <Text color="gray.700">Tidak ada sejarah</Text>
                )}
              </CardBody>
            </Card>
            <FormControl>
              <FormLabel>Resolution</FormLabel>
              <Textarea
                value={record.resolution}
                focusBorderColor="lightBlue"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" onClick={onCloseRecord}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </LayoutDashboard>
  );
};

export default MyTicketPage;
