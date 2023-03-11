import { useQuery } from '@apollo/client';
import { Grid, Text } from '@mantine/core';
import { GET_PROJECTS } from '../../queries/project';
import CustomLoader from '../general/CustomLoader';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const { data, loading, error } = useQuery(GET_PROJECTS);

  if (loading) return <CustomLoader />;
  if (error) return <Text>Something went wrong</Text>;

  return (
    <Grid my='lg'>
      {data.projects.length !== 0 ? (
        data.projects?.map((project: Project) => (
          <Grid.Col span='content' key={project.id}>
            <ProjectCard project={project} />
          </Grid.Col>
        ))
      ) : (
        <Text mx='sm'>No projects</Text>
      )}
    </Grid>
  );
};
export default Projects;
