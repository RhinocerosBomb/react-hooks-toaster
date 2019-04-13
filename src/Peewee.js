import React, { useState, useContext } from 'react';
import context from './lib/context';

const Peewee = () => {
  const [text, setText] = useState('');
  const [type, setType] = useState('default');
  const [position, setPosition] = useState('bottom_right');
  const buildToast = useContext(context);
  return (
    <div className="Peewee">
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button
        type="button"
        onClick={() => buildToast({}, { type, position, clickToClose: false })}
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
        <option value="bottom_right">Bottom Right</option>
        <option value="bottom_left">Bottom Left</option>
        <option value="bottom_center">Bottom Center</option>
        <option value="top_right">Top Right</option>
        <option value="top_left">Top Left</option>
        <option value="top_center">Top Center</option>
      </select>
    </div>
  );
};

export default React.memo(Peewee);
