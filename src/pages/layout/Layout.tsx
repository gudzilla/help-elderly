import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { footerMinHeight, headerMinHeight } from '@/styles/theme';

const mainStyles = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: `calc(100vh - (${headerMinHeight}px + ${footerMinHeight}px))`,
  borderLeft: 1,
  borderRight: 1,
  borderColor: 'divider',
  backgroundColor: '#f5f5f5',
};

export const Layout = () => {
  return (
    <Box>
      <Header />
      {/* <Container maxWidth="xl" sx={{ backgroundColor: '#fff' }}> */}
      <Container maxWidth="xl" disableGutters>
        <Box component="main" sx={mainStyles}>
          <Outlet />
          <ToastContainer
            position="top-right"
            // autoClose={3500}
            limit={5}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
          />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
