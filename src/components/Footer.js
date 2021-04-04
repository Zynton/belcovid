import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { StatsDataContext, UpdateStatus } from '../contexts/StatsDataContext';
import { prettyDate } from '../helpers';
import DoneIcon from '@material-ui/icons/Done';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ClearIcon from '@material-ui/icons/Clear';
import InfoBox from './InfoBox';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

export default function Footer() {
    const {updateDates, updateStatus} = React.useContext(StatsDataContext);
    const updateKeys = Object.keys(updateDates);
    const dates = updateKeys.map(key => (
        <small key={key} style={{display: 'block'}}>{key}: {
            updateDates[key]
                ? prettyDate(updateDates[key], true)
                : 'Loading...'}</small>
    ));
    let updateIcon;
    switch (updateStatus) {
        case UpdateStatus.DONE: {
            updateIcon = <DoneIcon style={{color: 'green'}}/>;
            break;
        }
        case UpdateStatus.OUT_OF_SYNC: {
            updateIcon = <ClearIcon style={{color: 'red'}}/>;
            break;
        }
        case UpdateStatus.UPDATING:
        case UpdateStatus.UNKNOWN:
        default: {
            updateIcon = <AutorenewIcon style={{color: 'orange'}}/>;
        }
    }
    return (
        <Container style={{position: 'relative'}}>
            <Typography align="center" variant="body2" color="textSecondary">
                <Link color="inherit" href="https://github.com/Zinston/belcovid" target="_blank" rel="noopener noreferrer">Contribute on GitHub.</Link>
                <br/>
                {'All data from '}
                <Link color="inherit" href="https://www.sciensano.be/" target="_blank" rel="noopener noreferrer">Sciensano</Link>
                {' • '}
                <Link color="inherit" href="https://www.info-coronavirus.be/" target="_blank" rel="noopener noreferrer">Official national information on Covid-19</Link>
                {'.'}
                <br/>
                <small>Most data is truncated to exclude the last 4 days because that data is not yet consolidated.</small>
            </Typography>
            <Box style={{position: 'absolute', right: 0, top: 0, padding: 0}}>
                {<InfoBox icon={updateIcon}>
                    Last updates:<br/><br/>
                    {dates}
                </InfoBox>}
            </Box>
        </Container>
    );
}
