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
import EditableRowTable from '../components/EditableRowTable';

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
    cell: {
        width: '90%',
        marginRight: theme.spacing.unit*3
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

const columns = [
    {id: 1, numeric: false, disablePadding: true, label: 'קוד מדד'},
    {id: 2, numeric: false, disablePadding: true, label: 'שם מדד'},
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
            national_measure: '',
            average_measure: '',
            elements: [],
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
        }, ()=>{
            if (this.state.hospital_type !== '' && this.state.year !== ''){
                this.requestNationalAverages(this.state.year, this.state.hospital_type);
            }
        });
    };


    requestNationalAverages =(year, hospitalType)=>{
        let url = `average/${hospitalType}/${year}/`;
        const NationalAverages = RestAPI().get(url, {withCredentials: true});
        NationalAverages.then(result => {
            // {"items": [{"_id": {"$oid": "5c27ed38a933f91dc178076c"}, "measure_name": "name2"}]}
            this.setState((prevState, props) => {
                return {
                    elements: result.data.items
                };
            })
        }).catch((error) => {
            //todo if not successful, display an error with toaster
            alert('Hospital type and business topic must be selected')

            // let fakeItems = [
            //     {'_id': {'$oid': '5c3f323c326f420848fbe1bf'},
            //     'measure_code': '978.01.90', 'measure_name':
            //         'מדד הראשון',
            //         '2019':
            //             [{'national_measure': '484', 'create_data': {'$date': 1551113757980}, 'create_user': '', 'change_date': {'$date': 1551169120200}, 'change_user': ''},
            //
            //                 {'average_measure': '196', 'create_data': {'$date': 1551113757980}, 'create_user': '', 'change_date': '', 'change_user': ''}
            //
            //
            //             ]},
            //     {'_id': {'$oid': '5c3f32ab326f420848fbe1c1'}, 'measure_code': '366.63.53', 'measure_name': 'מדד השני', '2019': [{'national_measure': '484', 'create_data': {'$date': 1551169583896}, 'create_user': '', 'change_date': '', 'change_user': ''}, {'average_measure': 'None', 'create_data': {'$date': 1551169583896}, 'create_user': '', 'change_date': '', 'change_user': ''}]}, {'_id': {'$oid': '5c3f32fa326f420848fbe1c2'}, 'measure_code': '297.58.61', 'measure_name': 'מדד השלישי'}, {'_id': {'$oid': '5c3f3347326f420848fbe1c3'}, 'measure_code': '308.16.99', 'measure_name': 'מדד המבחן'}, {'_id': {'$oid': '5c51a830326f423ec8dd9149'}, 'measure_code': '366.63.53.1', 'measure_name': 'מדד השני'}, {'_id': {'$oid': '5c52c923326f423c7cf3cfba'}, 'measure_code': '12.23.345', 'measure_name': 'dshjghk'}, {'_id': {'$oid': '5c616f2a326f423de8900d71'}, 'measure_code': '85.06.16', 'measure_name': 'fallen angel'}, {'_id': {'$oid': '5c617087326f423de8900d72'}, 'measure_code': '123245', 'measure_name': 'fgsdgsdfg'}, {'_id': {'$oid': '5c619025326f422d987f5934'}, 'measure_code': '1978.01.90', 'measure_name': 'מדד הראשון'}, {'_id': {'$oid': '5c6190e5326f422d987f5935'}, 'measure_code': '978.01.90.1', 'measure_name': 'מדד הראשון'}, {'_id': {'$oid': '5c619121326f422d987f5936'}, 'measure_code': '978.01.90.2', 'measure_name': 'מדד הראשון'}, {'_id': {'$oid': '5c7267d0326f4232b4c6541d'}, 'measure_code': '12.144.169', 'measure_name': 'fdg'}]
            //
            // this.setState((prevState, props) => {
            //     return {
            //         elements: fakeItems
            //     };
            // })

        });
    };



    handleDateChange = name => date => {
        this.setState({  [name]: moment(date).format('YYYY-MM-DD')});
    };

    handleSubmit(e){
        e.preventDefault();
        //TODO implement save
    }


    onDialogCancel = () => {
        this.setState({ open: false });
    };

    onDialogSave = ()=>{
        this.setState({ open: false }, ()=>{
            // this.props.handleFormSubmit(this.state);
        });

    };

    onExitClick(e){
        e.preventDefault();
        //TODO check if state is changed
        this.setState({ open: true });
    };

    render() {

        const { classes, type, mode, data } = this.props;
        let {elements} = this.state;

        return (
            <div className="main-content">
            <form className={classes.container} noValidate autoComplete="off"
                  onSubmit={this.handleSubmit}
            >

            <div>
                <Button variant="outlined" color='primary' size="large" type="submit" className={classes.button} >
                    שמירה
                </Button>
                <Button variant="outlined" color='primary' size="large" type="submit" className={classes.button} >
                    חזרה לנתונים השמורים
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
                        {
                            elements.map(element=>{
                                return <EditableRowTable element={element} currentYear={this.state.year}/>
                            })
                        }
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