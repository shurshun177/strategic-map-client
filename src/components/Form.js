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

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    group: {
        flexDirection: "row"
    }
});

const hosp_type = [
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
                active: '',
                measure: []
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
                separate_thousands: '',
                active: '',
                from_date: '',
                to_date: '',
                target_default: '',
                remarks: '',
            }
        };

        this.state = stateByType[props.type];

    }

    getFormByType(type, classes){
        let form = {
            'version': function(type, classes){
                return (
                    <>
                    <TextField
                        id="version_number"
                        name="version_number"
                        required
                        label="מספר גרסה"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange('version_number')}
                    />
                    <TextField
                        id="version_name"
                        name="version_name"
                        required
                        label="שם גרסה"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange('version_name')}
                    />

                    <TextField
                        id="hospital_type"
                        name="hospital_type"
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
                        required
                        label="תיאור גרסה"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange('version_desc')}

                    />
                    <TextField
                        id="version_type"
                        name="version_type"
                        select
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

                    >
                        {vers_type.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>

                    <TextField
                        id="measure"
                        name="measure"
                        required
                        label="מדדים"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange('measure')}

                    />

                    <FormGroup row>



                        <FormControlLabel
                            control={
                                <Switch
                                    id="active"
                                    name="active"
                                    checked={this.state.checkedA}
                                    onChange={this.handleChange('active')}
                                    value="active"
                                />
                            }
                            label="פעיל"
                        />
                    </FormGroup>


                    </>
                );
            },
            'measure': function(type, classes){

                return (
                    <>
                    <TextField
                        id="measure_code"
                        name="measure_code"
                        required
                        label="קוד מדד"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange('measure_code')}
                    />
                    <TextField
                        id="measure_name"
                        name="measure_name"
                        required
                        label="שם מדד"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange('measure_name')}
                    />
                    <TextField
                        id="measure_desc"
                        name="measure_desc"
                        required
                        label="תיאור מדד"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange('measure_desc')}

                    />
                    <TextField
                        id="criteria_inclusion"
                        name="criteria_inclusion"
                        required
                        label="קריטריונים להכללה"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange('criteria_inclusion')}

                    />
                    <TextField
                        id="removal_criteria"
                        name="removal_criteria"
                        required
                        label="קריטריונים להוצאה"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange('removal_criteria')}

                    />
                    <TextField
                        id="numerator"
                        name="numerator"
                        required
                        label="מונה"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange('numerator')}

                    />
                    <TextField
                        id="denominator"
                        name="denominator"
                        required
                        label="מכנה"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange('denominator')}

                    />
                    <TextField
                        id="hospital_type"
                        name="hospital_type"
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
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange('measure_unit')}

                    />
                    <TextField
                        id="digit_num"
                        name="digit_num"
                        required
                        label="מספר ספרות אחרי הנקודה"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange('digit_num')}

                    />


                    <FormGroup row>

                        <FormControlLabel
                            control={
                                <Switch
                                    id="separate_thousands"
                                    name="separate_thousands"
                                    checked={this.state.checkedA}
                                    onChange={this.handleChange('separate_thousands')}
                                    value="separate_thousands"
                                />
                            }
                            label="מפריד אלפים"
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    id="active"
                                    name="active"
                                    checked={this.state.checkedA}
                                    onChange={this.handleChange('active')}
                                    value="active"
                                />
                            }
                            label="פעיל"
                        />



                    </FormGroup>

                    <TextField
                        id="from_date"
                        name="from_date"
                        label="מתאריך"
                        className={classNames(classes.textField)}
                        margin="normal"
                        type="date"
                        onChange={this.handleChange('from_date')}
                    />

                    <TextField
                        id="to_date"
                        name="to_date"
                        label="עד תאריך"
                        className={classNames(classes.textField)}
                        margin="normal"
                        type="date"
                        onChange={this.handleChange('to_date')}

                    />

                    <TextField
                        id="target_default"
                        name="target_default"
                        label="יעד"
                        multiline
                        rowsMax="4"
                        value={this.state.multiline}
                        onChange={this.handleChange('target_default')}
                        className={classes.textField}
                        margin="normal"

                    />

                    <TextField
                        id="remarks"
                        name="remarks"
                        label="הערות"
                        multiline
                        rowsMax="4"
                        value={this.state.multiline}
                        onChange={this.handleChange('remarks')}
                        className={classes.textField}
                        margin="normal"
                    />
                    </>
                );
            }
        };
        return form[type].apply(this, ['', classes]);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit(e){
        e.preventDefault();
        console.log(this);
        console.log(this);
        this.props.handleFormSubmit(this.state);
    }

    render() {
        const { classes, type } = this.props;

        let components = this.getFormByType(type, classes);
        return (
            <form className={classes.container} noValidate autoComplete="off"
                  onSubmit={this.handleSubmit}
            >{components}
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Form);