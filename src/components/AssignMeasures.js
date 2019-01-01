import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './common/ModalComp/Modal';
import AssignMeasuresViewTable from './AssignMeasuresViewTable';
import _ from 'lodash';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
class AssignMeasures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      selectedMeasure: null,
      currentAssignedMeasures: [],
      currentUnassignedMeasures: [],
      openModal: false
    }
  }

    componentDidUpdate(prevProps) {
        if (this.props.allMeasures !==prevProps.allMeasures || this.props.assignedMeasures !==prevProps.assignedMeasures){
            this.setState({
                currentUnassignedMeasures: this.props.allMeasures,
                currentAssignedMeasures: this.props.assignedMeasures
            });
        }
    }

  cancelChanges = () => {
    let { currentAssignedMeasures, currentUnassignedMeasures } = this.state;

    if (this.props.allMeasures.length){
        // currentAssignedMeasures = _.cloneDeep(this.props.assignedMeasures);
        currentUnassignedMeasures = _.cloneDeep(this.props.allMeasures);
        // currentUnassignedMeasures = _.cloneDeep(this.props.allMeasures).filter(receivedMeasure => currentAssignedMeasures.find(selectedMeasure => selectedMeasure._id.$oid == receivedMeasure._id.$oid) == null);
    }
      this.setState({ currentAssignedMeasures, currentUnassignedMeasures, selectedMeasure: null });
      this.closeAssignModal();
  };

  submitChanges = () => {
    this.props.setMeasures(this.state.currentAssignedMeasures);
    // this.props.setAssigeens(this.state.currentAssignedMeasures);
    this.setState({ selectedMeasure: null });
    this.closeAssignModal();
  };

  setSelectedMeasure = selectedMeasure =>{
      this.setState((prevState, props) => {
          if(prevState.selectedMeasure){
              if(prevState.selectedMeasure.id !== selectedMeasure.id){
                  return {
                      selectedMeasure
                  };
              }
          }
          else{
              return {
                  selectedMeasure
              };
          }

          // if (!prevState.selectedMeasure || (prevState.selectedAssignee._id.$oid !== selectedMeasure._id.$oid)){
          //     prevState.currentAssignedMeasures.push(selectedMeasure);
          //     prevState.currentUnassignedMeasures.pop(selectedMeasure);
          //     return {
          //         selectedMeasure,
          //         currentAssignedMeasures: prevState.currentAssignedMeasures,
          //         currentUnassignedMeasures: prevState.currentUnassignedMeasures
          //     };
          // }
      });
  };

  addAssignee = () => {
    let { currentAssignedMeasures, currentUnassignedMeasures, selectedMeasure } = this.state;
    if (selectedMeasure == null) { return; }
      this.setState((prevState, props) => {
          if (selectedMeasure){
                  prevState.currentAssignedMeasures.push(selectedMeasure);
                  prevState.currentUnassignedMeasures.pop(selectedMeasure);
                  return {
                      currentAssignedMeasures: prevState.currentAssignedMeasures,
                      currentUnassignedMeasures: prevState.currentUnassignedMeasures
                  };
          }
      }, ()=>{
        console.log('add assignee, state');
        console.log(this.state.currentAssignedMeasures);
        console.log(this.state.currentUnassignedMeasures);
      });

    // currentAssignedMeasures.push(this.state.selectedUser);
    // const indexToRemove = _.findIndex(currentUnassignedMeasures, unAssigendUser => unAssigendUser.id === this.state.selectedUser.id);
    // currentUnassignedMeasures.splice(indexToRemove, 1);
    // this.setState({ currentAssignedMeasures, currentUnassignedMeasures, selectedAssignee: null, selectedUser: null });
  };

  removeAssignee = () => {
    let { currentAssignedMeasures, currentUnassignedMeasures, selectedMeasure } = this.state;

      if (selectedMeasure == null) { return; }
      this.setState((prevState, props) => {
              prevState.currentAssignedMeasures.pop(selectedMeasure);
              prevState.currentUnassignedMeasures.push(selectedMeasure);
              return {
                  currentAssignedMeasures: prevState.currentAssignedMeasures,
                  currentUnassignedMeasures: prevState.currentUnassignedMeasures
              };
      });
    // if (selectedAssignee == null) { return; }
    // currentUnassignedMeasures.push(this.state.selectedAssignee);
    // const indexToRemove = _.findIndex(currentAssignedMeasures, assigendUser => assigendUser.id === this.state.selectedAssignee.id);
    // currentAssignedMeasures.splice(indexToRemove, 1);
    // this.setState({ currentAssignedMeasures, currentUnassignedMeasures, selectedAssignee: null, selectedUser: null });
  };

  closeAssignModal = () => {
    this.setState({ openModal: false });
  };

  renderAssignModal = () => {
      let isMeasuresListEmpty = false;
    // let isMeasuresListEmpty = this.props.allMeasures.length === 0;
    return (
      <Modal
        className="assign-therapist-modal-container"
        modal_title={this.props.title}
        openModal={this.state.openModal}
        closeModal={this.cancelChanges}
        deleteButton={(<div className="dialog_save_button" onClick={this.cancelChanges}>ביטול</div>)}
        submitButton={(<div className="dialog_save_button" onClick={this.submitChanges}>אישור</div>)}>
          {isMeasuresListEmpty ? <div>אין מדדים כרגע. נא לבכור סוג בית חולים ונושע עשקי.</div> :
              <div className="therapists-assign-body">
              <div className="section patient-therapists">
                  <AssignMeasuresViewTable
                      header='מדדים נבכרים'
                      list={this.state.currentAssignedMeasures}
                      setSelected={this.setSelectedMeasure}
                      selectedUserRole={this.state.selectedMeasure} />
              </div>
              <div className="add-remove">
                  <div className={"button remove" + (this.state.selectedMeasure == null ? " disabled" : "")}
                       onClick={() => this.addAssignee()}></div>
                  <div className={"button add" + (this.state.selectedMeasure == null ? " disabled" : "")}
                       onClick={() => this.removeAssignee()}></div>
              </div>
              <div className="section all-therapists">
                  <AssignMeasuresViewTable
                      header='כל המדדים'
                      searchValue={this.state.searchValue}
                      list={this.state.currentUnassignedMeasures}
                      setSelected={this.setSelectedMeasure}
                      selectedUserRole={this.state.selectedMeasure}
                  />
              </div>
          </div>}
      </Modal >
    )
  };

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
  };

  renderTitle = () => {
    return (
        <div className="add-measures-button">
          <Fab color="primary" aria-label="Add" onClick={() => {
                  this.cancelChanges();
                  this.setState({ openModal: true });
                }}>
            <AddIcon />
          </Fab>
        </div>
    );
  };

  render() {
    return (
      <div className="table-container">
        {this.renderAssignModal()}
        {this.renderTitle()}
      </div>
    )
  }
}

AssignMeasures.propTypes = {
  title: PropTypes.string.isRequired,
  allMeasures: PropTypes.array.isRequired,
  assignedMeasures: PropTypes.array.isRequired,
  editedUserName: PropTypes.string.isRequired,
  assigneesRoleName: PropTypes.string.isRequired,
  setAssigeens: PropTypes.func.isRequired,
};

export default AssignMeasures;