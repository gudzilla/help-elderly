import { Box } from '@mui/material';
import { AuthForm } from './components/authForm';
import { TestUsers } from './components/testUsers';

const mainLayout = {
  flexGrow: 1,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  height: '100%',
  backgroundColor: '#fff',
};

const sectionStyles = {
  'padding': '64px 40px',
  '&:not(:last-child)': { borderRight: 1, borderColor: 'divider' },
};

export const LoginPage = () => {
  return (
    <Box sx={mainLayout}>
      <Box component="section" sx={sectionStyles}>
        <AuthForm />
      </Box>
      <Box component="section" sx={sectionStyles}>
        <TestUsers />
      </Box>
    </Box>
  );
};
