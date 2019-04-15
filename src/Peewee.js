import React, { useState, useContext } from 'react';
import context from './context';

const Peewee = () => {
  const [text, setText] = useState('');
  const buildToast = useContext(context);
  const [type, setType] = useState(buildToast.TYPE.DEFAULT);
  const [position, setPosition] = useState(buildToast.POSITION.BOTTOM_LEFT);
  return (
    <div className="Peewee">
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button
        type="button"
        onClick={() =>
          buildToast(text, { type, position, clickToClose: false })
        }
      >
        ADD
      </button>
      <select onChange={e => setType(e.target.value)} value={type}>
        <option value="default">default</option>
        <option value="info">info</option>
        <option value="success">success</option>
        <option value="warning">warning</option>
        <option value="error">error</option>
      </select>
      <select onChange={e => setPosition(e.target.value)} value={position}>
        <option value={buildToast.POSITION.BOTTOM_RIGHT}>Bottom Right</option>
        <option value={buildToast.POSITION.BOTTOM_LEFT}>Bottom Left</option>
        <option value={buildToast.POSITION.BOTTOM_CENTER}>Bottom Center</option>
        <option value={buildToast.POSITION.BOTTOM_RIGHT}>Top Right</option>
        <option value={buildToast.POSITION.BOTTOM_LEFT}>Top Left</option>
        <option value={buildToast.POSITION.BOTTOM_CENTER}>Top Center</option>
      </select>
    </div>
  );
};

export default React.memo(Peewee);
