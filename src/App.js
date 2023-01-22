import React, {useEffect, useState} from "react";
import {
    AppBar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select,
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
    useTheme
} from "@mui/material";
import factorialize from "./utils";
import ClearIcon from '@mui/icons-material/Clear';
import CasinoIcon from '@mui/icons-material/Casino';
import {useTranslation} from 'react-i18next';
import withRoot, {ColorModeContext} from "./withRoot";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

var winKf = [
    [
        1,
        5,
        30,
        2000,
        0
    ],
    [
        5,
        23,
        110,
        4150,
        12000
    ],
    [
        15,
        65,
        266,
        6500,
        24450
    ],
    [
        35,
        145,
        530,
        9110,
        37450
    ],
    [
        70,
        280,
        940,
        12050,
        51115
    ],
    [
        126,
        490,
        1540,
        15400,
        65575
    ],
    [
        210,
        798,
        2380,
        19250,
        80975
    ],
    [
        330,
        1230,
        3516,
        23700,
        97475
    ],
    [
        495,
        1815,
        5010,
        28860,
        115250
    ],
    [
        495,
        1815,
        5010,
        28860,
        115250
    ],
    [
        1001,
        3575,
        9350,
        41800,
        155400
    ]
]
const languages = [{code: "en", name: "English"}, {code: "ru", name: "Русский"}]

function App() {
    const {t, i18n, ready} = useTranslation();
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    document.body.dir = i18n.dir();
    const [locale, setLocale] = React.useState(localStorage.getItem('lng') || languages.find((value) => value.code === 'en').code);
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

    const changeLanguage = (lng) => {
        setLocale(lng)
        localStorage.setItem('lng', lng)
        i18n.changeLanguage(lng)
        document.body.dir = i18n.dir();
        theme.direction = i18n.dir();
    }

    useEffect(() => {
        changeLanguage(locale)
    }, [])

    const getRandom = () => {
        const arr = [];
        while (arr.length < 6) {
            const r = Math.floor(Math.random() * 45) + 1;
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        return arr;
    }

    const getPrizeByCount = (count, choose) => {
        var prize = (winKf[choose][count] * (parseInt(getBet, 16)))
        var jackpot = (parseInt(balance, 16) - parseInt(getGuaranteedPrize, 16) - parseInt(getOwnerFee, 16));
        if (count === 4) {
            var max = jackpot
            if (max < 310800 * parseInt(getBet, 16)) {
                max = 310800 * parseInt(getBet, 16)
            }
            prize += max;
        }
        if (prize >= jackpot) {
            var need = prize - jackpot;
            if (parseInt(getGuaranteedPrize, 16) < need)
                prize = prize - need + parseInt(getGuaranteedPrize, 16)
        }
        return (prize / 1000000000).toFixed(2)
    }

    const handleFormat = (event) => {
        if (event < 0) {
            setNumbers(numbers.filter(function (e) {
                return e !== event * (-1)
            }));
        } else setNumbers([...numbers, event]);
    };

    useEffect(() => {
        if (numbers.length > 5 && numbers.length < 17) {
            setPrice(Number((parseInt(getBet, 16) / 1000000000 *
                (factorialize(numbers.length) / factorialize(6) / factorialize(numbers.length - 6))).toFixed(9)));
        } else {
            setPrice(0.2);
        }
    }, [getBet, numbers, setPrice]);

    const fetchFunc = function (methodName) {
        return fetch("https://testnet.toncenter.com/api/v2/runGetMethod", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: "kQC7sRCtX3t4-ubU6mn2xAX0TVQ5MC3D4ck8QhkYf1R1Z7qL",
                method: methodName,
                stack: [['num', 3]]
            })
        }).then((res) => {
            return res.json()
        })
    }

    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        if (balance && getGuaranteedPrize && getOwnerFee) {
            setJackpot(getPrizeByCount(4, 0))
        }
    }, [balance, getGuaranteedPrize, getOwnerFee, getPrizeByCount])

    useEffect(() => {
        const methods = ['balance', 'getGuaranteedPrize', 'getOwnerFee', 'getBet', 'getOutAmount', 'getGamePlayed']
        const fillData = function () {
            fetchFunc(methods[0]).then((json) => {
                const res = json.result.stack[1][1];
                setBalance(res)
                localStorage.setItem("balance", res);
            }).then(() => {
                sleep(1130).then(() => {
                    fetchFunc(methods[1]).then((json) => {
                        const res = json.result.stack[1][1];
                        setGetGuaranteedPrize(res)
                        localStorage.setItem("getGuaranteedPrize", res);
                    }).then(() => {
                        sleep(1130).then(() => {
                            fetchFunc(methods[2]).then((json) => {
                                const res = json.result.stack[1][1];
                                setGetOwnerFee(res)
                                localStorage.setItem("getOwnerFee", res);
                            }).then(() => {
                                sleep(1130).then(() => {
                                    fetchFunc(methods[3]).then((json) => {
                                        const res = json.result.stack[1][1];
                                        setGetBet(res)
                                        localStorage.setItem("getBet", res);
                                    }).then(() => {
                                        sleep(1130).then(() => {
                                            fetchFunc(methods[4]).then((json) => {
                                                const res = json.result.stack[1][1];
                                                setGetOutAmount(res)
                                                localStorage.setItem("getOutAmount", res);
                                            }).then(() => {
                                                sleep(1130).then(() => {
                                                    fetchFunc(methods[5]).then((json) => {
                                                        const res = json.result.stack[1][1];
                                                        setGetGamePlayed(res)
                                                        localStorage.setItem("getGamePlayed", res);
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
        if (!isRun) {
            setIsRun(true);
            fillData();
            setInterval(fillData, 15000)
        }
    }, [balance, getBet, getGamePlayed, getGuaranteedPrize, getOutAmount, getOwnerFee, isRun])

    return (
        ready && <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TON LOTTERY
                        </Typography>
                        <Select
                            size="small"
                            value={locale}
                            label="Language"
                            onChange={(e) => {
                                changeLanguage(e.target.value)
                            }}
                        >
                            {languages.map((lang) => {
                                return (<MenuItem key={lang.code} value={lang.code}>{lang.name}</MenuItem>)
                            })}

                        </Select>
                        <Tooltip title={theme.palette.mode === 'dark' ? t("light_mode") : t("dark_mode")}>
                            <IconButton sx={{ml: 2}} onClick={colorMode.toggleColorMode} color="inherit">
                                {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={{mt: 2}}>
                    <Card>
                        <CardContent>
                            {getOutAmount && <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                {t("out_amount") + " " + (Number((parseInt(getOutAmount, 16) / 1000000000))) + '💎'}
                            </Typography>}
                            {getGamePlayed && <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                {t("total_games") + " " + (Number((parseInt(getGamePlayed, 16))))}
                            </Typography>}
                            {!isNaN(jackpot) && <Typography variant="h5" component="div">
                                {t("jackpot") + "  " + (jackpot) + '💎'}
                        </Typography>}
                        {(numbers.length < 6) ? <Typography sx={{mb: 1.5}} color="text.secondary">
                                {t("need_choose_numbers") + " " + (Math.max(6 - numbers.length, 0))}
                            </Typography> :
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                {t("choose_more_numbers")}
                            </Typography>
                        }
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            {t("win_chance") + " x" + (Math.round(price / 0.2))}
                        </Typography>
                        {
                            [...Array(9)].map((e, k) => {
                                return (<Grid
                                    container
                                    wrap='nowrap'
                                    key={k}
                                >
                                    {
                                        [...Array(5)].map((e, i) => {
                                            return (
                                                <ToggleButton
                                                    value={(i + 1) + (5 * k)}
                                                    key={(i + 1) + (5 * k)}
                                                    disabled={numbers.length > 15 && !numbers.includes((i + 1) + (5 * k))}
                                                    size="medium"
                                                    fullWidth="true"
                                                    onChange={(e, v) => {
                                                        if (numbers.includes((i + 1) + (5 * k)))
                                                            handleFormat(v * (-1));
                                                        else
                                                            handleFormat(v);
                                                    }}
                                                    selected={numbers.includes((i + 1) + (5 * k))}
                                                >
                                                    <Typography>{(i + 1) + (5 * k)}</Typography>
                                                </ToggleButton>
                                            );
                                        })
                                    }
                                </Grid>);
                            })}
                    </CardContent>
                    <CardActions>
                        <Box display="flex">
                            <Button
                                size="small"
                                disabled={numbers.length < 6 || numbers.length > 16}
                                variant="contained"
                                href={`https://test.tonhub.com/transfer/kQC7sRCtX3t4-ubU6mn2xAX0TVQ5MC3D4ck8QhkYf1R1Z7qL?amount=${price * 1000000000}&text=${numbers.map((num) => pad(num, 2)).join('%20')}`}
                            >
                                {t("buy_button")} {price}💎
                            </Button>
                            <Tooltip title={t("clear_choice")}>
                                <IconButton sx={{ml: 8}} disabled={numbers.length === 0} onClick={() => setNumbers([])}>
                                    <ClearIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t("random_choice")}>
                                <IconButton onClick={() => setNumbers(getRandom())}>
                                    <CasinoIcon/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </CardActions>
                    {numbers.length > 5 && <CardContent>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t("true_numbers")}</TableCell>
                                        <TableCell align="right">{t("prize_amount")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">6</TableCell>
                                        <TableCell align="right">{
                                            +getPrizeByCount(4, numbers.length - 6) + "💎"
                                        }</TableCell>
                                    </TableRow>
                                    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row">5</TableCell>
                                        <TableCell align="right">{
                                            +getPrizeByCount(3, numbers.length - 6) + "💎"
                                        }</TableCell>
                                    </TableRow>
                                    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row">4</TableCell>
                                        <TableCell align="right">{
                                            +getPrizeByCount(2, numbers.length - 6) + "💎"
                                        }</TableCell>
                                    </TableRow>
                                    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row">3</TableCell>
                                        <TableCell align="right">{
                                            +getPrizeByCount(1, numbers.length - 6) + "💎"
                                        }</TableCell>
                                    </TableRow>
                                    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row">2</TableCell>
                                        <TableCell align="right">{
                                            +getPrizeByCount(0, numbers.length - 6) + "💎"
                                        }</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>}
                    </Card>
                </Box>
            </Container></>
    );
}

export default withRoot(App);
