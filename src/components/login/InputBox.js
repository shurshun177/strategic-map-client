import React from 'react';
import PropTypes from 'prop-types';

const InputBox = (props) => {
  return (
    <input
      className="input_box" type={props.input_type}
      placeholder={props.placeholder_text}
      onChange={props.on_input_change}
    />
  );
};

InputBox.propTypes = {
  input_type: PropTypes.string.isRequired,
  placeholder_text: PropTypes.string.isRequired,
  on_input_change: PropTypes.func.isRequired,
};

export default InputBox;
