import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Stack } from '@mui/material';
import { Qualification } from './Qualification';
import { VolunteerFormat } from './VolunteerFormat';
import { VolunteersNeeded } from './VolunteersNeeded';

const style = {
  summary: {
    'border': '1px solid',
    'borderColor': 'divider',
    '&.Mui-expanded': {
      minHeight: 'auto', // Чтобы высота не менялась при раскрытии
    },
    '.MuiAccordionSummary-content': {
      '&.Mui-expanded': {
        // Отступ чтобы в раскрытом виде не увеличивался размер
        margin: '12px 0',
      },
    },
  },
};

export const FiltersVolunteer = () => {
  return (
    <Box>
      <Accordion defaultExpanded elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={style.summary}>
          <Typography component="span">Волонтерство</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <Stack gap={'16px'}>
            <Qualification />
            <VolunteerFormat />
            <VolunteersNeeded />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
