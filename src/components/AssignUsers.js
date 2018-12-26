import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from './common/ModalComp/Modal';
import AssignUsersViewTable from './AssignUsersViewTable';
import _ from 'lodash';

class AssignUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      selectedUser: null,
      selectedAssignee: null,
      assigendUsers: [],
      unAssigendUsers: [],

      openModal: false,
    }
  }

  cancelChanges = () => {
    let { assigendUsers, unAssigendUsers } = this.state;
    assigendUsers = _.cloneDeep(this.props.assigendUsersRoles);
    unAssigendUsers = _.cloneDeep(this.props.allUsersRoles).filter(userRole => assigendUsers.find(assigendUser => assigendUser.id == userRole.id) == null);
    this.setState({ assigendUsers, unAssigendUsers, selectedAssignee: null, selectedUser: null });
    this.closeAssignModal();
  }

  submitChanges = () => {
    this.props.setAssigeens(this.state.assigendUsers)
    this.setState({ selectedAssignee: null, selectedUser: null });
    this.closeAssignModal();
  }

  setSelectedUser = selectedUser => this.setState({ selectedUser, selectedAssignee: null });
  setSelectedAssignee = selectedAssignee => this.setState({ selectedAssignee, selectedUser: null });

  addAssignee = () => {
    let { assigendUsers, unAssigendUsers, selectedUser } = this.state;
    if (selectedUser == null) { return; }
    assigendUsers.push(this.state.selectedUser);
    const indexToRemove = _.findIndex(unAssigendUsers, unAssigendUser => unAssigendUser.id === this.state.selectedUser.id);
    unAssigendUsers.splice(indexToRemove, 1);
    this.setState({ assigendUsers, unAssigendUsers, selectedAssignee: null, selectedUser: null });
  }

  removeAssignee = () => {
    let { assigendUsers, unAssigendUsers, selectedAssignee } = this.state;
    if (selectedAssignee == null) { return; }
    unAssigendUsers.push(this.state.selectedAssignee);
    const indexToRemove = _.findIndex(assigendUsers, assigendUser => assigendUser.id === this.state.selectedAssignee.id);
    assigendUsers.splice(indexToRemove, 1);
    this.setState({ assigendUsers, unAssigendUsers, selectedAssignee: null, selectedUser: null });
  }

  closeAssignModal = () => {
    this.setState({ openModal: false });
  }

  renderAssignModal = () => {
    return (
      <Modal
        className="assign-therapist-modal-container"
        modal_title={this.props.title}
        openModal={this.state.openModal}
        closeModal={this.cancelChanges}
        deleteButton={(<div className="dialog_save_button" onClick={this.cancelChanges}>Cancel</div>)}
        submitButton={(<div className="dialog_save_button" onClick={this.submitChanges}>Apply</div>)}>

        <div className="therapists-assign-body">
          <div className="section patient-therapists">
            <div className="title">{this.props.editedUserName}blabla</div>
            <AssignUsersViewTable
              headerNamesAndRelativeIds={this.props.headerNamesAndRelativeIds}
              userRoles={this.state.assigendUsers}
              setSelected={this.setSelectedAssignee}
              selectedUserRole={this.state.selectedAssignee} />
          </div>
          <div className="add-remove">
            <div className={"button remove" + (this.state.selectedUser == null ? " disabled" : "")}
              onClick={() => this.addAssignee()}></div>
            <div className={"button add" + (this.state.selectedAssignee == null ? " disabled" : "")}
              onClick={() => this.removeAssignee()}></div>
          </div>
          <div className="section all-therapists">
            <div className="title">
              <div>header name</div>
              <input
                className="search-field"
                type="text"
                placeholder="search"
                value={this.state.searchValue}
                onChange={event => this.setState({ searchValue: event.target.value })}
              />
              <img src="/images/search.svg" className="icon" />
            </div>
            <AssignUsersViewTable
              headerNamesAndRelativeIds={this.props.headerNamesAndRelativeIds}
              searchValue={this.state.searchValue}
              userRoles={this.state.unAssigendUsers}
              setSelected={this.setSelectedUser}
              selectedUserRole={this.state.selectedUser}
            />
          </div>
        </div>
      </Modal >
    )
  }

  renderRow = (role, index) => {
    return (
      <div
        className={"row" + (index % 2 === 0 ? " even" : "")} key={index}>
        {this.props.headerNamesAndRelativeIds.map(nameAndId =>
          <div
            className="data-row"
            title={role.User[nameAndId.id]} key={nameAndId.id + index}>
            {role.User[nameAndId.id]}
          </div>)}
      </div>);
  }

  renderTitle = () => {
    return (
      <div className="title-container">
        <div className="title">{this.props.title}</div>
        <div className="button edit" onClick={() => { this.cancelChanges(); this.setState({ openModal: true }); }}>Edit</div>
      </div>);
  }

  render() {
    return (
      <div className="table-container">
        {this.renderAssignModal()}
        {this.renderTitle()}
        <div className="table">
          <div className="header">
            {this.props.headerNamesAndRelativeIds.map(nameAndId => <div key={nameAndId.id}>{nameAndId.name}</div>)}
          </div>
          <div className="body">
            {this.props.assigendUsersRoles.map((role, index) => this.renderRow(role, index))}
          </div>
        </div>
      </div>
    )
  }
}

AssignUsers.propTypes = {
  title: PropTypes.string.isRequired,
  headerNamesAndRelativeIds: PropTypes.array.isRequired,
  allUsersRoles: PropTypes.array.isRequired,
  assigendUsersRoles: PropTypes.array.isRequired,
  editedUserName: PropTypes.string.isRequired,
  assigneesRoleName: PropTypes.string.isRequired,
  setAssigeens: PropTypes.func.isRequired,
};

export default AssignUsers;