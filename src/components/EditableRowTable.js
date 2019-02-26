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



class EditableRowTable extends Component  {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            national_measure: '',
            average_measure: ''
        };
    }

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

    getNationalMeasure= element => {
        console.log(element, this.props.currentYear, );
        let {currentYear} = this.props;
        let values = element[currentYear];

        if (values && values.length >0){
            let national_measure = values[0].national_measure;
            // this.setState({national_measure});
            return national_measure;
        }
    };

    getAverageMeasure = element => {
        console.log(element, this.props.currentYear, );
        let {currentYear} = this.props;
        let values = element[currentYear];

        if (values && values.length >0){
            let national_measure = values[1].average_measure;
            // this.setState({national_measure});
            return national_measure;
        }
    };


    getNationalMeasurePrevYear= element => {
        let {currentYear} = this.props;
        let prevYear = moment(currentYear).subtract(1,'years').format('YYYY');

        let values = element[prevYear];

        if (values && values.length >0){
            let national_measure = values[0].national_measure;
            // this.setState({national_measure});
            return national_measure;
        }
    };

    getAverageMeasurePrevYear = element => {
        console.log(element, this.props.currentYear, );
        let {currentYear} = this.props;
        let prevYear = moment(currentYear).subtract(1,'years').format('YYYY');

        let values = element[prevYear];

        if (values && values.length >0){
            let national_measure = values[1].average_measure;
            // this.setState({national_measure});
            return national_measure;
        }
    };
    render() {
        const { classes, element, currentYear } = this.props;
        return (
            <TableRow>
                <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                    borderColor: 'red'
                }}}>{element.measure_code}
                </TableCell>
                <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                    borderColor: 'red'
                }}}>{element.measure_name}
                </TableCell>
                <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                    borderColor: 'red'
                }}}>{this.getNationalMeasurePrevYear(element)}
                </TableCell>
                <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                    borderColor: 'red'
                }}}>
                    <TextField
                        id="national_measure"
                        name="national_measure"
                        variant="outlined"
                        required

                        //                                    className={classes.textField}
                        className={classes.cell}
                        margin="normal"
                        onChange={this.handleChange('national_measure')}
                        value={this.getNationalMeasure(element)}
                    >
                    </TextField>
                </TableCell>
                <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                    borderColor: 'red'
                }}}>{this.getAverageMeasurePrevYear(element)}
                </TableCell>
                <TableCell component='th' scope='row' padding='none' numeric style={{root: {
                    borderColor: 'red'
                }}}>
                    <TextField
                        id="average_measure"
                        name="average_measure"
                        variant="outlined"
                        required

                        //                                    className={classes.textField}
                        className={classes.cell}
                        margin="normal"
                        onChange={this.handleChange('average_measure')}
                        value={this.getAverageMeasure(element)}
                    >
                    </TextField>
                </TableCell>
            </TableRow>
        );
    }
}

EditableRowTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditableRowTable);