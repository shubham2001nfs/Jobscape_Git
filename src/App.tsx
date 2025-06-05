import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

import { Notifications } from '@mantine/notifications';
import { Provider } from "react-redux";

import AppRoutes from './AppRoutes';
import Store from './Store';

function App() {
  const theme = createTheme({
    colors: {
      'web-orange': ['#fffcea', '#fff5c5', '#ffeb85', '#ffda46', '#ffc71b', '#ffa500', '#e27c00', '#bb5502', '#984208', '#7c360b', '#481a00'],
      'mine-shaft': ['#2d2d2d', '#3d3d3d', '#454545', '#4f4f4f', '#5d5d5d', '#6d6d6d', '#888888', '#b0b0b0', '#d1d1d1', '#e7e7e7', '#f6f6f6']
    },
    primaryColor: 'web-orange',
    primaryShade: 5,
    fontFamily: 'Poppins, sans-serif'
  });


  return (
    <Provider store={Store}>
      <MantineProvider defaultColorScheme='dark' theme={theme}>
        <Notifications position='top-right' />
        <AppRoutes />
      </MantineProvider>
    </Provider>
  );
}

export default App;
