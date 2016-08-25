import React from 'react';

export default props => {
    return (
        <div className="ui grid">
            <div className="twelve wide stretched column">
                {props.children}
            </div>
        </div>
    );
}