import React from 'react';
import PropTypes from 'prop-types';


const InputFieldImg = ({ img_src }) => {
  return (
    <img className="input_img" src={img_src} alt="login details icon" />
  );
};

InputFieldImg.propTypes = {
  img_src: PropTypes.string.isRequired,
};

export default InputFieldImg;
