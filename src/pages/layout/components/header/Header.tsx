import { Box, Link, useTheme } from '@mui/material';
import MainLogo from '@/assets/main-logo.svg?react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { ProfileMenu } from './components/profileMenu';
import { ShowOnly } from '@/components/ShowOnly';
import { LoginButton } from '@/components/LoginButton';
import { headerMinHeight } from '@/styles/theme';

const toolbarStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  minHeight: `${headerMinHeight}px`,
};

export const Header = () => {
  const theme = useTheme();

  return (
    <Box component="header">
      <AppBar position="relative" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={toolbarStyles}>
            <Box sx={{ justifySelf: 'start' }}>
              <Link href="/help-catalog">
                <MainLogo />
              </Link>
            </Box>
            <Box sx={{ justifySelf: 'center' }}>
              <Link
                href="/help-catalog"
                underline="hover"
                color={theme.palette.text.primary}
              >
                <Typography>Запросы о помощи</Typography>
              </Link>
            </Box>
            <Box sx={{ justifySelf: 'end' }}>
              <ShowOnly when="authorized" otherwise={<LoginButton />}>
                <ProfileMenu />
              </ShowOnly>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
