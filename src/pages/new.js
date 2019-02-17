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
import InputLabel from '@material-ui/core/InputLabel';


import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
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
        width: '50%'
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
    {id: 1, numeric: true, disablePadding: true, label: 'קוד מדד'},
    {id: 2, numeric: true, disablePadding: true, label: 'שם מדד'},
    {id: 3, numeric: true, disablePadding: true, label: 'מדד לאומי שנה קודמת'},
    {id: 4, numeric: false, disablePadding: true, label: 'מדד לאומי חדש'},
    {id: 5, numeric: false, disablePadding: true, label: 'ממוצע המרכזים הרפואיים הממשלתיים שנה קודמת'},
    {id: 6, numeric: false, disablePadding: true, label: 'ממוצע המרכזים הרפואיים הממשלתיים חדש'}
]

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
                <InputLabel className={classes.label} required htmlFor="component-simple">שנה</InputLabel>
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
            </FormGroup>

            <FormGroup grid>
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
                                    padding={row.disablePadding ? 'none' : 'default'}
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
                            }}}>124
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>
                                <TextField
                                    id="year"
                                    name="year"
                                    variant="outlined"
                                    required

                                    className={classes.textField}

                                    margin="normal"
                                    onChange={this.handleChange('year')}
                                    value={this.state.year}
                                >
                                </TextField>
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>123
                            </TableCell>
                            <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                                borderColor: 'red'
                            }}}>
                                <TextField
                                    id="year"
                                    name="year"
                                    variant="outlined"
                                    required

                                    className={classes.textField}

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

NationalMesureUpdate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NationalMesureUpdate);