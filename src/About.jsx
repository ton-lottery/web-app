import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  return (
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
  );
}

export default About;
