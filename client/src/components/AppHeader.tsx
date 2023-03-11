import { Anchor, Flex, Header, Image, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import LightSwitcher from './LightSwitcher';
import NewProject from '../pages/project/NewProject';
import AddClient from '../pages/client/AddClient';

const AppHeader = () => {
  return (
    <Header
      height='6rem'
      px='xl'
      display='flex'
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Title color='blue'>
        <Anchor
          to='/'
          component={Link}
          underline={false}
          color='blue'
          sx={() => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            ':hover': {
              textDecoration: 'none',
            },
          })}
        >
          <Image src='/logo.png' width={48} />
          MangerZesus
        </Anchor>
      </Title>
      <Flex align='center' gap='sm'>
        <AddClient />
        <NewProject />
        <LightSwitcher />
      </Flex>
    </Header>
  );
};
export default AppHeader;
