import React, { useState, useContext } from 'react';
import context from '../context';
import classNames from 'classnames/bind';

export default () => {
  const [text, setText] = useState('');
  const buildToast = useContext(context);
  const [type, setType] = useState(buildToast.TYPE.DEFAULT);
  const [position, setPosition] = useState(buildToast.POSITION.BOTTOM_LEFT);
  const [duration, setDuration] = useState(5000);
  const [autoClose, setAutoClose] = useState(true);
  const [clickToClose, setClickToClose] = useState(true);
  const [closeButton, setCloseButton] = useState(true);
  const handleClick = () => {
    buildToast(text, {
      type,
      position,
      clickToClose,
      duration: autoClose && duration,
      closeButton
    });
  };

  return (
    <div className="StageOne">
      <div className="box">
        <div className="wrapBox" style={{ flexGrow: 3 }}>
          <label>Text</label>
          <input
            className="text"
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <div className="wrapBox" style={{ flexGrow: 1 }}>
          <label>Type</label>
          <select
            className="type"
            onChange={e => setType(e.target.value)}
            value={type}
          >
            <option value="default">default</option>
            <option value="info">info</option>
            <option value="success">success</option>
            <option value="warning">warning</option>
            <option value="error">error</option>
          </select>
        </div>
        <div className="wrapBox" style={{ flexGrow: 1 }}>
          <label>Position</label>
          <select
            className="position"
            onChange={e => setPosition(e.target.value)}
            value={position}
          >
            <option value={buildToast.POSITION.BOTTOM_RIGHT}>
              Bottom Right
            </option>
            <option value={buildToast.POSITION.BOTTOM_LEFT}>Bottom Left</option>
            <option value={buildToast.POSITION.BOTTOM_CENTER}>
              Bottom Center
            </option>
            <option value={buildToast.POSITION.TOP_RIGHT}>Top Right</option>
            <option value={buildToast.POSITION.TOP_LEFT}>Top Left</option>
            <option value={buildToast.POSITION.TOP_CENTER}>Top Center</option>
          </select>
        </div>
      </div>
      <div className="box">
        <button className="add" type="button" onClick={handleClick}>
          ADD
        </button>
        <button className="dismissAll" onClick={() => buildToast.dismissAll()}>
          Dismiss All
        </button>
      </div>
      <div className="box">
        <div className="noWrapBox">
          <div
            className={classNames('customRadio', { selected: autoClose })}
            onClick={() => setAutoClose(!autoClose)}
          />
          <p>Auto Close</p>
        </div>
        <div className="noWrapBox">
          <div
            className={classNames('customRadio', { selected: clickToClose })}
            onClick={() => setClickToClose(!clickToClose)}
          />
          <p>Click To Close</p>
        </div>
        <div className="noWrapBox">
          <div
            className={classNames('customRadio', { selected: closeButton })}
            onClick={() => setCloseButton(!closeButton)}
          />
          <p>Close Button</p>
        </div>
      </div>
      <div className="box">
        <div className="noWrapBox">
          <input
            className={classNames('duration', { disabled: !autoClose })}
            type="number"
            disabled={!autoClose}
            min="0"
            value={duration}
            onChange={e => setDuration(e.target.value)}
          />
          <p>Duration</p>
        </div>
      </div>
    </div>
  );
};
