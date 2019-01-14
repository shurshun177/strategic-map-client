import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './common/ModalComp/Modal';
import AssignMeasuresViewTable from './AssignMeasuresViewTable';
import _ from 'lodash';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
class AssignMeasures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      selectedMeasures: [],
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
        // currentAssignedMeasures = _.cloneDeep(this.props.assignedMeasures).filter(el => currentAssignedMeasures.find(selectedMeasure => selectedMeasure.id === el.id) == null);
        currentUnassignedMeasures = _.cloneDeep(this.props.allMeasures);
        // currentUnassignedMeasures = _.cloneDeep(this.props.allMeasures).filter(receivedMeasure => currentAssignedMeasures.find(selectedMeasure => selectedMeasure._id.$oid == receivedMeasure._id.$oid) == null);
    }
      this.setState({ currentAssignedMeasures, currentUnassignedMeasures, selectedMeasures: [] });
      this.closeAssignModal();
  };

  submitChanges = () => {
    this.props.setMeasures(this.state.currentAssignedMeasures);
    this.setState({ selectedMeasures: [] });
    this.closeAssignModal();
  };

  setSelectedMeasure = selectedMeasureArray =>{
      this.setState((prevState, props) => {
          let {selectedMeasures} = prevState;

          selectedMeasureArray.forEach(selectedMeasure=>{
              let isAlreadyChoosen = selectedMeasures.some(item => item.id === selectedMeasure.id);
              if (!isAlreadyChoosen){
                  selectedMeasures.push(selectedMeasure);
              }
          });
          return {
              selectedMeasures
          }
      });
  };

  addAssignee = () => {
    let { currentAssignedMeasures, currentUnassignedMeasures, selectedMeasures } = this.state;
    if (selectedMeasures.length === 0) { return; }
      this.setState((prevState, props) => {
          let newAssigned = prevState.currentAssignedMeasures;
          let newUnassigned = prevState.currentUnassignedMeasures;
          selectedMeasures.forEach((selectedMeasure, index) => {
              let isMeasureAssigned = prevState.currentAssignedMeasures.find(el => el.id === selectedMeasure.id);
              if (!isMeasureAssigned) {
                  newAssigned.push(selectedMeasure);
                  newUnassigned = newUnassigned.filter(el => el.id !== selectedMeasure.id);
              }
          });
          return {
              currentAssignedMeasures: newAssigned,
              currentUnassignedMeasures: newUnassigned,
              selectedMeasures: []
          };
      });
  };

  removeAssignee = () => {
    let { currentAssignedMeasures, currentUnassignedMeasures, selectedMeasures } = this.state;
      if (selectedMeasures.length === 0) { return; }
      this.setState((prevState, props) => {
          let newAssigned = prevState.currentAssignedMeasures;
          let newUnassigned = prevState.currentUnassignedMeasures;
          selectedMeasures.forEach((selectedMeasure, index)=>{
              let isMeasureUnassigned = newUnassigned.find(el=>el.id === selectedMeasure.id);
              if (!isMeasureUnassigned) {
                  newUnassigned.push(selectedMeasure);
                  newAssigned = newAssigned.filter(el=> el.id !== selectedMeasure.id);
              }
          });
          return {
              currentAssignedMeasures:newAssigned,
              currentUnassignedMeasures: newUnassigned,
              selectedMeasures: []
          };
      });
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
                      header='מדדים שנבחרו'
                      list={this.state.currentAssignedMeasures}
                      setSelected={this.setSelectedMeasure}
                      selectedUserRole={this.state.selectedMeasures} />
              </div>
              <div className="add-remove">
                  <div className={"button add" + (this.state.selectedMeasures === 0 ? " disabled" : "")}
                       onClick={() => this.addAssignee()}></div>
                  <div className={"button remove" + (this.state.selectedMeasures === 0 ? " disabled" : "")}
                       onClick={() => this.removeAssignee()}></div>
              </div>
              <div className="section all-therapists">
                  <AssignMeasuresViewTable
                      header='מדדים זמינים'
                      searchValue={this.state.searchValue}
                      list={this.state.currentUnassignedMeasures}
                      setSelected={this.setSelectedMeasure}
                      selectedUserRole={this.state.selectedMeasures}
                      showCheckbox={true}
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
          <Fab variant='extended' size='large' color="primary" aria-label="Add" onClick={() => {
                  this.cancelChanges();
                  this.setState({ openModal: true });
                }}>בחירת מדדים
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