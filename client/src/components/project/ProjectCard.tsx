import { Button, Card, Flex, Group, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card
      w='450px'
      h='120px'
      component={Flex}
      justify='space-between'
      align='flex-start'
      gap='1rem'
    >
      <Group
        display='flex'
        sx={{ flexDirection: 'column', alignItems: 'flex-start' }}
      >
        <Title size='1.4em'>{project.name}</Title>
        <Text>
          Status:{' '}
          <span style={{ fontWeight: 'bold' }}>
            {project.status.toString().toLowerCase()}
          </span>
        </Text>
      </Group>
      <Button component={Link} to={`/projects/${project.id}`}>
        View
      </Button>
    </Card>
  );
};
export default ProjectCard;
