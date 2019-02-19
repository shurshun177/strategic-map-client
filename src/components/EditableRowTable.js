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
});

class EditableRowTable extends Component  {
    render() {
        const { classes, type, mode, data } = this.props;
        return (
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
        );
    }
}

EditableRowTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditableRowTable);