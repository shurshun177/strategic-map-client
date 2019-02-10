import React, { Component } from 'react';
import Form from '../components/Form'
import RestAPI from '../api';
import { Route, Redirect } from 'react-router';
import VersionForm from '../components/VersionForm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import {withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';


const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {

  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
class VersionDetails extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            isCreated: false,
            versionNumber: null,
            open: false
        }
    }


     componentDidMount() {
        let url = 'last_version/';
        //console.log(this.state.versionNumber)
        const last_version = RestAPI().get(url, {withCredentials: true});
        last_version.then(result => {
            let number = result.data.vers_number;
            //console.log(result.data.vers_number)
            this.setState((prevState, props) => {
                return {
                    versionNumber: number
                };
            });

        }).catch((error) => {
            console.log(error);
        });
     }

    handleFormSubmit(formData){
        let url = `versions/`;
        delete formData.measure_names;
        const createVersion = RestAPI().post(url, formData, {withCredentials: true});
        createVersion.then(result => {
            this.setState((prevState, props) => {
                return {
                    isCreated: true,
                    open: true
                };
            });
        }).catch((error) => {
            this.setState((prevState, props) => {
                return {

                    open: true
                };
            });
            //todo if not successful, display an error with toaster

//            alert('such credentials already exist')
        });
    }

    onDialogCancel = () => {
        this.setState({ open: false});
    };

    dialogClose = () => {
        this.setState({open: false});
    };



    render() {
        return (
            <div className="main-content">{

                // (<Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='version' versionNumber={this.state.versionNumber}/>)
                    (<VersionForm handleFormSubmit={this.handleFormSubmit.bind(this)} versionNumber={this.state.versionNumber}/>)
            }


                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"צריך לבחור גם מדדים !"}</DialogTitle>
                    <DialogContent>

                    </DialogContent>
                    <DialogActions>

                        <Button onClick={this.dialogClose} variant='outlined' color="primary">
                            אישור
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>)
    }
}

export default withStyles(styles) (VersionDetails);