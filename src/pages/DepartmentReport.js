import React, {Component} from 'react';
import '../App.css';
import '../components/EditableRowTable'
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
import InputLabel from '@material-ui/core/InputLabel';


import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Notification from '../components/Snackbar';

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
        marginTop: theme.spacing.unit*0.5,
        width: '30%'
    },
    dense: {
        marginTop: 30,
    },
    menu: {
        width: 200,
    },
    label:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit*2,
        marginTop: theme.spacing.unit*3,
        width: '40%'
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

    table: {
        // minWidth: 1020,
        backgroundColor: '#E3F2FD',
    },
    head: {
        backgroundColor: '#1E88E5',

    },
    tableWrapper: {
        // overflowX: 'auto',
    },
});

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
            { value: '11',
                label: 'תקן מול איוש'},
            { value: '12',
                label: 'כמויות נלוות'},
            { value: '13',
                label: 'כמויות נלוות - מתוקן לאיוש'}
        ]
    },
    {
        value: '2',
        label: 'פעילות',
        items:[
            { value: '21',
                label: 'תקן איוש ונלוות2'},
            { value: '22',
                label: 'תקן איוש ונלוות23'},
            { value: '23',
                label: 'תקן איוש ונלוות32'},
            { value: '24',
                label: 'תקן איוש ונלוות32'},
            { value: '25',
                label: 'תקן איוש ונלוות32'},
            { value: '26',
                label: 'תקן איוש ונלוות32'},
            { value: '27',
                label: 'תקן איוש ונלוות32'},
            { value: '28',
                label: 'תקן איוש ונלוות32'}
        ]

    },
    {
        value: '3',
        label: 'חווית המטופל',
        items:[
            { value: '31',
                label: 'תקן איוש ונלוות2'},
            { value: '32',
                label: 'תקן איוש ונלוות23'},
            { value: '33',
                label: 'תקן איוש ונלוות32'},
            { value: '34',
                label: 'תקן איוש ונלוות32'}
        ]
    },
    {
        value: '4',
        label: 'הון אנושי',
        items:[
            { value: '41',
                label: 'תקן איוש ונלוות2'},
            { value: '42',
                label: 'תקן איוש ונלוות23'},
            { value: '43',
                label: 'תקן איוש ונלוות32'},
            { value: '44',
                label: 'תקן איוש ונלוות32'},
            { value: '45',
                label: 'תקן איוש ונלוות32'},
            { value: '46',
                label: 'תקן איוש ונלוות32'},
            { value: '47',
                label: 'תקן איוש ונלוות32'}
        ]
    },
    {
        value: '5',
        label: 'איכות ובטיחות',
        items:[
            { value: '51',
                label: 'מניעת זיהומים'},
            { value: '52',
                label: 'אומדן כאב'},
            { value: '53',
                label: 'בטיחות הטיפול'}
        ]
    },
    {
        value: '6',
        label: 'תשתית כלכלית ופיזית',
        items:[
            { value: '61',
                label: 'ניצולת חדרי ניתוח'},
            { value: '62',
                label: 'ניהול היבטי שכר'},
            { value: '63',
                label: 'צריכת חשמל ומים'},
            { value: '64',
                label: 'תחזוקת שבר מול מונעת'},
            { value: '65',
                label: 'היבטים תקציביים ופיננסיים'}
        ]
    },
    {
        value: '7',
        label: 'ניצולת חדרי ניתוח',
        items:[
            { value: '71',
                label: 'ניצולת חדרי ניתוח ( בוקר)'},
            { value: '72',
                label: 'פעילות חדרי ניתוח ( דחוף ותאגיד)'}
        ]
    },
    {
        value: '8',
        label: 'תשתית טכנולוגית',
        items:[
            { value: '81',
                label: 'איכות הקידוד הרפואי'},
            { value: '82',
                label: 'שדרוג תשתית טכנולוגית'},
            { value: '83',
                label: 'היקף השקעה במחשוב'}
        ]
    },
];

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

const columns = [
    {id: 1, numeric: false, disablePadding: true, label: 'קוד מדד'},
    {id: 2, numeric: false, disablePadding: true, label: 'שם מדד'},
    {id: 3, numeric: true, disablePadding: true, label: 'המרכז הרפואי איכילוב'},
    {id: 4, numeric: false, disablePadding: true, label: 'המרכז הרפואי אסף הרופא'},
    {id: 5, numeric: false, disablePadding: true, label: 'המרכז הרפואי בני ציון'},
    {id: 6, numeric: false, disablePadding: true, label: 'המרכז הרפואי נהריה'},
    {id: 7, numeric: false, disablePadding: true, label: 'המרכז הרפואי זיב'},
    {id: 8, numeric: false, disablePadding: true, label: 'המרכז הרפואי וולפסון'},
    {id: 9, numeric: false, disablePadding: true, label: 'המרכז הרפואי ברזילי'},
    {id: 10, numeric: false, disablePadding: true, label: 'המרכז הרפואי הלל יפה'},
    {id: 11, numeric: false, disablePadding: true, label: 'המרכז הרפואי פוריה'},
    {id: 12, numeric: false, disablePadding: true, label: 'המרכז הרפואי רמב"ם'},
    {id: 13, numeric: false, disablePadding: true, label: 'המרכז הרפואי שיבה'}
];

let baseColumns = [
    {id: 1, numeric: false, disablePadding: true, label: 'קוד מדד'},
    {id: 2, numeric: false, disablePadding: true, label: 'שם מדד'}];

const CustomTableCell = withStyles(theme => ({
    head: {
        // backgroundColor: theme.palette.common.black,
        color: theme.palette.common.black,
        fontSize: 20,
        textAlign: 'right'
    },
    body: {
        fontSize: 15,
    },
}))(TableCell);

class DepartmentMeasure extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onExitClick = this.onExitClick.bind(this);
        this.state = {
            hospital_type: '',
            business_topic: '',
            showSnackbar: false,
            open: false,
            columns: [{id: 1, numeric: false, disablePadding: true, label: 'קוד מדד'},
                {id: 2, numeric: false, disablePadding: true, label: 'שם מדד'}]
        }
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
        }, ()=>{
            if (name === 'hospital_type'){
                this.requestColumnsByHospitalType(this.state.hospital_type);
            }
        });
    };



    processColumns(columns){
        return columns.map(el=>{
           return {
               id: el.hosp_code,
               label: el.name,
               numeric: false, disablePadding: true
           }
        });
    }

    requestColumnsByHospitalType(hospitalCode){
        let url = `hospitals/${hospitalCode}/`;
        const Columns = RestAPI().get(url, {withCredentials: true});
        Columns.then(result => {
            let items = result.data.items;
            let relevantType = `type_${hospitalCode}`;

            let columns = items[0][relevantType];

            let newColumns =baseColumns;
            if(columns){
                let relevantColumns = this.processColumns(columns);

                newColumns = baseColumns.concat(relevantColumns);
            }
            this.setState((prevState, props) => {
                return {
                    columns: newColumns
                };
            })
        }).catch((error) => {
            //todo if not successful, display an error with toaster
                this.setState((prevState, props) => {
                    return {

                        showSnackbar: true
                    };
                });
            //
            // let fakeItems = [{'_id': {'$oid': '5c6eb21c326f4204203f2432'}, 'type_1': [
            //     {'hosp_code': '01103', 'name': 'ביה"ח אסף הרופה', 'type': '1'},
            //     {'hosp_code': '01108', 'name': 'ביה"ח ברזילי', 'type': '1'},
            //     {'hosp_code': '01204', 'name': 'ביה"ח בני ציון', 'type': '1'},
            //     {'hosp_code': '01107', 'name': 'ביה"ח נהריה', 'type': '1'},
            //     {'hosp_code': '01106', 'name': 'ביה"ח הלל יפה', 'type': '1'},
            //     {'hosp_code': '01109', 'name': 'ביה"ח פוריה', 'type': '1'},
            //     {'hosp_code': '01102', 'name': 'ביה"ח רמב"ם', 'type': '1'},
            //     {'hosp_code': '01201', 'name': 'ביה"ח איכילוב', 'type': '1'},
            //     {'hosp_code': '01104', 'name': 'ביה"ח וולפסון', 'type': '1'}, {'hosp_code': '01105', 'name': 'ביה"ח זיו', 'type': '1'}, {'hosp_code': '01101', 'name': 'ביה"ח שיבה', 'type': '1'}]}];
            //
            // let relevantType = `type_${hospitalCode}`;
            //
            // let columns = fakeItems[0][relevantType];
            //
            // let newColumns = baseColumns;
            // if(columns){
            //     let relevantColumns = this.processColumns(columns);
            //
            //     console.log(relevantColumns, 'RELEVANT COLUMNS')
            //
            //     newColumns = baseColumns.concat(relevantColumns);
            // }
            // this.setState((prevState, props) => {
            //     return {
            //         columns: newColumns
            //     };
            // })
        });
    }

    handleClose=(event, reason)=>{
        this.setState({showSnackbar:false})
    };

    renderNotificationSnackbar=()=>{


            return <Notification message='נא לבחור את הסוג בית חולים' variant='error' showSnackbar={this.state.showSnackbar} onClose={this.handleClose}/>

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

        let {columns} = this.state;

        return (
            <div className="main-content">
                <div>
                    {this.state.showSnackbar? this.renderNotificationSnackbar(): null}
                </div>
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

                <InputLabel className={classes.label} required htmlFor="component-simple">סוג בית חולים</InputLabel>
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
            </FormGroup>
                <Table className={classes.table} aria-labelledby="tableTitle">
                <TableHead>
                    <TableRow>
                        {columns.map(row => {
                            return (
                                <CustomTableCell
                                    key={row.id}
                                    padding='default'
                                >
                                    {row.label}
                                </CustomTableCell>
                            );
                        }, this)}
                    </TableRow>
                </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>1.02.01
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>מספר מיטות תקן
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>
                                <TextField
                                    id="year"
                                    name="year"
                                    variant="outlined"
                                    required

//                                    className={classes.textField}

                                    margin="normal"
                                    onChange={this.handleChange('year')}
                                    value={this.state.year}
                                >
                                </TextField>
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>
                                <TextField
                                    id="year"
                                    name="year"
                                    variant="outlined"
                                    required

//                                    className={classes.textField}

                                    margin="normal"
                                    onChange={this.handleChange('year')}
                                    value={this.state.year}
                                >
                                </TextField>
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>
                                <TextField
                                    id="year"
                                    name="year"
                                    variant="outlined"
                                    required

//                                    className={classes.textField}

                                    margin="normal"
                                    onChange={this.handleChange('year')}
                                    value={this.state.year}
                                >
                                </TextField>
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>
                                <TextField
                                    id="year"
                                    name="year"
                                    variant="outlined"
                                    required

//                                    className={classes.textField}

                                    margin="normal"
                                    onChange={this.handleChange('year')}
                                    value={this.state.year}
                                >
                                </TextField>
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>
                                <TextField
                                    id="year"
                                    name="year"
                                    variant="outlined"
                                    required

//                                    className={classes.textField}

                                    margin="normal"
                                    onChange={this.handleChange('year')}
                                    value={this.state.year}
                                >
                                </TextField>
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>
                                <TextField
                                    id="year"
                                    name="year"
                                    variant="outlined"
                                    required

//                                    className={classes.textField}

                                    margin="normal"
                                    onChange={this.handleChange('year')}
                                    value={this.state.year}
                                >
                                </TextField>
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>
                                <TextField
                                    id="year"
                                    name="year"
                                    variant="outlined"
                                    required

//                                    className={classes.textField}

                                    margin="normal"
                                    onChange={this.handleChange('year')}
                                    value={this.state.year}
                                >
                                </TextField>
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>
                                <TextField
                                    id="year"
                                    name="year"
                                    variant="outlined"
                                    required

//                                    className={classes.textField}

                                    margin="normal"
                                    onChange={this.handleChange('year')}
                                    value={this.state.year}
                                >
                                </TextField>
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>
                                <TextField
                                    id="year"
                                    name="year"
                                    variant="outlined"
                                    required

//                                    className={classes.textField}

                                    margin="normal"
                                    onChange={this.handleChange('year')}
                                    value={this.state.year}
                                >
                                </TextField>
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>
                                <TextField
                                    id="year"
                                    name="year"
                                    variant="outlined"
                                    required

//                                    className={classes.textField}

                                    margin="normal"
                                    onChange={this.handleChange('year')}
                                    value={this.state.year}
                                >
                                </TextField>
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>
                                <TextField
                                    id="year"
                                    name="year"
                                    variant="outlined"
                                    required

//                                    className={classes.textField}

                                    margin="normal"
                                    onChange={this.handleChange('year')}
                                    value={this.state.year}
                                >
                                </TextField>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
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

            </div>
        );
    }
}

DepartmentMeasure.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DepartmentMeasure);