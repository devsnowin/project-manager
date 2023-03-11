import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Box, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUser } from '@tabler/icons-react';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../../mutations/client';
import { GET_CLIENTS } from '../../queries/client';

export default function AddClient() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },

    validate: {
      name: (value) => (value.length >= 3 ? null : 'Name must be 3 char long'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (value !== '' ? null : 'Phone number is required'),
    },
  });

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name: form.getInputProps('name').value,
      email: form.getInputProps('email').value,
      phone: form.getInputProps('phone').value,
    },
    update(cache, { data: { addClient } }) {
      // @ts-ignore
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  function handleSubmit(values) {
    console.log('values: ', values);
    addClient();
    form.reset();
    close();
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title='Add new client'>
        <Box mx='auto'>
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <TextInput
              withAsterisk
              label='Name'
              placeholder='Client name'
              {...form.getInputProps('name')}
            />
            <TextInput
              withAsterisk
              label='Email'
              placeholder='Client email'
              {...form.getInputProps('email')}
            />
            <TextInput
              withAsterisk
              label='Phone'
              placeholder='Client phone number'
              {...form.getInputProps('phone')}
            />
            <Group mt='md'>
              <Button type='submit'>Add</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <Group position='center'>
        <Button leftIcon={<IconUser />} onClick={open}>
          Add Client
        </Button>
      </Group>
    </>
  );
}
