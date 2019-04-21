import React, { useContext, useState } from 'react';
import '../styles/StageTwo.css';
import Toaster from '../lib/components/Toaster';
import globalContext from '../context';

const localContext = React.createContext();
const Localized = props => {
  const buildLocalToast = useContext(localContext);
  const [qOne, setQOne] = useState(0);
  const [qTwo, setQTwo] = useState(0);
  const handleClick = () => {
    if (parseInt(qOne, 10) === 4 && parseInt(qTwo, 10) === 9) {
      buildLocalToast('Correct!', {
        duration: 2000,
        type: buildLocalToast.TYPE.SUCCESS,
        position: buildLocalToast.POSITION.BOTTOM_RIGHT
      });

      props.createGlobalSuccess();
    } else {
      buildLocalToast('Huh... How old are you?', {
        duration: 2000,
        type: buildLocalToast.TYPE.ERROR
      });
      props.createGlobalFailure();
    }
  };
  return (
    <div>
      <h2>Quiz</h2>
      <div className="quiz">
        <h3>Q 1.</h3>
        <p>What is 2 + 2 ?</p>
        <input
          type="number"
          min="0"
          max="10"
          value={qOne}
          onChange={e => setQOne(e.target.value)}
        />
        <h3>Q 2.</h3>
        <p>What is 3 X 3 ?</p>
        <input
          type="number"
          min="0"
          max="10"
          value={qTwo}
          onChange={e => setQTwo(e.target.value)}
        />
      </div>
      <button onClick={handleClick}>
        <h3>Submit</h3>
      </button>
    </div>
  );
};

const StageTwo = () => {
  const buildGlobalToast = useContext(globalContext);
  const [lv, setlv] = useState(0);
  const globalSuccess = () => {
    setlv(lv => lv + 1);
    buildGlobalToast(`You Leveled Up! You are now Level ${lv + 1}!`, {
      duration: 2000,
      type: buildGlobalToast.TYPE.INFO,
      position: buildGlobalToast.POSITION.TOP_RIGHT
    });
  };

  const globalFailure = () => {
    setlv(lv => lv - 1);
    buildGlobalToast(`You Leveled Down! You are now Level ${lv - 1}!`, {
      duration: 2000,
      type: buildGlobalToast.TYPE.INFO,
      position: buildGlobalToast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="StageTwo">
      <p>
        Context alllows for global and localized toasts! Try doing this quiz to
        see how it can be utilized.
      </p>
      <div className="localized">
        <Toaster context={localContext}>
          <Localized
            createGlobalSuccess={globalSuccess}
            createGlobalFailure={globalFailure}
          />
        </Toaster>
      </div>
    </div>
  );
};

export default StageTwo;
