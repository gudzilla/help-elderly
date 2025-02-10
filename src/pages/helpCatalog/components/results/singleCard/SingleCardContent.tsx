import { CardContent, Stack, Typography } from '@mui/material';
import { styles } from './styles';

type SingleCardContentProps = {
  organization: string;
  locationDistrict: string;
  locationCity: string;
  goalDescription: string;
  isHelpOnline: boolean;
  onCardClick: () => void;
};

export const SingleCardContent = (props: SingleCardContentProps) => {
  const {
    organization,
    locationDistrict,
    locationCity,
    goalDescription,
    isHelpOnline,
    onCardClick,
  } = props;

  return (
    <CardContent sx={styles.cardBodyContent} onClick={onCardClick}>
      <Stack gap="4px">
        <Typography variant="subtitle2">Организатор</Typography>
        <Typography variant="body2" sx={styles.oneLineText}>
          {organization}
        </Typography>
      </Stack>
      <Stack gap="4px">
        <Typography variant="subtitle2">Локация</Typography>
        {/* Conditional render for Online or with Location */}
        {isHelpOnline ? (
          <Typography variant="body2">Онлайн</Typography>
        ) : (
          <>
            <Typography variant="body2" sx={styles.oneLineText}>
              Область: {locationDistrict}
            </Typography>
            <Typography variant="body2" sx={styles.oneLineText}>
              Населенный пункт: {locationCity}
            </Typography>
          </>
        )}
      </Stack>
      <Stack gap="4px">
        <Typography variant="subtitle2">Цель сбора</Typography>
        <Typography variant="body2" sx={styles.goalDescription}>
          {goalDescription}
        </Typography>
      </Stack>
    </CardContent>
  );
};
