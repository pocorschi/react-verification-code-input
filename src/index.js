import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const KEY_CODE = {
  backspace: 8,
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

export default class ReactCodeInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    fields: PropTypes.number
  };

  static defaultProps = {
    fields: 6
  };

  constructor(props) {
    super(props);
    const { fields } = props;
    this.state = {
      values: Array(fields).fill('')
    };

    this.iRefs = [];
    for (let i = 0; i < fields; i++) {
      this.iRefs.push(React.createRef());
    }
    this.id = +new Date();
  }

  onChange = e => {
    console.log('onChange', { e });
  };

  onKeyDown = e => {
    console.log('onKeyDown', { e });
    const index = parseInt(e.target.dataset.id);
    const prevIndex = index - 1;
    const nextIndex = index + 1;
    const prev = this.iRefs[prevIndex];
    const next = this.iRefs[nextIndex];
    switch (e.keyCode) {
      case KEY_CODE.backspace:
        break;
      case KEY_CODE.left:
        if (prev) {
          prev.current.focus();
          prev.current.select();
        }
        break;
      case KEY_CODE.right:
        if (next) {
          next.current.focus();
          next.current.select();
        }
        break;
      case KEY_CODE.up:
      case KEY_CODE.down:
        e.preventDefault();
        break;
    }
  };

  onKeyUp = e => {
    console.log('onKeyUp', { e });
  };

  render() {
    const { values } = this.state;
    return (
      <div className={styles['react-code-input']}>
        {values.map((value, index) => (
          <input
            key={`${this.id}-${index}`}
            data-id={index}
            value={value}
            ref={this.iRefs[index]}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
          />
        ))}
      </div>
    );
  }
}
