import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
//import RaisedButton from '@material-ui/core/RaisedButton';
import {MuiThemeProvider} from '@material-ui/core/styles';

import './Modal.scss';

const Modal = (props) => {
  return (
    <MuiThemeProvider>
      <Dialog
        className={props.className}
        modal
        open={props.openModal}
        contentStyle={props.wrapperStyle}
        bodyStyle={props.style}
        bodyClassName="dialog_body"
        fullWidth={true}
      >
        <div className="modal-header">
          <div className="modal_title" >{props.modal_title}</div>
          <div className="dialog_cancel_button" onClick={props.closeModal} />
        </div>
        <div className="dialog_content">
          {props.children}
        </div>
        <div className={`dialog_footer ${props.footer}`}>
          {props.modalErr ? <div className="dialog_error">{props.modalErr}</div> : null }
          {props.deleteButton}
          {props.submitButton}
        </div>
      </Dialog>
    </MuiThemeProvider>
  );
};

export default Modal;
