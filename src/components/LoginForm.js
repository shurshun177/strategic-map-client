import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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

const iconStyle = {
    width: 311,
    height: 75

};

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: '',
            password: ''
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };


    handleSubmit(e){
        e.preventDefault();
        this.props.handleSubmit({
            name: this.state.username,
            password: this.state.password
        });
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }


    render() {

        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <img src="/logo.jpg" style={iconStyle}/>
                    <Typography component="h1" variant="h5">

                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <TextField
                            id="username"
                            name="username"
                            required
                            label="שם משתמש"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.username}
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
                            onChange={this.handleChange}
                            value={this.state.password}
                            InputLabelProps={{classes:{root: classes.label}}}
                        />
                        {this.props.isError? <div style={{color: 'red'}}>משתמש אינו קיים או פרטי זיהוי שגויים</div> : ''}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!this.validateForm()}
                        >כניסה
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