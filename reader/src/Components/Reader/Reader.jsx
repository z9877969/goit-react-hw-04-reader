import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Controls from '../Controls/Controls';
import Counter from '../Counter/Counter';
import Publication from '../Publication/Publication';
import items from '../../json/publications.json';
import style from './reader.module.css';

const getIndexFromLocation = location =>
  queryString.parse(location.search).item;

class Reader extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    index: 1,
  };

  componentDidMount() {
    if (!this.findedIndex() || this.findedIndex() > items.length) {
      return this.changeUrl(1);
    }

    this.indexSetState();
    return this.changeUrl();
  }

  componentDidUpdate(prevProps, prevState) {
    const { index } = this.state;

    if (index !== prevState.index) {
      this.changeUrl();
    }
  }

  handlerControlsBtn = ({ target }) => {
    const {
      dataset: { action },
    } = target;
    if (action === 'prev') {
      this.setState(prev => ({
        index: prev.index - 1,
      }));
    } else if (action === 'next') {
      this.setState(prev => ({
        index: prev.index + 1,
      }));
    }
  };

  changeUrl = (index = this.state.index) => {
    const { history, location } = this.props;

    history.push({
      ...location,
      search: `item=${index}`,
    });
  };

  findedIndex = () => {
    const { location } = this.props;
    return getIndexFromLocation(location);
  };

  indexSetState = () => {
    this.setState({
      index: Number(this.findedIndex()),
    });
  };

  render() {
    const { index } = this.state;

    return (
      <div className={style.reader}>
        <Controls
          index={index}
          items={items}
          onControlsBtn={this.handlerControlsBtn}
        />
        <Counter items={items} index={index} />
        <Publication index={index} items={items} />
      </div>
    );
  }
}

Reader.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default Reader;
