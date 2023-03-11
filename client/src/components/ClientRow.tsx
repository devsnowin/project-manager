import { useMutation } from '@apollo/client';
import { ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { DELETE_CLIENT } from '../mutations/client';
import { GET_CLIENTS } from '../queries/client';

const ClientRow = ({ client }: { client: Client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    update(cache, { data: { deleteClient } }) {
      // @ts-ignore
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter(
            (client: Client) => client.id !== deleteClient.id
          ),
        },
      });
    },
  });

  return (
    <tr key={client.id}>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <ActionIcon onClick={() => deleteClient()}>
          <IconTrash />
        </ActionIcon>
      </td>
    </tr>
  );
};
export default ClientRow;
