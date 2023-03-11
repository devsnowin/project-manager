import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { IconUser, IconAt, IconPhone } from '@tabler/icons-react';
import { GET_PROJECT, GET_PROJECTS } from '../../queries/project';
import CustomLoader from '../../components/general/CustomLoader';
import { useForm } from '@mantine/form';
import { GET_CLIENTS } from '../../queries/client';
import { DELETE_PROJECT, UPDATE_PROJECT } from '../../mutations/project';

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id,
    },
  });
  const { data: clientData } = useQuery(GET_CLIENTS);
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      status: '',
      client: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        name: data.project.name,
        description: data.project.description,
        status: data.project.status.toString().toLowerCase(),
        client: data.project.client.id,
      });
    }
  }, [data]);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id,
      name: form.getInputProps('name').value,
      description: form.getInputProps('description').value,
      status: form.getInputProps('status').value,
      clientId: form.getInputProps('client').value,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id } }],
  });

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {
      id,
    },
    update(cache, { data: { deleteProject } }) {
      // @ts-ignore
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: projects.filter(
            (project: Project) => project.id !== deleteProject.id
          ),
        },
      });
    },
  });

  if (loading) return <CustomLoader />;
  if (error) return <Text>Something went wrong</Text>;

  function handleSubmit(values) {
    console.log('Values: ', values);
    updateProject();
    form.reset();
  }

  return (
    <Container my='lg'>
      <Box component={Flex} align='center' justify='space-between'>
        <Box maw='600px'>
          <Title>{data.project.name}</Title>
          <Text my='md'>{data.project.description}</Text>
          <Text>
            Status:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {data.project.status.toString().toLowerCase()}
            </span>
          </Text>
        </Box>
        <Button
          color='red'
          onClick={() => {
            deleteProject();
            navigate('/projects');
          }}
        >
          Delete
        </Button>
      </Box>

      <Flex justify='space-between' align='start' my='xl'>
        <Box
          component='form'
          onSubmit={form.onSubmit(handleSubmit)}
          w='100%'
          maw='50%'
          display='flex'
          sx={{ flexDirection: 'column', gap: '0.6rem' }}
        >
          <Title>Update Details</Title>
          <TextInput
            label='Name'
            placeholder='Project name'
            {...form.getInputProps('name')}
          />
          <Textarea
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
            data={clientData.clients?.map((client: Client) => ({
              value: client.id,
              label: client.name,
            }))}
          />
          <Group w='100%' mt='md'>
            <Button w='100%' type='submit'>
              Update
            </Button>
          </Group>
        </Box>

        <Box>
          <Title>Client Information</Title>
          <Box my='md'>
            <Text component={Flex} align='center' gap='xs'>
              <IconUser />
              {data.project.client.name}
            </Text>
            <Text component={Flex} align='center' gap='xs' my='md'>
              <IconAt />
              {data.project.client.email}
            </Text>
            <Text component={Flex} align='center' gap='xs'>
              <IconPhone />
              {data.project.client.phone}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};
export default ProjectPage;
