import React from 'react';
import { Avatar, Link, List, ListItem, ListItemAvatar, ListItemText, SvgIcon } from '@material-ui/core';
import { Skeleton, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import Flags from 'country-flag-icons/react/3x2';
import { getFromLocalStorage, setIntoLocalStorage } from '../helpers';

export default class News extends React.Component {
    state = {
        languages: (
            getFromLocalStorage('belcovid:news:languages') &&
            JSON.parse(getFromLocalStorage('belcovid:news:languages'))
        ) || ['en', 'fr', 'nl']
    }
    classes = this.props.classes;
    render() {
        const lastUpdate = getFromLocalStorage('belcovid:update:news');
        const lastUpdateDate = lastUpdate && new Date(lastUpdate);
        return (
            <React.Fragment>
                <div style={{textAlign: 'right'}}>
                    { lastUpdateDate &&
                        <small style={{float: 'left', color: 'grey', fontSize: 'xx-small'}}>
                            Last update: {lastUpdateDate.toDateString()} at {lastUpdateDate.toLocaleTimeString()}
                        </small>
                    }
                    <ToggleButtonGroup
                        value={this.state.languages}
                        onChange={this._toggleLanguage.bind(this)}
                        aria-label="News languages"
                    >
                        <ToggleButton value="en" aria-label="English" className={this.classes.flagButton}>
                            <SvgIcon><Flags.GB title="English" /></SvgIcon>
                        </ToggleButton>
                        <ToggleButton value="fr" aria-label="French" className={this.classes.flagButton}>
                            <SvgIcon><Flags.FR title="French" /></SvgIcon>
                        </ToggleButton>
                        <ToggleButton value="nl" aria-label="Dutch" className={this.classes.flagButton}>
                            <SvgIcon><Flags.NL title="Dutch" /></SvgIcon>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                { this.props.data ?
                    <List>{this._getListItems()}</List> :
                    <Skeleton variant="rect" height={200} /> }
            </React.Fragment>
        );
    }
    _getListItems() {
        return this.props.data
            .filter(item => this.state.languages.includes(item.language.toLowerCase()))
            .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
            .map((item, index) => {
                const date = new Date(item.pubDate).toDateString();
                return (
                    <ListItem key={`${item.sourceName}-${index}`} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={item.sourceName} src={process.env.PUBLIC_URL + '/icons/' + item.icon}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Link href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</Link>}
                            secondary={`${date} (${item.sourceName})`}
                        />
                    </ListItem>
                );
        });
    }
    _toggleLanguage(ev, languages) {
        this.setState({ languages });
        setIntoLocalStorage('belcovid:news:languages', JSON.stringify(languages));
    }
}
