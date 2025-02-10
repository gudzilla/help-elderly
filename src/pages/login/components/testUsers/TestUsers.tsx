import { Alert, AlertTitle, Box, Typography } from '@mui/material';
import { accounts } from './constants';
import { CopyToClipboardButton } from '@/components/CopyToClipboardButton';

const textStyle = { display: 'inline-block', marginRight: '12px' };

const lineStyle = {
  display: 'flex',
  alignItems: 'center',
};

const sectionStyle = {
  display: 'grid',
  gap: '90px',
};

const testUsersBoxStyle = {
  display: 'grid',
  gap: '30px',
  maxWidth: '320px',
  // Height to fit exactly 3 alerts
  // if you have more you need to scroll
  maxHeight: '400px',
  overflowY: 'auto',
};

export const TestUsers = () => {
  return (
    <Box component="section" sx={sectionStyle}>
      <Typography component="h2" variant="h4">
        Тестовые профили
      </Typography>
      <Box sx={testUsersBoxStyle}>
        {accounts.map(({ title, login, password }, index) => (
          <Alert severity="info" variant="outlined" key={index}>
            <AlertTitle>{title}</AlertTitle>
            <Box sx={lineStyle}>
              <CopyToClipboardButton value={login} />
              <Typography variant="body2" sx={textStyle}>{`Логин: ${login}`}</Typography>
            </Box>
            <Box sx={lineStyle}>
              <CopyToClipboardButton value={password} />
              <Typography
                variant="body2"
                sx={textStyle}
              >{`Пароль: ${password}`}</Typography>
            </Box>
          </Alert>
        ))}
      </Box>
    </Box>
  );
};
