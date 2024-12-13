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
  Tooltip,
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
import { Form } from "react-router-dom";

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
      (value) => value !== STATUES.ASSIGNED && value !== STATUES.REASSIGNED
    )[index];
    setStatus(newStatus);
    fetchTickets(newStatus);
  };

  const activeTabIndex = Object.values(STATUES)
    .filter(
      (value) => value !== STATUES.ASSIGNED && value !== STATUES.REASSIGNED
    )
    .indexOf(status);

  const openAttachmentModal = (url) => {
    setAttachmentUrl(url);
    attachmentDisclosure.onOpen();
  };

  const openHandlingModal = (ticket) => {
    setFormData(ticket);
    setInitialResolution(ticket?.assignments?.resolution);
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
          { resolution: formData.assignments.resolution }
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
          <Tooltip
            label={
              status === STATUES.RESOLVED
                ? "Resolved"
                : status === STATUES.UNRESOLVED
                ? "Unresolved"
                : "Update Ticket"
            }
            hasArrow
            placement="top"
          >
            <Button
              size="sm"
              colorScheme="yellow"
              disabled={
                status === STATUES.RESOLVED || status === STATUES.UNRESOLVED
              }
              onClick={() => openHandlingModal(info.row.original)}
            >
              <Icon as={FaArrowsRotate} />
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
            Dashboard
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
          overflowX="auto"
          width="100%"
        >
          <TabList
            ml={4}
            display="flex"
            flexWrap="nowrap"
            overflowX="auto"
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {Object.entries(STATUES)
              .filter(
                ([key]) =>
                  key !== STATUES.ASSIGNED && key !== STATUES.REASSIGNED
              )
              .map(([key, value]) => (
                <Tab key={key} value={value} flexShrink={0} minWidth="120px">
                  {value.replace(/_/g, " ")}
                </Tab>
              ))}
          </TabList>
          <TabPanels>
            {Object.entries(STATUES)
              .filter(
                ([key]) =>
                  key !== STATUES.ASSIGNED && key !== STATUES.REASSIGNED
              )
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
          <Form onSubmit={handleHandling}>
            <ModalBody>
              <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <Input
                  type="text"
                  focusBorderColor="lightBlue"
                  defaultValue={formData.category.name}
                  isReadOnly
                />
              </FormControl>{" "}
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  focusBorderColor="lightBlue"
                  defaultValue={formData.description}
                  isReadOnly
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Priority</FormLabel>
                <Input
                  type="text"
                  focusBorderColor="lightBlue"
                  defaultValue={formData.priority}
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
                    .filter(
                      ([key]) =>
                        key !== STATUES.ASSIGNED && key !== STATUES.REASSIGNED
                    )
                    .map(([key, value]) => (
                      <option key={key} value={value}>
                        {value.replace(/_/g, " ")}
                      </option>
                    ))}
                </Select>
              </FormControl>
              {status === STATUES.IN_PROGRESS ? (
                <FormControl isRequired mt={4}>
                  <FormLabel>Resolution</FormLabel>
                  <Textarea
                    focusBorderColor="lightBlue"
                    value={formData.assignments.resolution}
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
              ) : null}
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
                type="submit"
              >
                Update
              </Button>
            </ModalFooter>
          </Form>
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
                  height: "100%",
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
