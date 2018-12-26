import React from 'react';
import PropTypes from 'prop-types';

import InputBox from './InputBox';
import InputFieldImg from './InputFieldImg';

const InputWrapper = (props) => {
  return (
    <div className="input_container">
      <InputFieldImg img_src={props.img_src} />
      <InputBox
        input_type={props.input_type}
        placeholder_text={props.placeholder_text}
        on_input_change={props.onInputChange}
        value={props.value}
      />
    </div>
  );
};

InputWrapper.propTypes = {
  img_src: PropTypes.string.isRequired,
  input_type: PropTypes.string.isRequired,
  placeholder_text: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default InputWrapper;
