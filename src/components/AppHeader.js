import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
const styles = {
    root: {
        flexGrow: 1,
    },
};

var divStyle = {
   width: 250,
    height: 100
};


function AppHeader(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>

            <AppBar position="static" color="default" title='Title'>
                <Toolbar>
                    {/*<Typography variant="h6" color="inherit">*/}
                        {/*This is place for logo*/}
                    {/*</Typography>*/}
                    <img src="/new-logo.PNG" style={divStyle}/>
                </Toolbar>
            </AppBar>

        </div>
    );
}

AppHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppHeader);
