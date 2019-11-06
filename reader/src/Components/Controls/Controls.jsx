import React from 'react';
import PropTypes from 'prop-types';
import style from './controls.module.css';

const Controls = ({ onControlsBtn, index, items }) => (
  <section className={style.controls}>
    <button
      type="button"
      className="button"
      disabled={index <= 1}
      data-action="prev"
      onClick={onControlsBtn}
    >
      Назад
    </button>
    <button
      type="button"
      className="button"
      disabled={index === items.length}
      data-action="next"
      onClick={onControlsBtn}
    >
      Вперед
    </button>
  </section>
);

Controls.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onControlsBtn: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Controls;
