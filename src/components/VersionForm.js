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
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    group: {
    },
    label:{
        marginRight: '20px',
        right: '15px',
        animated: {
            right: 0
        }
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
            }
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
                <input  class='submit-button-form' type="submit" value="שמירה" />
                <input class="submit-button-form" value="יציאה"/>
            </div>
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
                    InputLabelProps={{classes:{root: classes.label}}}

                />
                <TextField
                    id="version_name"
                    name="version_name"
                    required
                    label="שם גרסה"
                    className={classes.textField}
                    margin="normal"

                    variant="outlined"
                    onChange={this.handleChange('version_name')}
                    value={this.state.version_name}
                    InputLabelProps={{classes:{root: classes.label}}}
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


                <TextField
                    id="version_type"
                    name="version_type"
                    select
                    variant="outlined"
                    required
                    label="סוג גרסה"
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
                    required
                    select
                    label="נושא עסקי"
                    className={classes.textField}
                    SelectProps={{
                        native: true,
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    InputLabelProps={{classes:{root: classes.label}}}
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
            </form>
            </>
        );
    }
}

VersionForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VersionForm);