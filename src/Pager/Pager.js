import React, { PropTypes } from 'react';
import classNames from 'classnames';

const PROPERTY_TYPES = {
    onPrevBtnClick: React.PropTypes.func,
    onNextBtnClick: React.PropTypes.func,
    value: React.PropTypes.any,
    prevBtnIcon: PropTypes.string,
    nextBtnIcon: PropTypes.string
};

const DEFAULT_PROPS = {
    prevBtnIcon: 'im icon-arrow-thin-left',
    nextBtnIcon: 'im icon-arrow-thin-right'
};

class Pager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = classNames('ros-pager', this.props.className);
        let nextBtnStyle = classNames('ros-pager__btn', this.props.nextBtnIcon);
        let prevBtnStyle = classNames('ros-pager__btn', this.props.prevBtnIcon);

        return (
            <div className={style}>
                <i
                    className={prevBtnStyle}
                    onClick={() => {
                        if (this.props.onPrevBtnClick) {
                            this.props.onPrevBtnClick();
                        }
                    }}
                />
                <div className="ros-pager__value">{this.props.children}</div>
                <i
                    className={nextBtnStyle}
                    onClick={() => {
                        if (this.props.onNextBtnClick) {
                            this.props.onNextBtnClick();
                        }
                    }}
                />
            </div>
        );
    }
}

Pager.propTypes = PROPERTY_TYPES;
Pager.defaultProps = DEFAULT_PROPS;

export default Pager;
