import React, {Component} from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import RestAPI from '../api';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router';


import moment from 'moment';

const styles = theme => ({
    container: {
        //display: 'flex',
        //flexDirection: 'column'

        display: 'raw',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,

        width: 400
    },
    dense: {
        marginTop: 30,
    },
    menu: {
        width: 200,
    },
    group: {
    },
    label:{
        marginRight: '20px',
        right: '15px'
    },
    focused: {
        margin:'20px',
        right: '0px',
        // padding: '10px'
    },
    input:{
        // padding: '20px'
    },
    formHelperText:{
        textAlign: 'right'
    },

    button: {
        margin: theme.spacing.unit,
    },
    iOSSwitchBase: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#2196f3',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(30px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 57,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    width: 24,
    height: 24,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
    switch: {
        direction: 'ltr'
    }
});

const hosp_type = [
    {
        value: '0',
        label: '',
    },
    {
        value: '1',
        label: 'כללים',
    },
    {
        value: '2',
        label: 'גריאטריים',
    },
    {
        value: '3',
        label: 'פסיכיאטריים',
    },
];

const topic_list = [
    {
        value: '0',
        label: '',
        items:[

        ]
    },
    {
        value: '1',
        label: 'תקן איוש ונלוות',
        items:[
            { value: '1',
                label: 'תקן איוש ונלוות'},
            { value: '4',
                label: 'תקן איוש ונלוות3'},
            { value: '3',
                label: 'תקן איוש ונלוות2'}
        ]
    },
    {
        value: '2',
        label: 'פעילות',
        items:[
            { value: '4-2',
                label: 'תקן איוש ונלוות2'},
            { value: '2-4',
                label: 'תקן איוש ונלוות23'},
            { value: '2-3',
                label: 'תקן איוש ונלוות32'}
        ]

    },
    {
        value: '3',
        label: 'חווית המטופל',
        items:[

        ]
    },
    {
        value: '4',
        label: 'הון אנושי',
        items:[

        ]
    },
    {
        value: '5',
        label: 'איכות ובטיחות',
        items:[

        ]
    },
    {
        value: '6',
        label: 'תשתית כלכלית ופיזית',
        items:[

        ]
    },
    {
        value: '7',
        label: 'ניצולת חדרי ניתוח',
        items:[

        ]
    },
    {
        value: '8',
        label: 'תשתית טכנולוגית',
        items:[

        ]
    },
];

const vers_type = [
    {
        value: '0',
        label: '',
    },
    {
        value: '1',
        label: 'חציוני',
    },
    {
        value: '2',
        label: 'שנתי',
    },
];

class NationalMesureUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onExitClick = this.onExitClick.bind(this);
        this.state = {
            hospital_type: '',
            year:  moment().format('YYYY'),
            year_list: ()=>{
                let d = new Date( "01 " + "July 1980");
                let first = d.getFullYear();

                let second = moment().year();
                let arr = [];

                for(let i = second; i >= first; i--) arr.push(i);
                return arr;
            },
            open: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.mode === 'update' && this.props.mode !==prevProps.mode){
            this.setState((prevState, props) => {
                return props.data;
            }, ()=>{
                this.requestAvailableMeasures(this.state.business_topic, this.state.hospital_type);
            });
        }

        if (this.props.mode === 'clone' && this.props.mode !==prevProps.mode){
            this.setState((prevState, props) => {
                return props.data;
            }, ()=>{
                this.requestAvailableMeasures(this.state.business_topic, this.state.hospital_type);
            });
        }

        if (this.props.versionNumber && this.props.versionNumber !==prevProps.versionNumber){
         this.setState(() => {
           return {version_number : this.props.versionNumber};});
        }
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



    //TODO separate logic
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });


    };




    handleDateChange = name => date => {
        this.setState({  [name]: moment(date).format('YYYY-MM-DD')});
    };

    handleSubmit(e){
        e.preventDefault();
        this.props.handleFormSubmit(this.state);
    }


    onDialogCancel = () => {
        this.setState({ open: false });
    };

    onDialogSave = ()=>{
        this.setState({ open: false }, ()=>{
            this.props.handleFormSubmit(this.state);
        });

    };

    onExitClick(e){
        e.preventDefault();
        //TODO check if state is changed
        this.setState({ open: true });
    };

    render() {

        const { classes, type, mode, data } = this.props;

        let isReadonly = mode === 'update';
        let isReq = mode === 'update';

        return (
            <div className="main-content">
            <>

            <form className={classes.container} noValidate autoComplete="off"
                  onSubmit={this.handleSubmit}
            >

            <div>
                <Button variant="outlined" color='primary' size="large" type="submit" className={classes.button} >
                    שמירה
                </Button>
                <Button variant="outlined" color='primary' size="large" className={classes.button} onClick={this.onExitClick}>
                    יציאה
                </Button>
            </div>


                <TextField
                    id="year"
                    name="year"
                    variant="outlined"
                    required
                    select
                    label="שנה"
                    className={classes.textField}
                    SelectProps={{
                        native: true,
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    InputLabelProps={{classes:{root: classes.label}}}
                    margin="normal"
                    onChange={this.handleChange('year')}
                    value={this.state.year}
                >
                    {this.state.year_list().map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </TextField>





                <TextField
                    id="hospital_type"
                    name="hospital_type"
                    required


                    variant="outlined"
                    select
                    label="סוג בית חולים"
                    className={classes.textField}
                    SelectProps={{
                        native: true,
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    InputLabelProps={{classes:{root: classes.label}}}
                    margin="normal"
                    onChange={this.handleChange('hospital_type')}
                    value={this.state.hospital_type}
                >
                    {hosp_type.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}

                </TextField>





                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"האם ברצונך לשמור שינויים ?"}</DialogTitle>
                    <DialogContent>
                           <DialogContentText>
                           אם לא לשמור שינויים נתוני תופס ימחקו !
                           </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onDialogCancel} variant='outlined' color="primary">
                            לצאת בלי שמירה
                        </Button>
                        <Button onClick={this.onDialogSave} variant='outlined' color="primary" autoFocus>
                            לשמור
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>

            </>
            </div>
        );
    }
}

NationalMesureUpdate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NationalMesureUpdate);