import React from 'react';
import PropTypes from 'prop-types';

const Helmet = (props) => {
  document.title = 'Food ordering app -' + props.title;
  return <div className="w-100">{props.children}</div>;
};

Helmet.propTypes = {
  props: PropTypes.string,
};
export default Helmet;
