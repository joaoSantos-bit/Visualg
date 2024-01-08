import React from 'react';
import Navigation from './Navigation';
import '../css/TopNavigation.css';


const TopNavigation = ({ heightFirstContainer, algorithms, onAlgorithmChange, onResetBars, running, ran }) => {
    return (
        <div className='mainTopNavigationWrapper' style={{ height: heightFirstContainer }}>
            <h1 className='logo'>Visualg</h1>
            <div className='wrapperFirstNavBar'>
                <Navigation
                    algorithms={ algorithms }
                    onAlgorithmChange={onAlgorithmChange}
                    onResetBars={onResetBars}
                    running={running}
                />
            </div>
        </div>
    );
};

export default TopNavigation;