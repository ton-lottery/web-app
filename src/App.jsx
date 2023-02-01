/* eslint-disable no-restricted-globals,max-len,react/no-array-index-key */
// noinspection JSValidateTypes,RequiredAttributes

import React, {
  forwardRef, useCallback, useEffect, useState,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Helmet } from 'react-helmet';
import TelegramIcon from '@mui/icons-material/Telegram';
import LanguageIcon from '@mui/icons-material/Language';
import {
  AppBar, Backdrop,
  Box,
  Button, ButtonGroup,
  Card,
  CardActions,
  CardContent, Container,
  CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Grid,
  IconButton, MenuItem,
  Paper,
  Select, Skeleton, Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CasinoIcon from '@mui/icons-material/Casino';
import { useTranslation } from 'react-i18next';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// eslint-disable-next-line import/no-extraneous-dependencies
import QrCodeWithLogo from 'qrcode-with-logos';
// eslint-disable-next-line import/no-extraneous-dependencies
// import Carousel from 'react-material-ui-carousel';
import withRoot, { ColorModeContext } from './withRoot';
import factorialize from './utils';
import Faq from './Faq';

const winKf = [
  [
    1,
    5,
    30,
    2000,
    0,
  ],
  [
    5,
    23,
    110,
    4150,
    12000,
  ],
  [
    15,
    65,
    266,
    6500,
    24450,
  ],
  [
    35,
    145,
    530,
    9110,
    37450,
  ],
  [
    70,
    280,
    940,
    12050,
    51115,
  ],
  [
    126,
    490,
    1540,
    15400,
    65575,
  ],
  [
    210,
    798,
    2380,
    19250,
    80975,
  ],
  [
    330,
    1230,
    3516,
    23700,
    97475,
  ],
  [
    495,
    1815,
    5010,
    28860,
    115250,
  ],
  [
    495,
    1815,
    5010,
    28860,
    115250,
  ],
  [
    1001,
    3575,
    9350,
    41800,
    155400,
  ],
];
const languages = [{ code: 'en', name: 'English' }, { code: 'ru', name: 'Русский' }];
// eslint-disable-next-line react/jsx-props-no-spreading,react/display-name
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function App() {
  const { t, i18n, ready } = useTranslation();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  document.body.dir = i18n.dir();
  const [locale, setLocale] = React.useState(
    localStorage.getItem('lng') || languages.find((value) => value.code === 'en').code,
  );
  const [isRun, setIsRun] = useState(false);
  const [balance, setBalance] = useState(localStorage.getItem('balance'));
  const [getGuaranteedPrize, setGetGuaranteedPrize] = useState(localStorage.getItem('getGuaranteedPrize'));
  const [getOwnerFee, setGetOwnerFee] = useState(localStorage.getItem('getOwnerFee'));
  const [getBet, setGetBet] = useState(localStorage.getItem('getBet'));
  const [getOutAmount, setGetOutAmount] = useState(localStorage.getItem('getOutAmount'));
  const [getGamePlayed, setGetGamePlayed] = useState(localStorage.getItem('getGamePlayed'));
  const [jackpot, setJackpot] = useState(undefined);
  const [numbers, setNumbers] = useState([]);
  const [price, setPrice] = useState(0.2);
  const [openBuyDialog, setOpenBuyDialog] = React.useState(false);
  // const [firstImgLoaded, setFirstImgLoaded] = useState(false);

  function pad(num, size) {
    // eslint-disable-next-line no-param-reassign
    num = num.toString();
    // eslint-disable-next-line no-param-reassign
    while (num.length < size) num = `0${num}`;
    return num;
  }

  const handleClickOpen = () => {
    // noinspection JSCheckFunctionSignatures
    new QrCodeWithLogo({
      canvas: document.getElementById('qrcode'),
      /* eslint-disable-next-line max-len */
      content: `ton://transfer/EQBifMx9e29-2Sh9_3yR69nbo79e0ETvqtBN1Md6pJ0j7J3t?amount=${price * 1000000000}&text=${numbers.map((num) => pad(num, 2)).join('%20')}`,
      download: true,
      width: '100%',
      image: document.getElementById('image'),
      logo: {
        src: 'https://avatars1.githubusercontent.com/u/55018343?s=460&v=4',
      },
    }).toImage().then((r) => r);
    setOpenBuyDialog(true);
  };

  const handleClose = () => {
    setOpenBuyDialog(false);
    const context = document.getElementById('qrcode').getContext('qrcode');
    context.clearRect(0, 0, document.getElementById('qrcode').width, document.getElementById('qrcode').height);
  };

  /* eslint-disable-next-line max-len */ // noinspection SpellCheckingInspection
  const backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'400\' viewBox=\'0 0 800 800\'%3E%3Cg fill=\'none\' stroke=\'%23404\' stroke-width=\'1\'%3E%3Cpath d=\'M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63\'/%3E%3Cpath d=\'M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764\'/%3E%3Cpath d=\'M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880\'/%3E%3Cpath d=\'M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382\'/%3E%3Cpath d=\'M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269\'/%3E%3C/g%3E%3Cg fill=\'%23505\'%3E%3Ccircle cx=\'769\' cy=\'229\' r=\'5\'/%3E%3Ccircle cx=\'539\' cy=\'269\' r=\'5\'/%3E%3Ccircle cx=\'603\' cy=\'493\' r=\'5\'/%3E%3Ccircle cx=\'731\' cy=\'737\' r=\'5\'/%3E%3Ccircle cx=\'520\' cy=\'660\' r=\'5\'/%3E%3Ccircle cx=\'309\' cy=\'538\' r=\'5\'/%3E%3Ccircle cx=\'295\' cy=\'764\' r=\'5\'/%3E%3Ccircle cx=\'40\' cy=\'599\' r=\'5\'/%3E%3Ccircle cx=\'102\' cy=\'382\' r=\'5\'/%3E%3Ccircle cx=\'127\' cy=\'80\' r=\'5\'/%3E%3Ccircle cx=\'370\' cy=\'105\' r=\'5\'/%3E%3Ccircle cx=\'578\' cy=\'42\' r=\'5\'/%3E%3Ccircle cx=\'237\' cy=\'261\' r=\'5\'/%3E%3Ccircle cx=\'390\' cy=\'382\' r=\'5\'/%3E%3C/g%3E%3C/svg%3E")';

  const stylesLight = {
    background: {
      height: '100%',
      minHeight: '100vh',
      backgroundColor: '#330033',
      backgroundImage,
    },
  };

  // noinspection SpellCheckingInspection
  const stylesDark = {
    background: {
      height: '100%',
      minHeight: '100vh',
      backgroundColor: '#210021',
      backgroundImage,
    },
  };

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

  const getRandom = () => {
    const arr = [];
    while (arr.length < 6) {
      const r = Math.floor(Math.random() * 45) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  };

  const getPrizeByCount = useCallback((count, choose) => {
    let prize = (winKf[choose][count] * (parseInt(getBet, 16)));
    const currentJackpot = (
      parseInt(balance, 16) - parseInt(getGuaranteedPrize, 16) - parseInt(getOwnerFee, 16)
    );
    if (count === 4) {
      let max = currentJackpot;
      if (max < 310800 * parseInt(getBet, 16)) {
        max = 310800 * parseInt(getBet, 16);
      }
      prize += max;
    }
    if (prize >= currentJackpot) {
      const need = prize - currentJackpot;
      if (parseInt(getGuaranteedPrize, 16) < need) prize = prize - need + parseInt(getGuaranteedPrize, 16);
    }
    return (prize / 1000000000).toFixed(3);
  }, [balance, getBet, getGuaranteedPrize, getOwnerFee]);

  const handleFormat = (event) => {
    if (event < 0) {
      setNumbers(numbers.filter((e) => e !== event * (-1)));
    } else setNumbers([...numbers, event]);
  };

  useEffect(() => {
    if (numbers.length > 5 && numbers.length < 17) {
      setPrice(Number(((parseInt(getBet, 16) / 1000000000)
          * (factorialize(numbers.length) / factorialize(6) / factorialize(numbers.length - 6))).toFixed(3)));
    } else {
      setPrice(parseInt(getBet, 16) / 1000000000);
    }
  }, [getBet, numbers, setPrice]);

  const fetchFunc = (methodName) => fetch('https://toncenter.com/api/v2/runGetMethod?api_key=585f63b836913f24257451f3f22d0711c515d920d50a993c3640ca7726e9a6c2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address: 'EQBifMx9e29-2Sh9_3yR69nbo79e0ETvqtBN1Md6pJ0j7J3t',
      method: methodName,
      stack: [['num', 1]],
    }),
  }).then((res) => res.json());

  function sleep(ms) {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (balance && getGuaranteedPrize && getOwnerFee) {
      setJackpot(getPrizeByCount(4, 0));
    }
  }, [balance, getGuaranteedPrize, getOwnerFee, getPrizeByCount]);

  useEffect(() => {
    const methods = ['balance', 'getGuaranteedPrize', 'getOwnerFee', 'getBet', 'getOutAmount', 'getGamePlayed'];
    const fillData = () => {
      fetchFunc(methods[0]).then((json) => {
        const res = json.result.stack[1][1];
        setBalance(res);
        localStorage.setItem('balance', res);
      }).then(() => {
        sleep(150).then(() => {
          fetchFunc(methods[1]).then((json) => {
            const res = json.result.stack[1][1];
            setGetGuaranteedPrize(res);
            localStorage.setItem('getGuaranteedPrize', res);
          }).then(() => {
            sleep(150).then(() => {
              fetchFunc(methods[2]).then((json) => {
                const res = json.result.stack[1][1];
                setGetOwnerFee(res);
                localStorage.setItem('getOwnerFee', res);
              }).then(() => {
                sleep(150).then(() => {
                  fetchFunc(methods[3]).then((json) => {
                    const res = json.result.stack[1][1];
                    setGetBet(res);
                    localStorage.setItem('getBet', res);
                  }).then(() => {
                    sleep(150).then(() => {
                      fetchFunc(methods[4]).then((json) => {
                        const res = json.result.stack[1][1];
                        setGetOutAmount(res);
                        localStorage.setItem('getOutAmount', res);
                      }).then(() => {
                        sleep(150).then(() => {
                          fetchFunc(methods[5]).then((json) => {
                            const res = json.result.stack[1][1];
                            setGetGamePlayed(res);
                            localStorage.setItem('getGamePlayed', res);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    };
    if (!isRun) {
      setIsRun(true);
      fillData();
      setInterval(fillData, 3000);
    }
  }, [balance, getBet, getGamePlayed, getGuaranteedPrize, getOutAmount, getOwnerFee, isRun]);

  // noinspection JSCheckFunctionSignatures,RequiredAttributes
  return (
    ready ? (
      <>
        <Helmet>
          <title>{t('title_v2')}</title>
        </Helmet>
        <div style={theme.palette.mode === 'dark' ? stylesDark.background : stylesLight.background}>
          <Box
            sx={{ flexGrow: 1 }}
          >
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
          </Box>
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box sx={{ mt: 2 }}>
              <Card>
                <CardContent>
                  {getOutAmount ? (
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {`${t('out_amount')} ${Number((parseInt(getOutAmount, 16) / 1000000000))}💎`}
                    </Typography>
                  ) : <Skeleton variant="text" />}
                  {getGamePlayed ? (
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {`${t('total_games')} ${Number((parseInt(getGamePlayed, 16)))}`}
                    </Typography>
                  ) : <Skeleton variant="text" />}
                  {!isNaN(jackpot) ? (
                    <Typography variant="h5" component="div">
                      {`${t('jackpot')} ${jackpot}💎`}
                    </Typography>
                  ) : <Skeleton variant="text" />}
                  {(numbers.length < 6) ? (
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {`${t('need_choose_numbers')} ${Math.max(6 - numbers.length, 0)}`}
                    </Typography>
                  ) : (
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {t('choose_more_numbers_v2')}
                    </Typography>
                  )}
                  {!isNaN(Math.round(price / Number((parseInt(getBet, 16) / 1000000000))))
                      && (
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {`${t('win_chance')} x${Math.round(price / Number((parseInt(getBet, 16) / 1000000000)))}`}
                      </Typography>
                      )}
                  {
                      [...Array(5)].map((e, k) => (
                        <Grid
                          container
                          wrap="nowrap"
                          key={k}
                        >
                          {
                              [...Array(9)].map((el, i) => (
                                <ToggleButton
                                  value={(i + 1) + (9 * k)}
                                  key={(i + 1) + (9 * k)}
                                  disabled={numbers.length > 15 && !numbers.includes((i + 1) + (9 * k))}
                                  size="small"
                                  fullWidth
                                  sx={{ aspectRatio: '1 / 0.9' }}
                                  onChange={(elem, v) => {
                                    if (numbers.includes((i + 1) + (9 * k))) handleFormat(v * (-1));
                                    else handleFormat(v);
                                  }}
                                  selected={numbers.includes((i + 1) + (9 * k))}
                                >
                                  <Typography>{(i + 1) + (9 * k)}</Typography>
                                </ToggleButton>
                              ))
                            }
                        </Grid>
                      ))
                    }
                </CardContent>
                <CardActions>
                  <Box display="flex">
                    {!isNaN(price) && (
                    <Button
                      size="small"
                      disabled={numbers.length < 6 || numbers.length > 16}
                      variant="contained"
                      onClick={handleClickOpen}
                    >
                      {t('buy_button')}
                      {' '}
                      {price}
                      💎
                    </Button>
                    )}
                    <Dialog
                      open={openBuyDialog}
                      TransitionComponent={Transition}
                      keepMounted
                      sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}
                      onClose={handleClose}
                    >
                      <DialogTitle>
                        {t('buy_button')}
                        {' '}
                        {price}
                        💎
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          {t('your_numbers')}
                          {' '}
                          {numbers.map((num) => pad(num, 2)).join(', ')}
                        </DialogContentText>
                        <canvas id="qrcode" style={{ padding: 0, margin: 'auto', display: 'block' }} />
                      </DialogContent>
                      <DialogActions>
                        <ButtonGroup size="small">
                          <Button
                            variant="contained"
                            target="_blank"
                            href={`https://app.tonkeeper.com/transfer/EQBifMx9e29-2Sh9_3yR69nbo79e0ETvqtBN1Md6pJ0j7J3t?amount=${price * 1000000000}&text=${numbers.map((num) => pad(num, 2)).join('%20')}`}
                          >
                            TonKeeper
                          </Button>
                          <Button
                            variant="contained"
                            target="_blank"
                            href={`https://tonhub.com/transfer/EQBifMx9e29-2Sh9_3yR69nbo79e0ETvqtBN1Md6pJ0j7J3t?amount=${price * 1000000000}&text=${numbers.map((num) => pad(num, 2)).join('%20')}`}
                          >
                            TonHub
                          </Button>
                          <Button
                            variant="contained"
                            target="_blank"
                            href={`ton://transfer/EQBifMx9e29-2Sh9_3yR69nbo79e0ETvqtBN1Md6pJ0j7J3t?amount=${price * 1000000000}&text=${numbers.map((num) => pad(num, 2)).join('%20')}`}
                          >
                            {t('other')}
                          </Button>
                          <Button onClick={handleClose} variant="contained">{t('close_dialog')}</Button>
                        </ButtonGroup>
                      </DialogActions>
                    </Dialog>
                    <Tooltip title={t('clear_choice')}>
                      <span>
                        <IconButton
                          sx={{ ml: 16 }}
                          disabled={numbers.length === 0}
                          onClick={() => setNumbers([])}
                        >
                          <ClearIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title={t('random_choice')}>
                      <span>
                        <IconButton onClick={() => setNumbers(getRandom())}>
                          <CasinoIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>
                </CardActions>
                {numbers.length > 5 && (
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>{t('true_numbers')}</TableCell>
                          <TableCell align="right">{t('prize_amount')}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">6</TableCell>
                          <TableCell align="right">
                            {
                                    `${+getPrizeByCount(4, numbers.length - 6)}💎`
                                  }
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">5</TableCell>
                          <TableCell align="right">
                            {
                                    `${+getPrizeByCount(3, numbers.length - 6)}💎`
                                  }
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">4</TableCell>
                          <TableCell align="right">
                            {
                                    `${+getPrizeByCount(2, numbers.length - 6)}💎`
                                  }
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">3</TableCell>
                          <TableCell align="right">
                            {
                                    `${+getPrizeByCount(1, numbers.length - 6)}💎`
                                  }
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">2</TableCell>
                          <TableCell align="right">
                            {
                                    `${+getPrizeByCount(0, numbers.length - 6)}💎`
                                  }
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
                )}
              </Card>
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {t('about')}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {t('about_main')}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {t('about_main_concepts')}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <li>
                      {t('open_source')}
                    </li>
                    <li>
                      {t('sc_wallet')}
                    </li>
                    <li>
                      {t('sc_dapp')}
                    </li>
                  </Typography>

                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

                    {t('why_us')}

                    <li>
                      {t('from_anywhere')}
                    </li>
                    <li>
                      {t('full_open_source')}
                    </li>
                    <li>
                      {t('instant_pays')}
                    </li>
                    <li>
                      {t('min_prize')}
                    </li>
                    <li>
                      {t('low_fees')}
                    </li>
                    <li>
                      {t('anon')}
                    </li>
                    <li>
                      {t('rules_forever')}
                    </li>
                    <li>
                      {t('guarantee')}
                    </li>
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {t('how_to')}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    1)
                    {' '}
                    {t('how_to_need_choose')}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    2)
                    {' '}
                    {t('how_to_pay')}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    3)
                    {' '}
                    {t('how_to_wait')}
                  </Typography>
                </CardContent>
              </Card>
              <Faq />
            </Box>
          </Container>
        </div>
      </>
    ) : <Backdrop open />
  );
}

export default withRoot(App);
