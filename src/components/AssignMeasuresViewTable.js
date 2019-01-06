import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AssignUsersViewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'id',
      sortDir: 'ASC',
    };
  }

  setSort = key => {
    const { sortBy, sortDir } = this.state;
    if (sortBy === key) {
      this.setState({ sortDir: sortDir === 'DESC' ? 'ASC' : 'DESC' });
    } else {
      this.setState({ sortBy: key, sortDir: 'ASC' });
    }
  };

  sortTable = (a, b) => {
    const { sortBy, sortDir } = this.state;
    let aVal = a.User[sortBy];
    let bVal = b.User[sortBy];
    if (sortDir === 'ASC') {
      return (aVal > bVal ? -1 : (aVal < bVal ? 1 : 0));
    } else {
      return (aVal < bVal ? -1 : (aVal > bVal ? 1 : 0));
    }
  };

  renderRow = (el, index) => {
    const isEven = index % 2 === 0 ? " even" : "";
    const isSelected = this.props.selectedUserRole && el.id === this.props.selectedUserRole.id ? " selected" : "";

    return (
      <div
        className={"row" + isEven + isSelected} key={index}
        onClick={() => this.props.setSelected(el)}>
        <div
            className="data-row"
            title={el.measure_name} key={el.id}>
            {el.measure_name}
        </div>
      </div>
    )
  };

  render() {
    if (this.props.list){
        console.log(this.props.list, 'USER ROLES')
        return (
            <div className="table-container">
              <div className="table">
                <div className="header">
                    {this.props.header}
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