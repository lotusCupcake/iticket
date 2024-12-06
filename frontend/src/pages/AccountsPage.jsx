import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import LayoutDashboard from "../layouts/LayoutDashboard";
import { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "react-chakra-ui-table-v2/dist/index.ts";
import { userApi } from "../api/userApi";

const AccountsPage = () => {
  const accounts = useUserStore((state) => state.accounts);
  const fetchAccounts = useUserStore((state) => state.fetchAccounts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const toast = useToast();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSelectChange = (user, status) => {
    setSelectedUser(user);
    setNewStatus(status);
    setIsModalOpen(true);
  };

  const handleConfirmChange = async () => {
    try {
      const response = await userApi.changeStatus(selectedUser?._id);

      toast({
        title: response.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      fetchAccounts();
    } catch (error) {
      toast({
        title: "Oops, something went wrong! " + error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
    setIsModalOpen(false);
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
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("isActive", {
      header: "Status",
      cell: (info) => (
        <Select
          focusBorderColor="primaryBlue"
          defaultValue={info.getValue() ? "active" : "inactive"}
          onChange={(e) =>
            handleSelectChange(info.row.original, e.target.value)
          }
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
      ),
    }),
  ];

  return (
    <LayoutDashboard>
      <Card boxShadow="md">
        <CardHeader>
          <Text fontSize={"2xl"} fontWeight={"bold"} color={"primaryBlue"}>
            Accounts Management
          </Text>
        </CardHeader>
        <CardBody>
          <Flex direction="column">
            <DataTable columns={columns} data={accounts} />
          </Flex>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to change the status of user{" "}
            <b>{selectedUser?.name}</b> to{" "}
            <b>{newStatus === "active" ? "Active" : "Inactive"}</b>?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={() => setIsModalOpen(false)}
            >
              CLose
            </Button>
            <Button
              color={"white"}
              backgroundColor="primaryBlue"
              _hover={{ bg: "darkBlue" }}
              onClick={handleConfirmChange}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </LayoutDashboard>
  );
};

export default AccountsPage;
