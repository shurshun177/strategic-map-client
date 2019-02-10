import React, {Component} from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import classNames from 'classnames';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router';
import InputLabel from '@material-ui/core/InputLabel';



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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit*0.5,
        width: '40%'
    },
    width: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit*1.5,
        marginTop: theme.spacing.unit*4,

        width: '40%'
    },
    label:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit*2,
        marginTop: theme.spacing.unit*4,
        width: '40%'
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    group: {
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


const meas_type = [
    {
        value: '0',
        label: '',
    },
    {
        value: '1',
        label: 'ON TARGET',
    },
    {
        value: '2',
        label: 'LOW IS BETTER',
    },
    {
        value: '3',
        label: 'HIGH IS BETTER',
    },
];

const meas_unit = [
    {
        value: '0',
        label: '',
    },
    {
        value: '1',
        label: 'אחוזים %',
    },
    {
        value: '2',
        label: 'שקלים חדשים ₪',
    },
    {   value: '3',
        label: 'ללא יחידת מידה',
    },
];

const meas_freq = [
    {
        value: '0',
        label: '',
    },
    {
        value: '1',
        label: 'יומי',
    },
    {
        value: '2',
        label: 'חודשי',
    },
    {
        value: '3',
        label: 'רבעוני',
    },
    {
        value: '4',
        label: 'חציוני',
    },
    {
        value: '5',
        label: 'שנתי',
    },
];

class MeasureForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onExitClick = this.onExitClick.bind(this);
        this.state = {
            measure_code: '',
            measure_name: '',
            measure_desc: '',
            criteria_inclusion: '',
            removal_criteria: '',
            numerator: '',
            denominator: '',
            hospital_type: '',
            business_topic: '',
            sub_business_topic: '',
            measure_type: '',
            measuring_frequency: '',
            measure_unit: '',
            digit_num: '',
            is_division: false,
            separate_thousands: false,
            active: true,
            from_date: moment().format(),
            to_date: moment().add(10, 'years').format(),
            target_default: '',
            remarks: '',
            open: false,
            shouldExit: false,
            shouldValidate: false
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


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });


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
        if(e)
            e.preventDefault();
        this.setState({shouldValidate: true},()=>{
            if (this.state.business_topic !== '' &&
                    this.state.sub_business_topic !== '' &&
                    this.state.measure_code !== '' &&
                    this.state.measure_name !== '' &&
                    this.state.measure_desc !== '' &&
                    this.state.meas_type !== '' &&
                    this.state.meas_unit !== '' &&
                    this.state.digit_num !== '' &&
                    this.state.hospital_type !== ''
            )
            {
                this.props.handleFormSubmit(this.state);
            }
        });
    }

    onDialogCancel = () => {
        this.setState({ open: false, shouldExit: true });
    };

    onExitClick(e){
        e.preventDefault();
        //TODO check if state is changed
        this.setState({ open: true });
        }

    onDialogSave = ()=>{
        this.setState({ open: false }, ()=>{
            this.handleSubmit();
        });
};

    render() {

        const { classes, type, mode, data } = this.props;

        let isReadonly = mode === 'update';
        let isReq = mode === 'update';

        return (
            <>{this.state.shouldExit?  (<Redirect to="/app/measures"/>):


            <form className={classes.container} noValidate autoComplete="off"
                  onSubmit={this.handleSubmit}
            >

            <div className="fixedFormToolbar">
                <Button variant="outlined" color='primary' size="large" type="submit" className={classes.button} >
                    שמירה
                </Button>
                <Button variant="outlined" color='primary' size="large" className={classes.button} onClick={this.onExitClick}>
                    יציאה
                </Button>
            </div>
                <FormGroup grid>
                    <InputLabel className={classes.label} htmlFor="component-simple">פעיל</InputLabel>
                    <FormControlLabel
                        control={
                            <Switch
                                id="active"
                                name="active"
                                checked={this.state.active}
                                onChange={this.handleChangeSwitch('active')}
                                value="active"
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

                    <InputLabel className={classes.label} required htmlFor="component-simple">סוג בית חולים</InputLabel>
                    <TextField
                        id="hospital_type"
                        name="hospital_type"



                        variant="outlined"
                        select

                        className={classes.textField}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
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


                    <InputLabel className={classes.label} required htmlFor="component-simple">נושא עסקי</InputLabel>
                    <TextField
                        id="business_topic"
                        name="business_topic"

                        variant="outlined"
                        select

                        className={classes.textField}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                        onChange={this.handleChange('business_topic')}
                        value={this.state.business_topic}
                        error={this.state.business_topic === '' && this.state.shouldValidate}

                    >
                        {topic_list.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>

                    <InputLabel className={classes.label} required htmlFor="component-simple">תת-נושא</InputLabel>
                    <TextField
                        id="sub_business_topic"
                        name="sub_business_topic"

                        variant="outlined"
                        select

                        className={classes.textField}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                        onChange={this.handleChange('sub_business_topic')}
                        value={this.state.sub_business_topic}
                        error={this.state.sub_business_topic === '' && this.state.shouldValidate}

                    >
                        {topic_list.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>

                    <InputLabel className={classes.label} required={!isReq} htmlFor="component-simple">קוד מדד</InputLabel>
                    <TextField
                        id="measure_code"
                        name="measure_code"


                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('measure_code')}
                        value={this.state.measure_code}
                        error={this.state.measure_code === '' && this.state.shouldValidate}

                        disabled={isReadonly}

                    />


                    <InputLabel className={classes.label} required htmlFor="component-simple">שם מדד</InputLabel>
                    <TextField
                        id="measure_name"
                        name="measure_name"


                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('measure_name')}
                        value={this.state.measure_name}
                        error={this.state.measure_name === '' && this.state.shouldValidate}
                    />

                    <InputLabel className={classes.label} required htmlFor="component-simple">תיאור מדד</InputLabel>
                    <TextField
                        id="measure_desc"
                        name="measure_desc"


                        className={classes.textField}
                        margin="normal"
                        multiline
                        rows="4"
                        variant="outlined"
                        onChange={this.handleChange('measure_desc')}
                        value={this.state.measure_desc}
                        error={this.state.measure_desc === '' && this.state.shouldValidate}
                    />



                    <InputLabel className={classes.label} htmlFor="component-simple">קריטריונים להכללה</InputLabel>
                    <TextField
                        id="criteria_inclusion"
                        name="criteria_inclusion"
                        multiline
                        rows="4"

                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('criteria_inclusion')}
                        value={this.state.criteria_inclusion}

                    />

                    <InputLabel className={classes.label} htmlFor="component-simple">קריטריונים להוצאה</InputLabel>
                    <TextField
                        id="removal_criteria"
                        name="removal_criteria"
                        multiline
                        rows="4"

                        className={classes.textField}
                        margin="normal"

                        variant="outlined"
                        onChange={this.handleChange('removal_criteria')}
                        value={this.state.removal_criteria}

                    />


                    <InputLabel className={classes.label} htmlFor="component-simple">מונה</InputLabel>
                    <TextField
                        id="numerator"
                        name="numerator"


                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('numerator')}
                        value={this.state.numerator}
                        multiline
                        rows="4"
                    />

                    <InputLabel className={classes.label} htmlFor="component-simple">מכנה</InputLabel>
                    <TextField
                        id="denominator"
                        name="denominator"


                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('denominator')}
                        value={this.state.denominator}
                        multiline
                        rows="4"

                    />




                    <InputLabel className={classes.label} required htmlFor="component-simple">סוג מדד</InputLabel>
                    <TextField
                        id="measure_type"
                        name="measure_type"

                        variant="outlined"
                        select

                        className={classes.textField}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                        onChange={this.handleChange('measure_type')}
                        value={this.state.measure_type}
                        error={this.state.measure_type === '' && this.state.shouldValidate}

                    >
                        {meas_type.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>


                    <InputLabel className={classes.label} htmlFor="component-simple">תדירות מדידה</InputLabel>
                    <TextField
                        id="measuring_frequency"
                        name="measuring_frequency"
                        variant="outlined"
                        select

                        className={classes.textField}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                        onChange={this.handleChange('measuring_frequency')}
                        value={this.state.measuring_frequency}

                    >
                        {meas_freq.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>


                    <InputLabel className={classes.label} required htmlFor="component-simple">יחידת מידה</InputLabel>
                    <TextField
                        id="measure_unit"
                        name="measure_unit"



                        variant="outlined"
                        select

                        className={classes.textField}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                        onChange={this.handleChange('measure_unit')}
                        value={this.state.measure_unit}
                        error={this.state.measure_unit === '' && this.state.shouldValidate}
                    >
                        {meas_unit.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>

                    <InputLabel className={classes.label} required htmlFor="component-simple">מספר ספרות אחרי הנקודה</InputLabel>
                    <TextField
                        id="digit_num"
                        name="digit_num"


                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('digit_num')}
                        value={this.state.digit_num}
                        error={this.state.digit_num === '' && this.state.shouldValidate}
                        type="number"
                        inputProps={{
                            min: 1,
                            step: 1
                        }}



                    />

                    <InputLabel className={classes.label} htmlFor="component-simple">מפריד אלפים</InputLabel>
                    <FormControlLabel
                        control={
                            <Switch
                                id="separate_thousands"
                                name="separate_thousands"
                                checked={this.state.separate_thousands}
                                onChange={this.handleChangeSwitch('separate_thousands')}
                                value="separate_thousands"
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


                    <InputLabel className={classes.label} htmlFor="component-simple">מתאריך</InputLabel>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            id="from_date"
                            name="from_date"
                            format="D/MM/YYYY"

                            className={classNames(classes.textField)}
                            margin="normal"
                            variant="outlined"
                            okLabel='אישור'
                            cancelLabel='ביטול'
                            value={this.state.from_date}
                            onChange={this.handleDateChange('from_date')}
                            rightArrowIcon={<ChevronRightIcon />}
                            leftArrowIcon={<ChevronLeftIcon />}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </MuiPickersUtilsProvider>

                    <InputLabel className={classes.label} htmlFor="component-simple">עד תאריך</InputLabel>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            id="to_date"
                            name="to_date"
                            format="D/MM/YYYY"


                            className={classNames(classes.textField)}
                            margin="normal"
                            variant="outlined"
                            okLabel='אישור'
                            cancelLabel='ביטול'
                            value={this.state.to_date}
                            onChange={this.handleDateChange('to_date')}
                            rightArrowIcon={<ChevronRightIcon />}
                            leftArrowIcon={<ChevronLeftIcon />}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </MuiPickersUtilsProvider>

                    <InputLabel className={classes.label} htmlFor="component-simple">יעד עיסקי</InputLabel>
                    <TextField
                        id="target_default"
                        name="target_default"


                        onChange={this.handleChange('target_default')}
                        value={this.state.target_default}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        type="number"


                    />

                    <InputLabel className={classes.label} htmlFor="component-simple">מיועד לדיווח על ידי החטיבה</InputLabel>
                    <FormControlLabel
                        control={
                            <Switch
                                id="is_division"
                                name="is_division"
                                checked={this.state.is_division}
                                onChange={this.handleChangeSwitch('is_division')}
                                value="is_division"
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

                    <InputLabel className={classes.label} htmlFor="component-simple">הערות</InputLabel>
                    <TextField
                        id="remarks"
                        name="remarks"

                        multiline
                        rows="4"
                        onChange={this.handleChange('remarks')}
                        value={this.state.remarks}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{classes:{root: classes.label}}}
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


MeasureForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MeasureForm);