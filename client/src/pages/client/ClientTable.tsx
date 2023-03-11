import { useQuery } from '@apollo/client';
import { Table, Text } from '@mantine/core';
import ClientRow from '../../components/ClientRow';
import CustomLoader from '../../components/general/CustomLoader';
import { GET_CLIENTS } from '../../queries/client';

const ClientTable = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);

  if (loading) return <CustomLoader />;
  if (error) return <Text>Something went wrong</Text>;
  if (data.clients?.length === 0)
    return (
      <Text my='lg' mx='xs'>
        No clients
      </Text>
    );

  return (
    <Table
      horizontalSpacing='md'
      verticalSpacing='md'
      fontSize='md'
      highlightOnHover
      my='xl'
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Email Id</th>
          <th>Phone</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data?.clients?.map((client: Client) => (
          <ClientRow key={client.id} client={client} />
        ))}
      </tbody>
    </Table>
  );
};
export default ClientTable;
