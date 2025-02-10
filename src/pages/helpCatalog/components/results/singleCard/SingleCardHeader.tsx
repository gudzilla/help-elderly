import { Box, Button, CardHeader, CardMedia } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CardImage1 from '@/assets/card-image-1.svg?react';
import CardImage2 from '@/assets/card-image-2.svg?react';
import CardImage3 from '@/assets/card-image-3.svg?react';
import { CardHelpType, CardRequesterType } from './types';
import { styles } from './styles';

// логика выбора картинки для карточки
const getImage = (requesterType: CardRequesterType, helpType: CardHelpType) => {
  if (requesterType === 'organization') {
    return <CardImage2 />;
  } else if (helpType === 'finance') {
    return <CardImage1 />;
  } else {
    return <CardImage3 />;
  }
};

type SingleCardHeaderProps = {
  title: string;
  requesterType: CardRequesterType;
  helpType: CardHelpType;
  isFavourite: boolean;
  addToFavourite: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  removeFromFavourite: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCardClick: () => void;
};

export const SingleCardHeader = (props: SingleCardHeaderProps) => {
  const {
    title,
    requesterType,
    helpType,
    isFavourite,
    addToFavourite,
    removeFromFavourite,
    onCardClick,
  } = props;
  return (
    <Box onClick={onCardClick}>
      <CardMedia sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {getImage(requesterType, helpType)}
      </CardMedia>
      <Box sx={{ p: '16px', display: 'flex', gap: '8px' }}>
        <CardHeader title={title} sx={styles.title} />
        <Button
          // variant="outlined"
          onClick={isFavourite ? removeFromFavourite : addToFavourite}
          sx={styles.favoriteButton}
        >
          {isFavourite ? (
            <StarIcon sx={styles.favIcon} />
          ) : (
            <StarBorderIcon sx={styles.favIcon} />
          )}
        </Button>
      </Box>
    </Box>
  );
};
