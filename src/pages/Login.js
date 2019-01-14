import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import RestAPI from '../api';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        direction: 'rtl'
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    label: {
        marginRight:'20px',
        right:0
    },
    textField: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
        width: '100%'
    }
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: null,
            password: null
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.mode === 'update' && this.props.mode !==prevProps.mode){
            this.setState((prevState, props) => {
                return props.data;
            });
        }

        if (this.props.mode === 'clone' && this.props.mode !==prevProps.mode){
            this.setState((prevState, props) => {
                return props.data;
            });
        }

        //if (this.props.versionNumber){
        //  this.setState(() => {
        //    return {version_number : versionNumber};});
        //}
    }

    handleMeasure = name => event => {
        this.setState({
            [name]: event.target.value,
        });
        let t = event.target.value;
        let code = this.state.hospital_type;
        if (code && t){
            this.requestAvailableMeasures(t, code);
        }
    };

    requestAvailableMeasures = (measure, hospitalType)=>{
        let url = `available_measures/${hospitalType}/${measure}/`;
        const ShowMeasures = RestAPI().get(url, {withCredentials: true});
        ShowMeasures.then(result => {
            // {"items": [{"_id": {"$oid": "5c27ed38a933f91dc178076c"}, "measure_name": "name2"}]}
            this.setState((prevState, props) => {
                return {
                    measure_names: result.data.items,
                    measure: []
                };
            })
        }).catch((error) => {
            //todo if not successful, display an error with toaster
            alert('Hospital type and business topic must be selected')
        });
    };

    //TODO separate logic
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });

        if(name === 'hospital_type'){
            if (this.state.business_topic !== ''){
                this.requestAvailableMeasures(this.state.business_topic, event.target.value);
            }
        }
    };



    handleChangeSwitch = name => event => {
        this.setState({
            [name]: event.target.checked,
        });
    };

    // handleDateChange = name => date => {
    //     this.setState({  [name]: moment(date).format('YYYY-MM-DD')});
    // };

    handleSubmit(e){
        e.preventDefault();
        this.props.handleFormSubmit(this.state);
    }

    onExitClick(){
        alert('Button click')
        //todo
    }

    render() {

        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email"  classes={{root:classes.label}}>Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password"
                            classes={{root:classes.label}}

                            >Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password"
                                   classes={{label:{marginRight:'20px', right:0}}}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <TextField
                            id="email"
                            name="email"
                            required
                            label="אימייל"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('version_name')}
                            value={this.state.email}
                            InputLabelProps={{classes:{root: classes.label}}}
                            autoFocus
                        />
                        <TextField
                            id="password"
                            name="password"
                            required
                            label="סיסמה"
                            className={classes.textField}
                            margin="normal"
                            type="password"
                            variant="outlined"
                            onChange={this.handleChange('version_name')}
                            value={this.state.password}
                            InputLabelProps={{classes:{root: classes.label}}}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                           כניסה
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);