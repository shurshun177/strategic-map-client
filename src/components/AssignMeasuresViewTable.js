import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

class AssignUsersViewTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'id',
            sortDir: 'ASC',
            isAllChecked: false,
            currentSelected: null
        };
    }

    setSort = key => {
        const {sortBy, sortDir} = this.state;
        if (sortBy === key) {
            this.setState({sortDir: sortDir === 'DESC' ? 'ASC' : 'DESC'});
        } else {
            this.setState({sortBy: key, sortDir: 'ASC'});
        }
    };

    sortTable = (a, b) => {
        const {sortBy, sortDir} = this.state;
        let aVal = a.User[sortBy];
        let bVal = b.User[sortBy];
        if (sortDir === 'ASC') {
            return (aVal > bVal ? -1 : (aVal < bVal ? 1 : 0));
        } else {
            return (aVal < bVal ? -1 : (aVal > bVal ? 1 : 0));
        }
    };


    isElementSelected = el => {
        return this.props.selectedUserRole.some(item => item.id === el.id);
    };


    renderRow = (el, index) => {
        const isEven = index % 2 === 0 ? " even" : "";
        const isSelected = this.isElementSelected(el) ? " selected" : "";

        return (
            <div
                className={"row" + isEven + isSelected} key={index}
                onClick={() => this.props.setSelected([el])}>
                <div
                    className="data-row"
                    title={el.measure_name} key={el.id}>
                    {el.measure_name}
                </div>
            </div>
        )
    };

    handleCheckAll = () => {
        this.setState((prevState, props) => ({
            isAllChecked: !prevState.isAllChecked
        }));


        this.props.setSelected(this.props.list);
    };

    handleCheckElement = (element) => (event, checked) => {

        console.log(event.target.checked, checked, 'target');

        this.setState((prevState, props) => {
            if (checked) {
                if (prevState.currentSelected) {
                    if (prevState.currentSelected.id === element.id) {
                        return {
                            currentSelected: null
                        }
                    }
                }
                else {
                    this.props.setSelected([element]);
                    return {
                        currentSelected: element
                    };
                }

            }
            else {
                this.props.setSelected([]);
                return {
                    currentSelected: element
                }
            }
        });
    };

render() {
    if (this.props.list) {
        let headers = [];
        headers.push(this.props.header);
        return (
            <div className="table-container">
                <div className="table">
                    <div className="header">
                        {headers.map(el => <div>{el}</div>)}
                    </div>
                    <div className="body">
                        {this.props.list
                        // .sort(this.sortTable)
                            .map((el, index) => this.renderRow(el, index))}
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (<div></div>)
    }
}
}

AssignUsersViewTable.propTypes = {
    list: PropTypes.array.isRequired,
    setSelected: PropTypes.func.isRequired,
    selectedUserRole: PropTypes.object,
    searchValue: PropTypes.string,
};

export default AssignUsersViewTable;