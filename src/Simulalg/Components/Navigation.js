import * as React from 'react';
import '../css/Navigation.css';

const Navigation = ({ customStyle, algorithms, onAlgorithmChange, onResetBars, running }) => {
  const renderedMenuItems = Object.keys(algorithms).map((key, index) => {
    return <button key={index} className={`itemList ${running ? 'itemListDisable' : null} `} onClick={() => onAlgorithmChange(key)} disabled={running}>{ algorithms[key].name }</button>;
  });
  
  return (
    <ul className='navigationList' style={{ ...customStyle }}>
      <button className='itemList reset-btn' onClick={() => onResetBars(true)}>Reset</button>
      { renderedMenuItems }
    </ul>
  );
};

export default Navigation;