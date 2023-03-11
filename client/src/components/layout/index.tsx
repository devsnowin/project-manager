import { ReactNode } from 'react';
import { AppShell } from '@mantine/core';
import Nav from '../Nav';
import AppHeader from '../AppHeader';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AppShell
      padding='md'
      navbar={<Nav />}
      header={<AppHeader />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};
export default Layout;
