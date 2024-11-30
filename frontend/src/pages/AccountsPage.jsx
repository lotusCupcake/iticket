import {
  Card,
  CardBody,
  CardHeader,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import LayoutDashboard from "../layouts/LayoutDashboard";

const AccountsPage = () => {
  return (
    <LayoutDashboard>
      <Card boxShadow="md">
        <CardHeader>
          <Text fontSize={"2xl"} fontWeight={"bold"} color={"primaryBlue"}>
            Accounts Management
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
                    <Th color={"white"}>Name</Th>
                    <Th color={"white"}>Email</Th>
                    <Th color={"white"}>Role</Th>
                    <Th textAlign="center" color={"white"}>
                      Status
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {[...Array(10).keys()].map((i) => (
                    <Tr key={i}>
                      <Td textAlign="center">{i + 1}</Td>
                      <Td>Lorem ipsum dolor sit amet {i + 1}.</Td>
                      <Td>Lorem ipsum dolor sit amet {i + 1}.</Td>
                      <Td>Lorem ipsum dolor sit amet {i + 1}.</Td>
                      <Td textAlign={"center"}>
                        <Select focusBorderColor="primaryBlue">
                          <option value="active">Active</option>
                          <option value="inactive">Non Active</option>
                        </Select>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Text>
        </CardBody>
      </Card>
    </LayoutDashboard>
  );
};

export default AccountsPage;
