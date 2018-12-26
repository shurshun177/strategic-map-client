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

  filterUsers = value => {
    let { searchValue } = this.props;
    if (searchValue == null) {
      return true;
    }
    searchValue = searchValue.toLowerCase();
    var found = false;
    this.props.headerNamesAndRelativeIds.forEach(idAndName => {
      if (value.User[idAndName.id] != null && value.User[idAndName.id].toString().startsWith(searchValue)) {
        found = true;
      }
    });
    return found;
  }

  setSort = key => {
    const { sortBy, sortDir } = this.state;
    if (sortBy === key) {
      this.setState({ sortDir: sortDir === 'DESC' ? 'ASC' : 'DESC' });
    } else {
      this.setState({ sortBy: key, sortDir: 'ASC' });
    }
  }

  sortTable = (a, b) => {
    const { sortBy, sortDir } = this.state;
    let aVal = a.User[sortBy];
    let bVal = b.User[sortBy];
    if (sortDir === 'ASC') {
      return (aVal > bVal ? -1 : (aVal < bVal ? 1 : 0));
    } else {
      return (aVal < bVal ? -1 : (aVal > bVal ? 1 : 0));
    }
  }

  renderRow = (role, index) => {
    const isEven = index % 2 === 0 ? " even" : "";
    const isSelected = this.props.selectedUserRole && role.id === this.props.selectedUserRole.id ? " selected" : "";
    return (
      <div
        className={"row" + isEven + isSelected} key={index}
        onClick={() => this.props.setSelected(role)}>
        {this.props.headerNamesAndRelativeIds.map(nameAndId =>
          <div
            className="data-row"
            title={role.User[nameAndId.id]} key={nameAndId.id + index}>
            {role.User[nameAndId.id]}
          </div>)}
      </div>
    )
  }

  render() {
    return (
      <div className="table-container">
        <div className="table">
          <div className="header">
            {this.props.headerNamesAndRelativeIds.map(nameAndId => <div key={nameAndId.id} onClick={() => this.setSort(nameAndId.id)}>{nameAndId.name}</div>)}
          </div>
          <div className="body">
            {this.props.userRoles
              .filter(this.filterUsers)
              .sort(this.sortTable)
              .map((role, index) => this.renderRow(role, index))}
          </div>
        </div>
      </div>
    )
  }
}

AssignUsersViewTable.propTypes = {
  headerNamesAndRelativeIds: PropTypes.array.isRequired,
  userRoles: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  selectedUserRole: PropTypes.object,
  searchValue: PropTypes.string,
};

export default AssignUsersViewTable;