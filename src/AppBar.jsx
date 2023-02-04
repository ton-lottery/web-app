import React, { useEffect } from 'react';
import {
  IconButton, MenuItem, Select, Toolbar, Tooltip, Typography, useTheme,
} from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import LanguageIcon from '@mui/icons-material/Language';
import TelegramIcon from '@mui/icons-material/Telegram';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useTranslation } from 'react-i18next';
import { ColorModeContext } from './withRoot';

const languages = [{ code: 'en', name: 'English' }, { code: 'ru', name: 'Русский' }];

function AppBar() {
  const [locale, setLocale] = React.useState(
    localStorage.getItem('lng') || languages.find((value) => value.code === 'en').code,
  );
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const changeLanguage = (lng) => {
    setLocale(lng);
    localStorage.setItem('lng', lng);
    i18n.changeLanguage(lng).then((r) => r);
    document.body.dir = i18n.dir();
    theme.direction = i18n.dir();
  };

  useEffect(() => {
    changeLanguage(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
        <Select
          size="small"
          value={locale}
          label="Language"
          onChange={(e) => {
            changeLanguage(e.target.value);
          }}
        >
          {languages.map((lang) => (<MenuItem key={lang.code} value={lang.code}>{lang.name}</MenuItem>))}
        </Select>
        <Tooltip title={t('translate_help')}>
          <IconButton sx={{ ml: 2 }} href="https://crowdin.com/project/tonlottery" target="_blank">
            <LanguageIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('telegram_support')}>
          <IconButton sx={{ ml: 2 }} href="https://t.me/tonlottery_support_bot" target="_blank">
            <TelegramIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={theme.palette.mode === 'dark' ? t('light_mode') : t('dark_mode')}>
          <IconButton sx={{ ml: 2 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default AppBar;
