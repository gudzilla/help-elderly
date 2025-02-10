import { Box, MenuItem, SvgIcon, Typography } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/lib/redux/hooks';
import { logOutFx } from '@/store/authenticationReducer';

type ProfileMenuListProps = {
  closeMenu: () => void;
};

type ItemProps = {
  icon: JSX.Element;
  name: string;
  onClick: () => void;
};

export const ProfileMenuList = ({ closeMenu }: ProfileMenuListProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const Item = ({ name, icon, onClick }: ItemProps) => {
    return (
      <MenuItem
        onClick={() => {
          closeMenu();
          onClick();
        }}
      >
        <SvgIcon sx={{ marginRight: '32px' }}>{icon}</SvgIcon>
        <Typography sx={{ textAlign: 'center' }}>{name}</Typography>
      </MenuItem>
    );
  };

  return (
    <Box>
      <Item
        name="Мой профиль"
        icon={<PersonRoundedIcon />}
        onClick={() => {
          navigate('/profile');
        }}
      ></Item>
      <Item
        name="Выйти"
        icon={<LogoutIcon />}
        onClick={() => {
          dispatch(logOutFx());
        }}
      ></Item>
    </Box>
  );
};
