import React from 'react';
import {KeyCode} from '../../constant/key-codes';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

const STEP_BACK = -1;
const STEP_FORWARD = 1;

export default function KeyBoardNavigationHOC(isMultiSelect) {
    return (Wrapper) => class PP extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                tempSelection: this._findById(this.props.options, props.value)
            };
            this._optionIndex = this._findOptionIndex(this.state.tempSelection, this.props.options);

        }

        _stopEvent(event) {
            event.stopPropagation();
            event.preventDefault();
        }

        _clearIndex() {
            this._optionIndex = null;
        }

        _resetNavigation(selectedOption) {
            if (isMultiSelect) {
                this._clearIndex();
            } else {
                this.setState({
                    tempSelection: selectedOption
                });
                this._optionIndex = this._findOptionIndex(selectedOption, this._getOptions());
            }
        }

        _clearTempOption() {
            this.setState({
                tempSelection: null
            });
        }

        _findById(options, id) {
            return find(options, (option) => option && (option.id === id));
        }

        _setTempOption(index) {
            this.setState({
                tempSelection: this._getOptions()[index]
            }, () => {
                this._getSelectedOptionEl() && this._getSelectedOptionEl().focus();
                this._focusInput();
            });
        }

        _getInitialIndex(step) {
            if (step === STEP_FORWARD) {
                return 0;
            } else if (step === STEP_BACK) {
                return this._optionLength() - 1;
            }
        }

        _getNextOptionIndex(step) {
            let futureStep = this._optionIndex + step;
            if (isMultiSelect && (futureStep < 0
                || futureStep > this._optionLength() - 1)) {
                return this._optionIndex;
            }
            if (this._optionIndex === null) {
                return this._getInitialIndex(step);
            }

            this._optionIndex += step;

            if (this._optionIndex >= this._optionLength() || this._optionIndex < 0) {
                this._optionIndex = this._getInitialIndex(step);
            }

            return this._optionIndex;
        }

        _optionLength() {
            return this._getOptions().length;
        }

        _navigate(e, option) {
            switch (e && e.keyCode) {

                case KeyCode.ENTER:
                    this._select(this.state.tempSelection);
                    break;

                case KeyCode.UP_ARROW:
                    this._stopEvent(e);

                    this._optionIndex = this._getNextOptionIndex(STEP_BACK);
                    this._setTempOption(this._optionIndex);
                    break;
                case KeyCode.DOWN_ARROW:
                    this._stopEvent(e);

                    this._optionIndex = this._getNextOptionIndex(STEP_FORWARD);
                    this._setTempOption(this._optionIndex);
                    break;

            }
            if (option) {
                this._changeTarget(option);
            }

        }

        _select(option) {
            this._component.select(option);
        }

        _focusInput() {
            this._component.getInput().focus();
        }

        _getSelectedOptionEl() {
            return this._component.getSelectedOptionEl();
        }

        _getOptions() {
            return this._component.getOptions() || [];
        }

        _findOptionIndex(target = {}, options = []) {
            return findIndex(options, (option) => {
                return target.id === option.id;
            });
        }

        _changeTarget(target) {
            this._optionIndex = this._findOptionIndex(target, this._getOptions());

            this.setState({
                tempSelection: target
            });

        }

        render() {
            let newProps = {
                navigate: this._navigate.bind(this),
                resetNavigation: this._resetNavigation.bind(this),
                tempSelection: this.state.tempSelection
            };
            return <Wrapper ref={(component) => this._component = component} {...newProps} {...this.props} />;
        }
    };
}
