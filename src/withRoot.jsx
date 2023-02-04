/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { YMInitializer } from 'react-yandex-metrika';
import i18n from './i18n';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');
    const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light');
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );
    const theme = React.useMemo(
      () => createTheme({
        direction: i18n.dir(),
        palette: {
          mode,
          primary: { main: '#ECF8F5' },
          secondary: { main: '#FFF7F3' },
        },
      }),
      [mode],
    );

    return (
      <>
        <YMInitializer
          accounts={[92217250]}
          options={{
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            trackHash: true,
          }}
        />
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <Component {...props} />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </>
    );
  }

  return WithRoot;
}

export default withRoot;
