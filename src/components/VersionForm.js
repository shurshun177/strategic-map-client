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
import AssignMeasures from './AssignMeasures';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';


import moment from 'moment';

const styles = theme => ({
    root: {
    flexGrow: 1,
    },
    container: {
        //display: 'flex',
        //flexDirection: 'column'

        display: 'raw',
        flexWrap: 'wrap',
    },
    width: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit*1.5,
        marginTop: theme.spacing.unit*4,

        width: '40%'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit*0.5,
        width: '40%'
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
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit*2,
        marginTop: theme.spacing.unit*4,
        width: '40%'
    },

    focused: {
        margin:'20px',
        right: '15px',
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
        direction: 'ltr',
        marginTop: theme.spacing.unit*0.1,
        marginRight: theme.spacing.unit*0.1
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

class VersionForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onExitClick = this.onExitClick.bind(this);
        this.state = {
            version_number: '',
            version_name: '',
            version_type: '',
            hospital_type: '',
            active: true,
            measure_names: [],
            measure: [],
            business_topic: '',
            retro: false,
            year:  moment().format('YYYY'),
            year_list: ()=>{
                let d = new Date( "01 " + "July 1980");
                let first = d.getFullYear();

                let second = moment().year();
                let arr = [];

                for(let i = second; i >= first; i--) arr.push(i);
                return arr;
            },
            open: false,
            shouldExit: false,
            shouldValidate: false
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

    requestAvailableMeasures = (measure, hospitalType)=>{
        if (measure && hospitalType){
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
        }
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

    handleDateChange = name => date => {
        this.setState({  [name]: moment(date).format('YYYY-MM-DD')});
    };

    handleSubmit(e){
        e.preventDefault();
        this.setState({shouldValidate: true},()=>{
            if (this.state.version_number !== '' &&
                    this.state.version_type !== '' &&
                    this.state.year !== '' &&
                    this.state.version_name !== '' &&
                    this.state.hospital_type !== ''
            ){
                this.props.handleFormSubmit(this.state);
            }
        });
    }


    onDialogCancel = () => {
        this.setState({ open: false, shouldExit: true });
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
            <>{this.state.shouldExit?  (<Redirect to="/app/versions"/>):

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
            <FormGroup grid>
                <InputLabel  required={!isReq} className={classes.label} htmlFor="component-simple">מספר גרסה</InputLabel>
                <TextField
                    id="version_number"
                    name="version_number"
                    required={!isReq}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange('version_number')}
                    value={this.state.version_number}
                    type="number"
                    inputProps={{
                        min: 1000,
                        step: 1
                    }}
                    readonly = {isReadonly}
                    disabled={isReadonly}
                    error={this.state.version_number === '' && this.state.shouldValidate}
                    InputLabelProps={{classes:{root: classes.label}}}


                />
                    <InputLabel className={classes.label} htmlFor="component-simple">פעיל</InputLabel>
                    <FormControlLabel


                        control={
                            <Switch
                                id="active"
                                name="active"
                                checked={this.state.active}
                                onChange={this.handleChangeSwitch('active')}
                                value='active'
                                disableRipple
                                color="primary"
                                classes={{
                                    switchBase: classes.iOSSwitchBase,
                                    bar: classes.iOSBar,
                                    icon: classes.iOSIcon,
                                    iconChecked: classes.iOSIconChecked,
                                    checked: classes.iOSChecked,
                                    root: classes.switch,

                                }}

                            />
                        }

                    />

                <InputLabel  required className={classes.label} htmlFor="component-simple">סוג גרסה</InputLabel>
                <TextField

                    id="version_type"
                    name="version_type"
                    select
                    variant="outlined"
                    required

                    className={classes.textField}
                    SelectProps={{
                        native: true,
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    InputLabelProps={{classes:{root: classes.label}}}
                    margin="normal"
                    onChange={this.handleChange('version_type')}
                    value={this.state.version_type}
                    error={this.state.version_type === '' && this.state.shouldValidate}

                >
                    {vers_type.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>

                <InputLabel required className={classes.label} htmlFor="component-simple">שנה</InputLabel>
                <TextField
                    id="year"
                    name="year"
                    variant="outlined"
                    required
                    select

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
                    error={this.state.year === '' && this.state.shouldValidate}

                >
                    {this.state.year_list().map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </TextField>



                    <InputLabel className={classes.label} htmlFor="component-simple">שם גרסה</InputLabel>
                    <TextField
                        id="version_name"
                        name="version_name"
                        required

                        className={classes.textField}
                        margin="normal"

                        variant="outlined"
                        onChange={this.handleChange('version_name')}
                        value={this.state.version_name}
                        InputLabelProps={{classes:{root: classes.label}}}
                        error={this.state.version_name === '' && this.state.shouldValidate}

                    />

                    <InputLabel className={classes.label} htmlFor="component-simple">סוג בית חולים</InputLabel>
                    <TextField
                        id="hospital_type"
                        name="hospital_type"
                        required


                        variant="outlined"
                        select

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
                        error={this.state.hospital_type === '' && this.state.shouldValidate}

                    >
                        {hosp_type.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}

                    </TextField>

                    <InputLabel className={classes.label} htmlFor="component-simple">אפשר עדכון דיווח קודם</InputLabel>
                    <FormControlLabel

                        control={
                            <Switch
                                id="retro"
                                name="retro"
                                checked={this.state.retro}
                                onChange={this.handleChangeSwitch('retro')}
                                value="retro"
                                color="primary"
                                disableRipple
                                classes={{
                                    switchBase: classes.iOSSwitchBase,
                                    bar: classes.iOSBar,
                                    icon: classes.iOSIcon,
                                    iconChecked: classes.iOSIconChecked,
                                    checked: classes.iOSChecked,
                                    root: classes.switch
                                }}
                            />
                        }

                    />





                    <InputLabel className={classes.label} htmlFor="component-simple">נושא עסקי</InputLabel>
                    <TextField
                        id="business_topic"
                        name="business_topic"
                        variant="outlined"
                        select

                        className={classes.textField}

                        InputLabelProps={{classes:{root: classes.label}}}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                        onChange={this.handleMeasure('business_topic')}
                        value={this.state.business_topic}
                        FormHelperTextProps={{classes:{root:classes.formHelperText }}}
                    >
                        {topic_list.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                <AssignMeasures
                    title='בחירת מדדים'
                    allMeasures={this.state.measure_names}
                    assignedMeasures={this.state.measure}
                    headerNamesAndRelativeIds={[]}
                    editedUserName=""
                    assigneesRoleName={"therapists"}
                    setMeasures={selectedMeasures=>{this.setState({measure: selectedMeasures })}}
                />
            </FormGroup>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"האם ברצונך לשמור שינויים ?"}</DialogTitle>
                    <DialogContent>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onDialogSave} variant='outlined' color="primary" autoFocus>
                            כן
                        </Button>
                        <Button onClick={this.onDialogCancel} variant='outlined' color="primary">
                            לא
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
            }
            </>
        );
    }
}

VersionForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VersionForm);
