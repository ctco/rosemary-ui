/* TODO: either use:
    this.props.children.map(c => React.cloneElement(c, {className: classNames(child.props.className, 'btn--grouped')}))
    OR
    fix _button.scss:106 .btn--grouped {..} to .btn--grouped > .btn {..}
 */
import React from 'react';
export default class ButtonGroup extends React.Component {
    render() {
        return <div className="btn--grouped">{this.props.children}</div>;
    }
}
