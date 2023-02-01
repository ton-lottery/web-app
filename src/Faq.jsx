import React from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Card, CardContent, Collapse, List, ListItemButton, ListItemText, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Anchorme } from 'react-anchorme';

function Faq() {
  const { t } = useTranslation();
  const [openFaqFirst, setOpenFaqFirst] = React.useState(false);
  const [openFaqSecond, setOpenFaqSecond] = React.useState(false);
  const [openFaqThird, setOpenFaqThird] = React.useState(false);
  const [openFaqFourth, setOpenFaqFourth] = React.useState(false);

  const handleClickFaqFirst = () => {
    setOpenFaqFirst(!openFaqFirst);
  };

  const handleClickFaqSecond = () => {
    setOpenFaqSecond(!openFaqSecond);
  };

  const handleClickFaqThird = () => {
    setOpenFaqThird(!openFaqThird);
  };

  const handleClickFaqFourth = () => {
    setOpenFaqFourth(!openFaqFourth);
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {t('faq')}
        </Typography>
        <List>
          <ListItemButton onClick={handleClickFaqFirst}>
            <ListItemText primary={t('faq_access')} />
            {openFaqFirst ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openFaqFirst} timeout="auto" unmountOnExit>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {t('faq_sc')}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              <Anchorme>
                {t('faq_site')}
              </Anchorme>
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {t('faq_todo')}
            </Typography>
          </Collapse>
          <ListItemButton onClick={handleClickFaqSecond}>
            <ListItemText primary={t('faq_source')} />
            {openFaqSecond ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openFaqSecond} timeout="auto" unmountOnExit>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              <Anchorme>
                {t('faq_verify')}
              </Anchorme>
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              <Anchorme>
                {t('faq_tonscan')}
              </Anchorme>
            </Typography>
          </Collapse>
          <ListItemButton onClick={handleClickFaqThird}>
            <ListItemText primary={t('faq_price')} />
            {openFaqThird ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openFaqThird} timeout="auto" unmountOnExit>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {t('faq_new_price')}
            </Typography>
          </Collapse>
          <ListItemButton onClick={handleClickFaqFourth}>
            <ListItemText primary={t('faq_other')} />
            {openFaqFourth ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openFaqFourth} timeout="auto" unmountOnExit>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {`${t('faq_telegram')} `}
              <Anchorme>
                https://t.me/tonlottery_support_bot
              </Anchorme>
            </Typography>
          </Collapse>
        </List>
      </CardContent>
    </Card>
  );
}

export default Faq;
