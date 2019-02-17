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
import ExitToApp from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';

import MenuItem from '@material-ui/core/MenuItem';
import { Redirect } from 'react-router';

import {inject, observer} from "mobx-react"


const styles = theme => ({
    root: {
        // display: 'flex',
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
         width: '210px',
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
        },
    listItem: {
        color: 'white'
    },
    sectionMobile: {
        // position: 'relative',
        // borderRadius: theme.shape.borderRadius,
        // marginLeft: theme.spacing.unit*150,
        // width: '100%'
    },
    welcomeText: {
        textDecoration: 'underline',
    },

    userTypeText: {
      color: 'green'
    }
});


const iconStyle = {
    width: 211,
    height: 70

};


class AppHeader extends React.Component{
    state = {
        open: false,
    };

    constructor(props) {
        super(props);
        this.signout = this.signout.bind(this);
        this.state = {
            isLoggedOut: false
        };
    }


    signout(){
        this.setState(()=>{
            return {
                isLoggedOut: true
            }
        })
    }
    render() {
        const { classes, theme } = this.props;

        const menuItems = [
            {name: 'ניהול גרסאות', link: '/app/versions'},
            {name: 'ניהול מדדים', link: '/app/measures'},
            {name: 'דיווח ע"י חטיבה', link: '/app/new'},
            {name: 'דיווח ממוצעים', link: '/app/national-measure'}
        ];
        let {loginStore} = this.props;
        let {username, type} = loginStore.values;
        let welcomeText = `ברוך הבא  ${username}`;
        return (
        <>{this.state.isLoggedOut ?
            (<Redirect to="/"/>)
            :
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar  disableGutters={!this.state.open}>
                    <img src="/logo.jpg" style={iconStyle}/>
                    <div style={{margin: '5px'}}>
                        {welcomeText}

                    </div>
                    <div className={classes.sectionMobile}>
                    <IconButton aria-haspopup="true" onClick={this.signout} color="inherit">
                        <ExitToApp />
                    </IconButton>
                        </div>
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
                    <MenuItem key={type} classes={classNames.userTypeText}>
                        <ListItemText primary={type} classes={{primary: classes.userTypeText}}/>
                    </MenuItem>
                    {menuItems.map((el, index) => (
                        <MenuItem button key={el.name} component={Link} to={el.link} classes={classNames.listItem}>
                            <ListItemText primary={el.name} classes={{primary: classes.listItem}}/>
                        </MenuItem>
                    ))}
                </List>
                {/*<Divider />*/}
            </Drawer>
        </div>}
        </>
        );
    }
}

AppHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

observer(AppHeader);

export default withStyles(styles, { withTheme: true })(AppHeader);
