import React from 'react';
import PropTypes from 'prop-types';
import style from './publication.module.css';

const Publication = ({ index, items }) => (
  <article className={style.publication}>
    <h2>
      {index}. {items[index - 1].title}
    </h2>
    <p>{items[index - 1].text}</p>
  </article>
);

Publication.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  index: PropTypes.number.isRequired,
};

export default Publication;
