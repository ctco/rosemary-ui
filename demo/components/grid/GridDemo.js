import React from 'react';

export default () => {
    return (
        <div>
            <p><a target="_blank" href="http://gridle.org/documentation">Grid Documentation</a></p>
            <div className="row">
                <div className="gr-1">1/18</div>
                <div className="gr-1">1/18</div>
                <div className="gr-3">3/18</div>
                <div className="gr-1">1/18</div>
                <div className="gr-2">2/18</div>
                <div className="gr-1">1/18</div>
                <div className="gr-1">1/18</div>
                <div className="gr-1">1/18</div>
                <div className="gr-1">1/18</div>
                <div className="gr-1">1/18</div>
                <div className="gr-1">1/18</div>
                <div className="gr-4">4/18</div>
            </div>
            <div className="row">
                <div className="gr-9">9/18</div>
                <div className="gr-9">
                    9/18
                    <div className="row">
                        <div className="gr-4">4/18</div>
                        <div className="gr-4">4/18</div>
                        <div className="gr-4">4/18</div>
                        <div className="gr-4">4/18</div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="gr-9">9/18</div>
                <div className="gr-9">9/18</div>
            </div>
            <div className="row">
                <div className="gr-9 gr-centered">9/18</div>
            </div>
        </div>
    );
};

