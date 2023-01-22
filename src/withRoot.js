import React, {useMemo, useState} from 'react';
import i18n from "./i18n";
import {createTheme, ThemeProvider} from "@mui/material";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

function withRoot(Component) {
    function WithRoot(props) {
        const [mode, setMode] = useState(localStorage.getItem('mode') || "light");
        const colorMode = useMemo(
            () => ({
                toggleColorMode: () => {
                    localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light')
                    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
                },
            }),
            [],
        );
        const theme =
            React.useMemo(
                () =>
                    createTheme({
                        direction: i18n.dir(),
                        palette: {
                            mode,
                            primary: {main: '#ECF8F5'},
                            secondary: {main: '#FFF7F3'}
                        },
                    }),
                [mode],
            );

        return (
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <Component {...props} />
                </ThemeProvider>
            </ColorModeContext.Provider>
        );
    }

    return WithRoot;
}

export default withRoot;