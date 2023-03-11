import { useDisclosure } from '@mantine/hooks';
import {
  Modal,
  Button,
  Group,
  Box,
  TextInput,
  Textarea,
  Select,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLayoutList } from '@tabler/icons-react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../../queries/client';
import CustomLoader from '../../components/general/CustomLoader';
import { ADD_PROJECT } from '../../mutations/project';
import { GET_PROJECTS } from '../../queries/project';

export default function NewProject() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      status: '',
      client: '',
    },

    validate: {
      name: (value) => (value.length >= 3 ? null : 'Name must be 3 char long'),
      description: (value) =>
        value.length >= 10 ? null : 'Description must be 10 char long',
      status: (value) => (value !== '' ? null : 'Status is required'),
      client: (value) => (value !== '' ? null : 'Client is required'),
    },
  });

  const { data, loading, error } = useQuery(GET_CLIENTS);
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name: form.getInputProps('name').value,
      description: form.getInputProps('description').value,
      status: form.getInputProps('status').value,
      clientId: form.getInputProps('client').value,
    },
    update(cache, { data: { addProject } }) {
      // @ts-ignore
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  if (loading) return <CustomLoader />;
  if (error) return <Text>Something went wrong</Text>;

  function handleSubmit(values) {
    console.log('Values: ', values);
    addProject();
    form.reset();
    close();
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title='New Project'>
        <Box mx='auto'>
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <TextInput
              withAsterisk
              label='Name'
              placeholder='Project name'
              {...form.getInputProps('name')}
            />
            <Textarea
              withAsterisk
              label='Description'
              placeholder='Project description'
              {...form.getInputProps('description')}
            />
            <Select
              label='Status'
              placeholder='Choose the status'
              {...form.getInputProps('status')}
              data={[
                { value: 'started', label: 'Started' },
                { value: 'progress', label: 'Progress' },
                { value: 'done', label: 'Done' },
              ]}
            />
            <Select
              label='Client'
              placeholder='Select the project client'
              {...form.getInputProps('client')}
              data={data.clients?.map((client: Client) => ({
                value: client.id,
                label: client.name,
              }))}
            />
            <Group mt='md'>
              <Button type='submit'>Create</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <Group position='center'>
        <Button leftIcon={<IconLayoutList />} variant='default' onClick={open}>
          New Project
        </Button>
      </Group>
    </>
  );
}
