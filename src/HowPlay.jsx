import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function HowPlay() {
  const { t } = useTranslation();

  return (
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
  );
}

export default HowPlay;
