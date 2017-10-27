import React from 'react';
import {Popup, Select} from '../../../src';
import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';


const popupClassNames = ['popover', 'tooltip', 'popover-colored'];

export default class PopupDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popover: {},
            open: false
        };
    }

    renderPopup(position, params) {
        return (
            <Popup attachment={position} {...params}>
                <button>
                    {position}
                </button>
                {position}
            </Popup>
        );
    }

    renderPositioned(params) {
        return (
            <table className="popup-positioning-example">
                <tbody>
                <tr>
                    <td>{this.renderPopup('top left', params)}</td>
                    <td>{this.renderPopup('top center', params)}</td>
                    <td>{this.renderPopup('top right', params)}</td>
                </tr>
                <tr>
                    <td>{this.renderPopup('middle left', params)}</td>
                    <td></td>
                    <td>{this.renderPopup('middle right', params)}</td>
                </tr>
                <tr>
                    <td>{this.renderPopup('bottom left', params)}</td>
                    <td>{this.renderPopup('bottom center', params)}</td>
                    <td>{this.renderPopup('bottom right', params)}</td>
                </tr>
                </tbody>
            </table>
        );
    }

    changePopupClassName(option) {
        this.setState({popover: {popupClassName: option}});
    }


    handlePopupStateChange(open) {
        if (open) {
            if (!window.confirm('Are you sure you want to open Popup?')) {
                return;
            }
        }
        this.setState({open});
    }

    hidePopup() {
        this.setState({open: false});
    }

    build(level) {
        if (level >= 5) {
            return {
                level: level
            };
        } else {
            return {
                level: level,
                child: this.build(level + 1)
            };
        }
    }

    render() {
        let options = popupClassNames.map((item, index) => {
            return {id: index, displayString: item};
        });

        return (
            <div>
                <h2>
                    Variations
                </h2>
                <DemoWithSnippet>
                    <Popup attachment="top right">
                        <button>
                            default
                        </button>
                        Default popup
                    </Popup>

                    <Popup attachment="top right" popupClassName="tooltip">
                        <button>
                            black
                        </button>
                        Black popup
                    </Popup>
                </DemoWithSnippet>

                <h2>
                    Content
                </h2>

                <div>
                    Popup can be configured to be opened on click and with any content
                </div>
                <DemoWithSnippet>
                    <Popup attachment="bottom left" on="click">
                        <div>
                            <button>
                                Click to open
                            </button>
                        </div>
                        <div>
                            <div onClick={() => {alert('What\'s new');}}><span>What's new</span></div>
                            <div><span>Settings</span></div>
                            <div><span>Logout</span></div>
                        </div>
                    </Popup>
                </DemoWithSnippet>

                <h2>
                    Modal
                </h2>

                <div>
                    Popup can be Modal
                </div>
                <DemoWithSnippet>
                    <Popup on="click" modal attachment="middle center" popupClassName="popup">
                        <div>
                            <button>
                                Popup+overlay
                            </button>
                        </div>
                        <div>
                            <h3> - Modal pop-up content - </h3>
                        </div>
                    </Popup>

                    <Popup on="click" modal attachment="middle center" popupClassName="popup popup-blue-border">
                        <div>
                            <button>
                                Popup+overlay+blue-border
                            </button>
                        </div>
                        <div>
                            <h3> - Modal pop-up content - </h3>
                        </div>
                    </Popup>
                </DemoWithSnippet>

                <h2>Positioning</h2>

                <Select options={options} onChange={(option) => {this.changePopupClassName(popupClassNames[option]);}}/>

                <DemoWithSnippet>
                    {this.renderPositioned(this.state.popover)}
                </DemoWithSnippet>


                <h2>Popup can be controlled</h2>
                <DemoWithSnippet>
                    <Popup modal
                           on="click"
                           attachment="middle center"
                           popupClassName="popup popup-blue-border"
                           open={this.state.open}
                           onPopupStateChange={(open) => {this.handlePopupStateChange(open);}}>
                        <button>Show Popup</button>
                        <div>
                            Content <br/>

                            <button onClick={() => this.hidePopup()}>Hide</button>
                        </div>
                    </Popup>
                </DemoWithSnippet>

                <h2>Popups can be nested</h2>
                <DemoWithSnippet>
                    <NestedPopup {...this.build(0)} />
                </DemoWithSnippet>

            </div>
        );
    }
}

class NestedPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    renderChild() {
        if (this.props.child) {
            return (
                <NestedPopup {...this.props.child} />
            );
        } else {
            return (
                <div>{this.props.level}</div>
            );
        }
    }

    render() {
        return (
            <Popup on="click"
                   attachment="bottom left"
                   popupClassName="popover-colored">
                <button>{`Show level: ${this.props.level}`}</button>
                <div style={{height: '200px',width: '200px'}}>
                    {this.renderChild()}
                    {this.renderChild()}
                </div>
            </Popup>
        );
    }
}
