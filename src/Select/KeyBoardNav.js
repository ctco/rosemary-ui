import React from 'react';
import { KeyCode } from '../util/constant/key-codes';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

const STEP_BACK = -1;
const STEP_FORWARD = 1;

export default isMulti =>
    function keyBoardNav(Wrapper) {
        class Enhance extends Wrapper {
            static get displayName() {
                return Wrapper.displayName || Wrapper.name;
            }

            constructor(props) {
                super(props);
                let index = this._findOptionIndex(this.props.value, this.props.options);
                this._optionIndex = index >= 0 ? index : null;
                this.state = {
                    ...this.state,
                    tempSelection: this.props.options[this._optionIndex]
                };
            }

            //API
            resetNav() {
                this.setState({
                    tempSelection: null
                });
                this._optionIndex = null;
            }

            navigate(e, option) {
                switch (e && e.keyCode) {
                    case KeyCode.ENTER:
                        super.select(this.state.tempSelection);
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

            _stopEvent(event) {
                event.stopPropagation();
                event.preventDefault();
            }

            _findById(options, id) {
                return find(options, option => option && option.id === id);
            }

            _setTempOption(index) {
                this.setState(
                    {
                        tempSelection: super.getOptions()[index]
                    },
                    () => {
                        this._getSelectedOptionEl() && this._getSelectedOptionEl().focus();
                        super.getInput().focus();
                    }
                );
            }

            _getInitialIndex(step) {
                if (step === STEP_FORWARD) {
                    return 0;
                } else if (step === STEP_BACK) {
                    return this._optionLength() - 1;
                }
            }

            _getNextOptionIndex(step) {
                if (this._optionIndex === null) {
                    return this._getInitialIndex(step);
                }

                let futureStep = this._optionIndex + step;
                if (isMulti && (futureStep < 0 || futureStep > this._getOptions().length - 1)) {
                    return this._optionIndex;
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

            _select(option) {
                if (!option) {
                    return;
                }
                super.select(option);
            }

            _getSelectedOptionEl() {
                return super.getSelectedOptionEl();
            }

            _getOptions() {
                return this.state.filtered;
            }

            _findOptionIndex(id, options = []) {
                return findIndex(options, option => {
                    return id === option.id;
                });
            }

            _changeTarget(target) {
                this._optionIndex = this._findOptionIndex(target.id, this._getOptions());
                this.setState({
                    tempSelection: target
                });
            }
        }

        return Enhance;
    };
