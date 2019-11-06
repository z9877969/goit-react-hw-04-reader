import React from 'react';
import PropTypes from 'prop-types';
import style from './counter.module.css';

const Counter = ({ items, index }) => (
  <p className={style.counter}>
    {index} / {items.length}
  </p>
);

Counter.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  index: PropTypes.number.isRequired,
};

export default Counter;
