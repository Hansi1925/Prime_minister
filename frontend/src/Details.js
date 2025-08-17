import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import ApplicationsForm from './Application';
import { ApplicationProvider } from "./ApplicationContext";
import CommitteeSubmitted from './CommitteeSubmitted'; // 👈 new file for accordion 2 table

export default function AccordionUsage() {
  return (
    <ApplicationProvider>
      <div style={{ marginLeft: '40px', marginRight: '40px' }}>
        <Stack spacing={2}> {/* adds space between accordions */}

          {/* Accordion 1 */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ bgcolor: 'rgba(197, 96, 2, 1)', color: 'white' }}
            >
              <Typography component="span">කාර්ය මණ්ඩල තොරතුරු</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ApplicationsForm />
            </AccordionDetails>
          </Accordion>

          {/* Accordion 2 */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ bgcolor: 'rgba(197, 96, 2, 1)', color: 'white' }}
            >
              <Typography component="span">කමිටුවට ඉදිරිපත් කරන වාර්තා සටහන් </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CommitteeSubmitted />{/* 👈 Uses values from Accordion 1 */}
            </AccordionDetails>
          </Accordion>

          {/* Accordion 3 */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
              sx={{ bgcolor: 'rgba(197, 96, 2, 1)', color: 'white' }}
            >
              <Typography component="span">කමිටු සාකච්ජා</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
          </Accordion>

          {/* Accordion 4 */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4-content"
              id="panel4-header"
              sx={{ bgcolor: 'rgba(197, 96, 2, 1)', color: 'white' }}
            >
              <Typography component="span">අමාත්‍ය මණ්ඩල සංදේශ/ අතුරු වාර්තා</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
          </Accordion>

          {/* Accordion 5 */}
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5-content"
              id="panel5-header"
              sx={{ bgcolor: 'rgba(197, 96, 2, 1)', color: 'white' }}
            >
              <Typography component="span">අමාත්‍ය මණ්ඩල තීරණ</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
            <AccordionActions>
              <Button>Cancel</Button>
              <Button>Agree</Button>
            </AccordionActions>
          </Accordion>

        </Stack>
      </div>
    </ApplicationProvider>
  );
}
