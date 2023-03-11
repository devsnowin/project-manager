import { Container, Title } from '@mantine/core';
import ClientTable from './ClientTable';

const ClientPage = () => {
  return (
    <Container my='lg'>
      <Title>Clients</Title>
      <ClientTable />
    </Container>
  );
};
export default ClientPage;
