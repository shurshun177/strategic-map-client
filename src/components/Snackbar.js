import React, {Component} from 'react';
import RestAPI from '../api';
import { Route, Redirect } from 'react-router';
import VersionForm from '../components/VersionForm';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.secondary.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.light,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
        marginRight: 60,
        marginLeft: 0.1
    },
    iconVariant: {
        opacity: 10,
        marginLeft: theme.spacing.unit,
        color: 'white'

    },
    message: {
        display: 'flex',
        alignItems: 'right',
        color: 'white'

    },
    anchor: {
        vertical: 'top',
        horizontal: 'left'
    },
    root:{
        position: 'fixed',
        left: '10px',
        'z-index': 4000
    },
    close: {
        color: 'white'
    }
});


class Notification extends Component{


    render(){
        const { classes, className, message, onClose, variant, showSnackbar, ...other } = this.props;
        const Icon = variantIcon[variant];
    return (
        <div>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                message={
                    <span id="client-snackbar" className={classes.message}>
                <Icon className={classNames(classes.iconVariant)}/>
                        {message}
                </span>
                }
                autoHideDuration={6000}
                open={showSnackbar}
                ContentProps={{
                    classes: {root: classes[variant]}
                }}
                onClose={onClose}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={onClose}
                    >
                        <CloseIcon className={classes.icon}/>
                    </IconButton>,
                ]}
            />
        </div>
    );
    }
}

Notification.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
    showSnackbar: PropTypes.bool
};

export default withStyles(styles)(Notification);