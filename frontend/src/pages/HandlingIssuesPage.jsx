import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import LayoutDashboard from "../layouts/LayoutDashboard";
import { useState, useEffect } from "react";
import { FaArrowsRotate, FaFileImage } from "react-icons/fa6";
import { ticketsApi } from "../api/ticketsApi";
import { assignmentsApi } from "../api/assignmentsApi";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "react-chakra-ui-table-v2/dist/index.ts";
import useTicketsStore from "../store/ticketsStore";
import { PRIORITIES } from "../constant/priorities";
import { STATUES } from "../constant/statues";

const HandlingIssuesPage = () => {
  const tickets = useTicketsStore((state) => state.tickets);
  const fetchTickets = useTicketsStore((state) => state.fetchTickets);

  useEffect(() => {
    fetchTickets(STATUES.OPEN);
  }, []);

  const [status, setStatus] = useState(STATUES.OPEN);
  const [initialResolution, setInitialResolution] = useState("");
  const [initialStatus, setInitialStatus] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState(null);
  const [formData, setFormData] = useState({
    _id: "",
    category: { name: "" },
    description: "",
    priority: "",
    status: "",
    assignments: { _id: "", resolution: "" },
  });

  const assignDisclosure = useDisclosure();
  const attachmentDisclosure = useDisclosure();

  const handleTabChange = (index) => {
    const newStatus = Object.values(STATUES).filter(
      (value) => value !== STATUES.ASSIGNED
    )[index];
    setStatus(newStatus);
    fetchTickets(newStatus);
  };

  const activeTabIndex = Object.values(STATUES)
    .filter((value) => value !== STATUES.ASSIGNED)
    .indexOf(status);

  const openAttachmentModal = (url) => {
    setAttachmentUrl(url);
    attachmentDisclosure.onOpen();
  };

  const openHandlingModal = (ticket) => {
    setFormData(ticket);
    setInitialResolution(ticket.assignments.resolution);
    setInitialStatus(ticket.status);
    assignDisclosure.onOpen();
  };

  const toast = useToast();

  const handleHandling = async () => {
    try {
      let response = {};
      if (formData.assignments.resolution !== initialResolution) {
        response = await assignmentsApi.updateAssignment(
          formData.assignments._id,
          formData.assignments.resolution
        );
      }

      if (formData.status !== initialStatus) {
        const data = new FormData();
        data.append("status", formData.status);
        response = await ticketsApi.updateTicket(formData._id, data);
      }
      toast({
        title: response.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      fetchTickets(formData.status);
      setStatus(formData.status);
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
    columnHelper.accessor("assignments.resolution", {
      header: "Resolution",
      cell: (info) => (info.getValue() ? info.getValue() : "-"),
    }),
    columnHelper.accessor("action", {
      header: "Action",
      cell: (info) => (
        <>
          <Button
            size="sm"
            colorScheme="yellow"
            onClick={() => openHandlingModal(info.row.original)}
          >
            <Icon as={FaArrowsRotate} />
          </Button>
        </>
      ),
    }),
  ];

  return (
    <LayoutDashboard>
      <Card boxShadow="md">
        <CardHeader>
          <Text fontSize={"2xl"} fontWeight={"bold"} color={"primaryBlue"}>
            Handling Issues
          </Text>
        </CardHeader>
        <Tabs
          index={activeTabIndex}
          variant="soft-rounded"
          colorScheme={
            status === STATUES.OPEN
              ? "yellow"
              : status === STATUES.IN_PROGRESS
              ? "blue"
              : status === STATUES.RESOLVED
              ? "green"
              : "red"
          }
          onChange={(index) => handleTabChange(index)}
        >
          <TabList ml={4}>
            {Object.entries(STATUES)
              .filter(([key]) => key !== STATUES.ASSIGNED)
              .map(([key, value]) => (
                <Tab key={key} value={value}>
                  {value.replace(/_/g, " ")}
                </Tab>
              ))}
          </TabList>
          <TabPanels>
            {Object.entries(STATUES)
              .filter(([key]) => key !== STATUES.ASSIGNED)
              .map(([key]) => (
                <TabPanel key={key}>
                  <CardBody>
                    <DataTable columns={columns} data={tickets} />
                  </CardBody>
                </TabPanel>
              ))}
          </TabPanels>
        </Tabs>
      </Card>

      <Modal
        isOpen={assignDisclosure.isOpen}
        onClose={assignDisclosure.onClose}
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"primaryBlue"}>Update Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                type="text"
                focusBorderColor="lightBlue"
                value={formData.category.name}
                isReadOnly
              />
            </FormControl>{" "}
            <FormControl isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                focusBorderColor="lightBlue"
                value={formData.description}
                isReadOnly
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Priority</FormLabel>
              <Input
                type="text"
                focusBorderColor="lightBlue"
                value={formData.priority}
                isReadOnly
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Status</FormLabel>
              <Select
                focusBorderColor="lightBlue"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                {Object.entries(STATUES)
                  .filter(([key]) => key !== STATUES.ASSIGNED)
                  .map(([key, value]) => (
                    <option key={key} value={value}>
                      {value.replace(/_/g, " ")}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Resolution</FormLabel>
              <Textarea
                focusBorderColor="lightBlue"
                value={formData.assignments.resolution}
                isReadOnly={
                  formData.status !== STATUES.RESOLVED &&
                  formData.status !== STATUES.UNRESOLVED
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assignments: {
                      _id: formData.assignments._id,
                      resolution: e.target.value,
                    },
                  })
                }
              />
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
              onClick={handleHandling}
            >
              Update
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

export default HandlingIssuesPage;
