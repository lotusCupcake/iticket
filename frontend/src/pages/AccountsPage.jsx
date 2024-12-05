import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Select,
  Text,
} from "@chakra-ui/react";
import LayoutDashboard from "../layouts/LayoutDashboard";
import { useEffect } from "react";
import useUserStore from "../store/userStore";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "react-chakra-ui-table-v2/dist/index.ts";

const AccountsPage = () => {
  const accounts = useUserStore((state) => state.accounts);
  const fetchAccounts = useUserStore((state) => state.fetchAccounts);

  useEffect(() => {
    fetchAccounts();
  }, []);

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
        >
          <option value="active">Active</option>
          <option value="inactive">Non Active</option>
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
    </LayoutDashboard>
  );
};

export default AccountsPage;
