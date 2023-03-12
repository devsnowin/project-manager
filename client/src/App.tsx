import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import Layout from './components/layout';
import HomePage from './pages/home/Home';
import ClientPage from './pages/client';
import ProjectsPage from './pages/project';
import ProjectPage from './pages/project/[id]';
import Error from './pages/Error';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const apolloClient = new ApolloClient({
  uri: import.meta.env.DEV
    ? 'http://localhost:3001/graphql'
    : 'http://3.108.63.195:3001/graphql',
  cache,
});

const App = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <BrowserRouter>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          components: {
            Anchor: {
              defaultProps: {
                color: 'inherit',
              },
            },
          },
        }}
      >
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <ApolloProvider client={apolloClient}>
            <Layout>
              <Routes>
                <Route path='/' element={<ProjectsPage />} />
                <Route path='/projects' element={<ProjectsPage />} />
                <Route path='/projects/:id' element={<ProjectPage />} />
                <Route path='/client' element={<ClientPage />} />
                <Route path='*' element={<Error />} />
              </Routes>
            </Layout>
          </ApolloProvider>
        </ColorSchemeProvider>
      </MantineProvider>
    </BrowserRouter>
  );
};
export default App;
