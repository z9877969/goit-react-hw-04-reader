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
    const newIndex = this.indexOfItemFromUrl();
    
    if (!newIndex || newIndex > items.length) {
      return this.changeUrl(1);
    }

    this.indexSetState(newIndex);
    
    return this.changeUrl(newIndex);
  }

  componentDidUpdate(prevProps, prevState) {
    this.getUpdateByUrl(prevProps, prevState);
  }

  changeUrl = index => {
    const { history, location } = this.props;

    history.push({
      ...location,
      search: `item=${index}`,
    });
  };

  indexOfItemFromUrl = () => {
    const { location } = this.props;
    return Number(getIndexFromLocation(location));
  };

  indexSetState = index => {
    this.setState({
      index: Number(index),
    });
  };

  getUpdateByUrl = (prevProps, prevState) => {
    const { index } = this.state;
    const { location } = this.props;
    if (location.search !== prevProps.location.search) {
      const newIndex =
        this.indexOfItemFromUrl() > items.length
          ? 1
          : this.indexOfItemFromUrl();
      if (!getIndexFromLocation(location)) {
        const index = 1;
        this.props.history.push({
          ...location,
          search: `item=${index}`,
        });
        return this.setState({ index });
      }

      this.setState({ index: newIndex });
      return this.changeUrl(newIndex);
    }

    if (index !== prevState.index) {
      this.changeUrl(index);
    }
  };

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
