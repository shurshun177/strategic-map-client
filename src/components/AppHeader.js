import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {Link} from 'react-router-dom';

import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#2196F3'
    },
    drawer: {
        // width: drawerWidth,
        flexShrink: 0,
        padding: theme.spacing.unit * 5,
    },
    drawerPaper: {
        // width: drawerWidth,
        'padding-top': theme.spacing.unit * 5,
        backgroundColor: theme.palette.primary.dark,
        // color: 'white'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 5,
    },
    toolbar: theme.mixins.toolbar,
        selected: {
            'background-color': '#3fc880'
        }
});


const iconStyle = {
    width: 211,
    height: 100

};



class AppHeader extends React.Component{
    state = {
        open: false,
    };



    render() {
        const { classes, theme } = this.props;

        const menuItems = [
            {name: 'רשימת גירסאות', link: '/app/versions'},
            {name: 'רשימת מדדים', link: '/app/measures'},
            {name: 'חדש', link: '/app/new'},
            {name: 'exmaple button', link: '/app/apple-button'}
        ];
        return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar  disableGutters={!this.state.open}>
                    <img src="/logo.jpg" style={iconStyle}/>

                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    {menuItems.map((el, index) => (
                        <MenuItem button key={el.name} component={Link} to={el.link} classes={classNames.listItem}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={el.name} />
                        </MenuItem>
                    ))}
                </List>
                {/*<Divider />*/}
            </Drawer>
        </div>
        );
    }
}

AppHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppHeader);
