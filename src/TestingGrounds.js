import React, { useState, useContext } from 'react';
import context from './context';

const TestingGrounds = () => {
  const [text, setText] = useState('');
  const buildToast = useContext(context);
  const [type, setType] = useState(buildToast.TYPE.DEFAULT);
  const [position, setPosition] = useState(buildToast.POSITION.BOTTOM_LEFT);
  const [ids, setIds] = useState([]);
  const [currentId, setCurrentId] = useState(1);

  const handleClick = () => {
    const id = buildToast(text, {
      type,
      position,
      clickToClose: false,
      duration: false
    });
    setIds(ids => {
      return [...ids, id];
    });
  };
  return (
    <div className="Peewee">
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button type="button" onClick={handleClick}>
        ADD
      </button>
      <button onClick={() => buildToast.dismissAll()}>Dismiss All</button>
      <button
        onClick={() => buildToast.update(currentId, { type, content: text })}
      >
        Update
      </button>
      <button onClick={() => buildToast.dismiss(currentId)}>Dismiss</button>
      <select onChange={e => setCurrentId(e.target.value)} value={currentId}>
        {ids.map(id => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
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
        <option value={buildToast.POSITION.TOP_RIGHT}>Top Right</option>
        <option value={buildToast.POSITION.TOP_LEFT}>Top Left</option>
        <option value={buildToast.POSITION.TOP_CENTER}>Top Center</option>
      </select>
    </div>
  );
};

export default TestingGrounds;
