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
import { FaFileImage, FaTrash, FaUser } from "react-icons/fa6";
import { ticketsApi } from "../api/ticketsApi";
import { assignmentsApi } from "../api/assignmentsApi";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "react-chakra-ui-table-v2/dist/index.ts";
import useTicketsStore from "../store/ticketsStore";
import useUserStore from "../store/userStore";
import { PRIORITIES } from "../constant/priorities";
import { ROLES } from "../constant/roles";
import { STATUES } from "../constant/statues";

const AssignIssuesPage = () => {
  const tickets = useTicketsStore((state) => state.tickets);
  const fetchTickets = useTicketsStore((state) => state.fetchTickets);
  const handlers = useUserStore((state) => state.accounts);
  const fetchHandlers = useUserStore((state) => state.fetchAccounts);

  useEffect(() => {
    fetchTickets();
    fetchHandlers(ROLES.HANDLER);
  }, []);

  const [formData, setFormData] = useState({
    userId: "",
    ticketId: "",
    assignmentId: "",
  });
  const [dataTicket, setDataTicket] = useState([]);
  const [isReassign, setIsReassign] = useState(false);
  const [deleteTicketData, setDeleteTicketData] = useState(null);

  const assignDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();

  const [attachmentUrl, setAttachmentUrl] = useState(null);
  const attachmentDisclosure = useDisclosure();

  const openAttachmentModal = (url) => {
    setAttachmentUrl(url);
    attachmentDisclosure.onOpen();
  };
  const openAssignModal = (ticket) => {
    setDataTicket(ticket);
    setFormData({
      ...formData,
      userId: ticket?.assignments?.user._id,
      ticketId: ticket._id,
      assignmentId: ticket.assignments?._id,
    });
    ticket.assignments && ticket.status === STATUES.UNRESOLVED
      ? setIsReassign(true)
      : setIsReassign(false);
    assignDisclosure.onOpen();
  };

  const toast = useToast();

  const handleAssign = async () => {
    try {
      let response = {};
      if (!isReassign) {
        response = await assignmentsApi.addAssignment(
          formData.userId,
          formData.ticketId
        );
      } else {
        response = await assignmentsApi.updateAssignment(
          formData.assignmentId,
          { userId: formData.userId }
        );
      }
      toast({
        title: response.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      fetchTickets();
      assignDisclosure.onClose();
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
    columnHelper.accessor("user.name", {
      header: "Student",
      cell: (info) => {
        return info.getValue();
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
    columnHelper.accessor("assignments.user.name", {
      header: "Handler",
      cell: (info) => {
        const value = info.getValue();
        return value ? value : <Text color="red">UNASSIGN</Text>;
      },
    }),
    columnHelper.accessor("actions", {
      header: "Actions",
      cell: (info) => (
        <>
          <Tooltip
            label={
              info.row.original.assignments
                ? info.row.original.status === STATUES.UNRESOLVED
                  ? "Reassign"
                  : info.row.original.status === STATUES.RESOLVED
                  ? "Finished"
                  : "Assigned"
                : "Assign"
            }
            hasArrow
            placement="top"
          >
            <Button
              size="sm"
              colorScheme="blue"
              mr={2}
              disabled={
                !!info.row.original.assignments &&
                info.row.original.status !== STATUES.UNRESOLVED
              }
              onClick={() => openAssignModal(info.row.original)}
            >
              <Icon as={FaUser} />
            </Button>
          </Tooltip>
          <Tooltip label="Delete" hasArrow placement="top">
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => {
                setDeleteTicketData(info.row.original);
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
          <Text fontSize={"2xl"} fontWeight={"bold"} color={"primaryBlue"}>
            Assign Issues
          </Text>
        </CardHeader>
        <CardBody>
          <DataTable columns={columns} data={tickets} />
        </CardBody>
      </Card>

      <Modal
        isOpen={assignDisclosure.isOpen}
        onClose={assignDisclosure.onClose}
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"primaryBlue"}>
            {isReassign ? "Reassign" : "Assign"} Issue
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                type="text"
                focusBorderColor="lightBlue"
                value={dataTicket?.category?.name}
                isReadOnly
              />
            </FormControl>{" "}
            <FormControl isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                focusBorderColor="lightBlue"
                value={dataTicket?.description}
                isReadOnly
              />
            </FormControl>
            <Flex gap={4} mt={4}>
              <FormControl isRequired flex="1">
                <FormLabel>Priority</FormLabel>
                <Input
                  type="text"
                  focusBorderColor="lightBlue"
                  value={dataTicket?.priority}
                  isReadOnly
                />
              </FormControl>
              <FormControl isRequired flex="1">
                <FormLabel>Status</FormLabel>
                <Input
                  type="text"
                  focusBorderColor="lightBlue"
                  value={dataTicket?.status}
                  isReadOnly
                />
              </FormControl>
            </Flex>
            <FormControl isRequired mt={4}>
              <FormLabel>Resolution</FormLabel>
              <Textarea
                focusBorderColor="lightBlue"
                value={dataTicket?.assignments?.resolution}
                isReadOnly
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>{isReassign ? "Reassign" : "Assign"} to</FormLabel>
              <Select
                focusBorderColor="lightBlue"
                placeholder="Select Handler"
                onChange={(e) =>
                  setFormData({ ...formData, userId: e.target.value })
                }
                value={formData.userId}
              >
                {handlers.map((handler) => (
                  <option key={handler._id} value={handler._id}>
                    {handler.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={assignDisclosure.onClose}
            >
              Close
            </Button>
            <Button
              color={"white"}
              backgroundColor="primaryBlue"
              _hover={{ bg: "darkBlue" }}
              onClick={handleAssign}
            >
              {isReassign ? "Reassign" : "Assign"}
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
    </LayoutDashboard>
  );
};

export default AssignIssuesPage;
