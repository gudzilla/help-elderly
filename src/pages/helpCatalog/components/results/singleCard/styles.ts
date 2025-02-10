export const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: 320,
  },
  cardBody: {
    padding: '10px 16px 20px 16px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  cardBodyContent: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '20px',
  },
  favoriteButton: {
    minWidth: '32px',
    height: '32px',
    width: '32px',
    p: 0,
    border: '1px solid rgba(0, 0, 0, 0.12)',
    marginLeft: 'auto',
  },
  favIcon: {
    color: 'rgba(0, 0, 0, 0.56)',
  },
  title: {
    'p': 0,
    'display': '-webkit-box',
    'overflow': 'hidden',
    'WebkitBoxOrient': 'vertical',
    'lineClamp': 3,
    'WebkitLineClamp': 3,
    '& .MuiCardHeader-title': {
      lineHeight: 1.3,
    },
    // Ignore нужен чтобы height НЕ менялся в 'height' (со скорбками)
    // prettier-ignore
    height: '5.85rem',
  },
  oneLineText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  goalDescription: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    lineClamp: 2,
    WebkitLineClamp: 2,
  },
};
