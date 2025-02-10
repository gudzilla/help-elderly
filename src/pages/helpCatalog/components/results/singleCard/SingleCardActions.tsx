import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  CardActions,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';

type SingleCardActionsProps = {
  endingDate: string;
  goalProgressInPercent: number;
  requestGoalCurrentValue: number;
  requestGoal: number;
  contributorsCount: number;
  handleHelpButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  isLoading: boolean;
  onCardClick: () => void;
};

export const SingleCardActions = (props: SingleCardActionsProps) => {
  const {
    endingDate,
    goalProgressInPercent,
    requestGoalCurrentValue,
    requestGoal,
    contributorsCount,
    handleHelpButtonClick,
    isLoading,
    onCardClick,
  } = props;

  return (
    <CardActions sx={{ display: 'block', padding: 0, marginTop: 'auto' }} disableSpacing>
      <Stack gap="4px" marginBottom={'20px'} onClick={onCardClick}>
        <Typography variant="subtitle2">Завершение</Typography>
        <Typography variant="body2">
          {new Date(endingDate).toLocaleDateString('ru-RU')}
        </Typography>
      </Stack>
      <Stack gap="4px" marginBottom={'10px'} onClick={onCardClick}>
        <Typography variant="subtitle2">Мы собрали</Typography>
        <LinearProgress
          variant="determinate"
          value={goalProgressInPercent}
          sx={{ borderRadius: 1 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.6 }}>
            {requestGoalCurrentValue} руб
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.6 }}>
            {requestGoal} руб
          </Typography>
        </Box>
      </Stack>
      <Stack gap="4px">
        <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.6 }}>
          {contributorsCount === 0 ? 'Вы будете первым' : `Нас уже: ${contributorsCount}`}
        </Typography>
        <LoadingButton
          variant="contained"
          onClick={handleHelpButtonClick}
          size="large"
          loading={isLoading}
        >
          ПОМОЧЬ
        </LoadingButton>
      </Stack>
    </CardActions>
  );
};
