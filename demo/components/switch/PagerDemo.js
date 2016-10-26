import React from 'react';

import {Pager, MonthPager} from '../../../src';

export default class PagerDemo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            month: '01.10.2016'
        };
    }

    render() {
        return (
            <div>
                <Pager
                    onPrevBtnClick={() => {
                        this.setState({
                            count: this.state.count - 1
                        });
                    }}
                    onNextBtnClick={() => {
                        this.setState({
                            count: this.state.count + 1
                        });
                    }}
                >
                    {this.state.count}
                </Pager>
                <MonthPager
                    onChange={(month) => this.setState({month})}
                    value={this.state.month}
                    format="DD.MM.YYYY"
                />
            </div>
        );
    }
}