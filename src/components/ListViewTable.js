import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import RestAPI from '../api';


import EnhancedTableToolbar from './EnhancedTableToolbar';

import moment from 'moment-timezone';

let counter = 0;

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}



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



class ListViewTable extends React.Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { columns, onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                    </TableCell>
                    {columns.map(row => {
                        return (
                            <CustomTableCell
                                key={row.id}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </CustomTableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

ListViewTable.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,

};

const styles = theme => ({
    root: {
        width: '99%',
        marginTop: theme.spacing.unit * 3,
         // fontFamily: 'Georgia'
    },
    table: {
        minWidth: 1020,
        backgroundColor: '#E3F2FD',
    },
    head: {
        backgroundColor: '#1E88E5',

    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: null,
            page: 0,
            rowsPerPage: 5
        };
    }

    componentDidUpdate(prevProps) {
        if ( this.props.data.length && this.props.data.length !==prevProps.data.length){
            this.setState((prevState, props) => {
                return {
                    rowsPerPage: this.props.data.length
                };
            });
        }
    }

    handleSearch = searchWord=> {
       this.props.handleSearch(searchWord);
    };


    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };


    handleClick = (event, id) => {
        const { selected } = this.state;
        let newSelected = id;
        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected === id;

    timestampToDate= timestamp=>{
        return moment.unix(timestamp/1000).tz('Asia/Jerusalem').format("DD/MM/YYYY");
    };

    isActive = isActive => isActive === true? 'פעיל': 'לא פעיל';


    setSelectedHandler=(e, id)=>{
        e.preventDefault();
        // console.log(event);
        console.log(e, id);
        this.props.setSelectedHandler(id);
    };

    elementToRow (columns, obj){
        let row = [];
        columns.forEach(el=>{
            row.push(obj[el]);
        });
        return row;
    }

    render() {
        const { classes, data, columns } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const numSelected = 1;

        //TODO take columns names
        let columnsNames = columns.map(el=>el.id);
        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar handleSearch={this.handleSearch}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">

                        <ListViewTable
                            numSelected={numSelected}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                            columns={this.props.columns}

                        />
                        <TableBody>

                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((n, index) => {
                                    let id = n._id['$oid'];
                                    const isSelected = this.isSelected(id);

                                    let row = this.elementToRow(columnsNames, n);
                                    return (
                                        <TableRow

                                            hover
                                            onClick={event => this.handleClick(event,id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox" >
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={event => this.setSelectedHandler(event, n)}
                                                color="primary"
                                            />
                                            </TableCell>
                                            {row.map((el, index) =>
                                                <TableCell component='th' scope='row' padding='none' numeric>{columns[index].isActive? this.isActive(el): columns[index].isTimestamp? this.timestampToDate(el): el}</TableCell>
                                            )}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell style={{body: {
                                            fontSize: 20
                                          }}} colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    labelRowsPerPage='שורות לעמוד'
                    labelDisplayedRows={({from, to, count})=>{
                        let f = 'מ'
                        let t ='עד'
                        let c='סכום'
                        return `${from}-${to} ${c} ${count}`
                    }}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
