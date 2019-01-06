import React, {Component} from 'react';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import RestAPI from '../api';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import Button from '@material-ui/core/Button';
import MaterialUIPickers from './DateTimePickerComp';
import AssignMeasures from './AssignMeasures';
//import Calendar from 'react-input-calendar'
import SaveIcon from '@material-ui/icons/Save';
import { DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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

        width: 400,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    group: {
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
    },
    {
        value: '1',
        label: 'תקן איוש ונלוות',
    },
    {
        value: '2',
        label: 'פעילות',
    },
    {
        value: '3',
        label: 'חווית המטופל',
    },
    {
        value: '4',
        label: 'הון אנושי',
    },
    {
        value: '5',
        label: 'איכות ובטיחות',
    },
    {
        value: '6',
        label: 'תשתית כלכלית ופיזית',
    },
    {
        value: '7',
        label: 'ניצולת חדרי ניתוח',
    },
    {
        value: '8',
        label: 'תשתיתטכנולוגית',
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

class Form extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFormByType = this.getFormByType.bind(this);
        console.log(props.type);//measure/version
        let stateByType = {
            'version': {
                version_number: '',
                version_name: '',
                version_desc: '',
                version_type: '',
                hospital_type: '',
                active: true,
                measure_names: '',
                measure: [],
                business_topic: '',
                retro: true,
                year: ''
            },
            'measure': {
                measure_code: '',
                measure_name: '',
                measure_desc: '',
                criteria_inclusion: '',
                removal_criteria: '',
                numerator: '',
                denominator: '',
                hospital_type: '',
                business_topic: '',
                measure_type: '',
                measuring_frequency: '',
                measure_unit: '',
                digit_num: '',
                separate_thousands: true,
                active: true,
                from_date: moment().format(),
                to_date: moment().format(),
                target_default: '',
                remarks: '',
            }
        };

        this.state = stateByType[props.type];

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

    
    getFormByType(type, classes, mode, data){
        let form = {
            'version': function(type, classes, mode, data){
                let isReadonly = mode === 'update';
                let isReq = mode === 'update';
                return (
                    <>
                    <FormGroup grid>



                        <FormControlLabel
                            control={
                                <Switch
                                    id="active"
                                    name="active"
                                    checked={this.state.active}
                                    onChange={this.handleChangeSwitch('active')}
                                    value='active'
                                    color="primary"
                                />
                            }
                            label="פעיל"
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    id="retro"
                                    name="retro"
                                    checked={this.state.retro}
                                    onChange={this.handleChangeSwitch('retro')}
                                    value="retro"
                                    color="primary"
                                />
                            }
                            label="אפשר עדכון דיווח קודם"
                        />

                    </FormGroup>

                    <TextField
                        id="year"
                        name="year"

                        helperText='שנה'
                        className={classNames(classes.textField)}
                        margin="normal"
                        variant="outlined"
                        type="date"
                        onChange={this.handleChange('year')}
                        value={this.state.year}
                    />

                    <TextField
                        id="version_number"
                        name="version_number"
                        required={!isReq}
                        label="מספר גרסה"
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
                    />
                    <TextField
                        id="version_name"
                        name="version_name"
                        required={!isReq}
                        label="שם גרסה"
                        className={classes.textField}
                        margin="normal"

                        variant="outlined"
                        onChange={this.handleChange('version_name')}
                        value={this.state.version_name}
                    />

                    <TextField
                        id="hospital_type"
                        name="hospital_type"
                        required={!isReq}
                        readonly = {isReadonly}
                        disabled={isReadonly}
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

                    <TextField
                        id="version_desc"
                        name="version_desc"

                        label="תיאור גרסה"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('version_desc')}
                        value={this.state.version_desc}

                    />
                    <TextField
                        id="version_type"
                        name="version_type"
                        select
                        variant="outlined"
                        required={!isReq}
                        label="סוג גרסה"
                        className={classes.textField}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                        onChange={this.handleChange('version_type')}
                        value={this.state.version_type}

                    >
                        {vers_type.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>

                     <TextField
                        id="business_topic"
                        name="business_topic"
                        variant="outlined"
                        select
                        label="נושא עסקי"
                        className={classes.textField}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                        onChange={this.handleMeasure('business_topic')}
                        value={this.state.business_topic}
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
                    </>
                );
            },
            'measure': function(type, classes, mode, data){
                let isReadonly = mode === 'update';
                let isReq = mode === 'update';
                return (
                    <>
                     <FormGroup grid>

                         <FormControlLabel
                             control={
                                <Switch
                                    id="separate_thousands"
                                    name="separate_thousands"
                                    checked={this.state.separate_thousands}
                                    onChange={this.handleChangeSwitch('separate_thousands')}
                                    value="separate_thousands"
                                    color="primary"
                                />
                            }
                            label="מפריד אלפים"
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    id="active"
                                    name="active"
                                    checked={this.state.active}
                                    onChange={this.handleChangeSwitch('active')}
                                    value="active"
                                    color="primary"
                                />
                            }
                            label="פעיל"
                        />
                     </FormGroup>




                    <TextField
                        id="measure_code"
                        name="measure_code"
                        required={!isReq}
                        label="קוד מדד"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('measure_code')}
                        value={this.state.measure_code}
                        readonly = {isReadonly}
                        disabled={isReadonly}
                    />
                    <TextField
                        id="measure_name"
                        name="measure_name"
                        required={!isReq}
                        label="שם מדד"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('measure_name')}
                        value={this.state.measure_name}
                    />
                    <TextField
                        id="measure_desc"
                        name="measure_desc"
                        required={!isReq}
                        label="תיאור מדד"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('measure_desc')}
                        value={this.state.measure_desc}

                    />
                    <TextField
                        id="criteria_inclusion"
                        name="criteria_inclusion"

                        label="קריטריונים להכללה"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('criteria_inclusion')}
                        value={this.state.criteria_inclusion}

                    />
                    <TextField
                        id="removal_criteria"
                        name="removal_criteria"

                        label="קריטריונים להוצאה"
                        className={classes.textField}
                        margin="normal"

                        variant="outlined"
                        onChange={this.handleChange('removal_criteria')}
                        value={this.state.removal_criteria}

                    />
                    <TextField
                        id="numerator"
                        name="numerator"

                        label="מונה"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('numerator')}
                        value={this.state.numerator}
                        type="number"
                        inputProps={{
                            min: 1,
                            step: 1
                        }}

                    />
                    <TextField
                        id="denominator"
                        name="denominator"

                        label="מכנה"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('denominator')}
                        value={this.state.denominator}
                        type="number"
                        inputProps={{
                            min: 1,
                            step: 1
                        }}

                    />
                    <TextField
                        id="hospital_type"
                        name="hospital_type"
                        required={!isReq}
                        readonly = {isReadonly}
                        disabled={isReadonly}
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
                    <TextField
                        id="business_topic"
                        name="business_topic"
                        required={!isReq}
                        variant="outlined"
                        select
                        label="נושא עסקי"
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

                    >
                        {topic_list.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        id="measure_type"
                        name="measure_type"
                        required={!isReq}
                        variant="outlined"
                        select
                        label="סוג מדד"
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

                    >
                        {meas_type.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        id="measuring_frequency"
                        name="measuring_frequency"
                        variant="outlined"
                        select
                        label="תדירות מדידה"
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
                    <TextField
                        id="measure_unit"
                        name="measure_unit"
                        required={!isReq}
                        label="יחידת מידה"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('measure_unit')}
                        value={this.state.measure_unit}
                        type="number"
                        inputProps={{
                            min: 1,
                            step: 1
                        }}

                    />
                    <TextField
                        id="digit_num"
                        name="digit_num"
                        required={!isReq}
                        label="מספר ספרות אחרי הנקודה"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('digit_num')}
                        value={this.state.digit_num}
                        type="number"
                        inputProps={{
                            min: 1,
                            step: 1
                        }}



                    />

                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            id="from_date"
                            name="from_date"
                            format="D/MM/YYYY"
                            helperText='מתאריך'
                            className={classNames(classes.textField)}
                            margin="normal"
                            variant="outlined"
                            value={this.state.from_date}
                            onChange={this.handleDateChange('from_date')}
                            rightArrowIcon={<ChevronRightIcon />}
                            leftArrowIcon={<ChevronLeftIcon />}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </MuiPickersUtilsProvider>


                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            id="to_date"
                            name="to_date"
                            format="D/MM/YYYY"
                            helperText="עד תאריך"
                            className={classNames(classes.textField)}
                            margin="normal"
                            variant="outlined"
                            value={this.state.to_date}
                            onChange={this.handleDateChange('to_date')}
                            rightArrowIcon={<ChevronRightIcon />}
                            leftArrowIcon={<ChevronLeftIcon />}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </MuiPickersUtilsProvider>


                    <TextField
                        id="target_default"
                        name="target_default"
                        label="יעד עיסקי"

                        onChange={this.handleChange('target_default')}
                        value={this.state.target_default}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        type="number"
                        inputProps={{
                            min: 0,
                            step: 5
                        }}

                    />

                    <TextField
                        id="remarks"
                        name="remarks"
                        label="הערות"

                        rowsMax="4"
                        onChange={this.handleChange('remarks')}
                        value={this.state.remarks}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />

                    </>
                );
            }
        };
        return form[type].apply(this, ['', classes, mode, data]);
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

    handleDateChange = name => date => {
        this.setState({  [name]: moment(date).format('YYYY-MM-DD')});
    };

    handleSubmit(e){
        e.preventDefault();
        this.props.handleFormSubmit(this.state);
    }

    onExitClick(){
     alert('Button click')
        //todo
    }

    render() {

        const { classes, type, mode, data } = this.props;

        let components = this.getFormByType(type, classes, mode, data);
        return (

            <form className={classes.container} noValidate autoComplete="off"
                  onSubmit={this.handleSubmit}

            >
                {/*<Button variant="contained" size="small" type="submit" className="submit-button-form">*/}
                    {/*<SaveIcon/>*/}
                    {/*Save*/}
                {/*</Button>*/}
                <div>
                <input class='submit-button-form' type="submit" value="שמירה" />
                <input class="submit-button-form" value="יציאה"/>
                </div>
                {components}

            </form>
        );

    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Form);