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
        InputLabelProps:{

        }
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
        'value': '0',
        'label': '',
    },
    {
        'value': '1',
        'label': 'אחוזים %',
    },
    {
        'value': '2',
        'label': 'שקלים חדשים ₪',
    },
    {   'value': '3',
        'label': 'ללא יחידת מידה',
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
            to_date: moment().format(),
            target_default: '',
            remarks: '',
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
        e.preventDefault();
        this.props.handleFormSubmit(this.state);
    }

    onExitClick(){
        alert('Button click')
        //todo
    }

    render() {

        const { classes, type, mode, data } = this.props;

        let isReadonly = mode === 'update';
        let isReq = mode === 'update';

        return (
            <>

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
                <FormGroup grid>

                    <FormControlLabel
                        control={
                            <Switch
                                id="is_division"
                                name="is_division"
                                checked={this.state.is_division}
                                onChange={this.handleChangeSwitch('is_division')}
                                value="is_division"
                                color="primary"
                            />
                        }
                        label="האם מדד חטיבה"
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

                    disabled={isReadonly}

                />
                <TextField
                    id="measure_name"
                    name="measure_name"
                    required
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
                    required
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



                />
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
                    required
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
                    id="business_topic"
                    name="business_topic"
                    required
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
                    required
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
                    required
                    label="יחידת מידה"
                    select
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange('measure_unit')}
                    value={this.state.measure_unit}

                    SelectProps={{
                        native: true,
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                >
                    {meas_unit.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>

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


                </FormGroup>


                <TextField
                    id="digit_num"
                    name="digit_num"
                    required
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
                        step: 1
                    }}

                />

                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        id="from_date"
                        name="from_date"
                        format="D/MM/YYYY"
                        label='מתאריך'
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


                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        id="to_date"
                        name="to_date"
                        format="D/MM/YYYY"
                        label="עד תאריך"

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
            </form>
            </>
        );
    }
}

MeasureForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MeasureForm);