import { Navbar } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconLayoutList, IconUser } from '@tabler/icons-react';

const Nav = () => {
  return (
    <Navbar
      width={{ base: 300 }}
      height='100%'
      px='xl'
      display='flex'
      dir='column'
      py='xl'
    >
      <Link
        to='/projects'
        style={{
          display: 'flex',
          gap: '1rem',
          padding: '1rem 0.4rem',
        }}
      >
        <IconLayoutList />
        Projects
      </Link>
      <Link
        to='/client'
        style={{
          display: 'flex',
          gap: '1rem',
          padding: '1rem 0.4rem',
        }}
      >
        <IconUser />
        Clients
      </Link>
    </Navbar>
  );
};
export default Nav;
