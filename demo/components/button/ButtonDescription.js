import React from 'react';
import {Button} from '../../../src';
import ButtonGroup from '../../../src/components/button/ButtonGroup';


export default () => {
    return (
        <div className="demo-content">
            <h1>Buttons</h1>

            {/* -------  BUTTON LABEL -------  */}


            <h2>Button labels</h2>
            <p>
                They should be as short as possible, while clearly explaining to users what
                happens when people click the button. Usually meaning of the button need to
                be self explained inside context.</p>
            <table className="demo-table">
                <thead>
                    <tr>
                        <td>Good example</td>
                        <td>Bad example</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Button className="btn btn--primary">Save</Button>
                        </td>
                        <td>
                            <Button className="btn btn--primary">Save efforts input</Button>
                        </td>
                    </tr>
                    <tr>
                        <td><Button className="btn btn--primary">Resend</Button></td>
                        <td><Button className="btn btn--primary">Resend new requests</Button></td>
                    </tr>
                    <tr>
                        <td><a href="#">Open document</a></td>
                        <td><a href="#">Click here</a></td>
                    </tr>
                </tbody>
            </table>

            <div className="separator-block"></div>



            {/* -------  BUTTON ORDER -------  */}

            <h2>Button order</h2>
            <p>Buttons are sorted by importance from left to right.</p>
            <div>
                <table className="demo-table demo--no-border">
                    <tbody>
                        <tr>
                            <td>
                                <Button className="btn btn--primary">
                                    Primary
                                </Button>
                            </td>
                            <td>
                                <Button className="btn btn--default">
                                    Default
                                </Button>
                            </td>
                            <td>
                                <Button className="btn-link">
                                    Button Link
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                The only exception to the rule is when buttons are used to move back and
                forth within a sequence of screens (i.e. a wizard). In such a case, the 'Back'
                standard button would be on the left.
            </p>

            <div className="separator-block"></div>

            <h2>Button types</h2>
            <table className="demo-table">
                <thead>
                    <tr>
                        <td>Buttons</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Button className="btn btn--primary">
                                Primary
                            </Button>
                        </td>
                        <td>
                            The happy path action on forms, and the strongest call to action on a page.
                            It can only ever appear once per screen (not including the application header;
                            can appear in a modal dialog, ignoring what's on the main page).
                            Not every screen needs a primary button.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button className="btn btn--success">
                                Success
                            </Button>
                        </td>
                        <td>
                            In case if we need more emphasis for successful action, if on screen primary
                            button already used, success button could be helpful.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button className="btn btn--danger">
                                Danger
                            </Button>
                        </td>
                        <td>
                            Some actions need to have more emphasis and meaning. For example Delete user,
                            or other actions that could be revertible.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button className="btn btn--warning">
                                Warning
                            </Button>
                        </td>
                        <td>
                            Button for action with potential risk to user status or actions that
                            could have unpredictable or not stable sequence in future.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button className="btn btn--default">
                                Default
                            </Button>
                        </td>
                        <td>The generic button for most use cases.</td>
                    </tr>
                    <tr>
                        <td>
                            <Button className="btn-link">
                                Button Link
                            </Button>
                        </td>
                        <td>
                            Used for secondary actions, destructive actions such as "Cancel", or to discourage usage.
                            Link buttons should open in the current window unless:
                            <ul>
                                <li>The user may lose information, e.g. when filling out a form</li>
                                <li>The destination is an external site, e.g. for a knowledge base article</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Dropdown button here
                        </td>
                        <td>
                            Trigger menus with a set of related actions.
                            The label of the button has to convey the underlying actions sensibly.
                            See Dropdowns
                        </td>
                    </tr>
                </tbody>
            </table>



            {/* -------  BUTTON SIZE -------  */}

            <div className="separator-block"></div>

            <h2>Button sizes</h2>
            <p>
                For different interface context we use different button sizes.
            </p>

            <table className="demo-table">
                <thead>
                    <tr>
                        <td>Button</td>
                        <td>Height</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Button className="btn btn-sm btn--default">Small button</Button>
                        </td>
                        <td>26px</td>
                        <td>
                            Best to use for limited screen space or for actions that don`t need a lot of emphasis.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button className="btn btn-m btn--default">Medium button</Button>
                        </td>
                        <td>36px</td>
                        <td>
                            Default button size. Use this button in most cases.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button className="btn btn-lg btn--default">Large button</Button>
                        </td>
                        <td>44px</td>
                        <td>
                            Button size for special cases, when we need additional visual impact and
                            recognition to highlight importance of the action.
                        </td>
                    </tr>
                </tbody>
            </table>



            {/* -------  BUTTON VARIATIONS -------  */}

            <div className="separator-block"></div>

            <h2>Button variations</h2>
            <p>
                These variations can be used against all button types. For button groups on your page,
                only choose one type of variation, do not mix them.
            </p>

            <table className="demo-table">
                <thead>
                    <tr>
                        <td>Button</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Button className="btn btn--default">
                                Default
                            </Button>
                        </td>
                        <td>The most generic use case.</td>
                    </tr>
                    <tr>
                        <td>
                            <Button className="btn btn--default btn--icon">
                                <i className="ion ion-edit"></i>
                                Icon label
                            </Button>
                        </td>
                        <td>
                            When you want to draw more attention than usual to the button, or when
                            an icon helps to convey the meaning of the button.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button className="btn btn--default btn--icon btn--icon--one">
                                <i className="ion ion-edit"></i>
                            </Button>
                        </td>
                        <td>Icon only button. When space is constrained and the function of the button
                            is obvious. Using a button with a label is preferred over this approach.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button className="btn btn--default btn--flat">
                                Flat
                            </Button>
                        </td>
                        <td>
                            Used when a toolbar or standard buttons would otherwise draw attention away
                            from more important content. It is often used at the top of a page or section.
                            An icon must be used with this variation.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button disabled className="btn btn--default">
                                Disabled
                            </Button>
                        </td>
                        <td>
                            Used when an action has to be fulfilled first before the button action is
                            usable, e.g. changing a field value, waiting for a system response, etc.
                            Only for primary and standard button types.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Dropdown
                        </td>
                        <td>
                            Trigger menus with a set of related actions. The label of the button has
                            to convey the underlying actions sensibly. See Dropdowns
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button className="btn btn--default btn--round">
                                <i className="ion ion-edit"></i>
                            </Button>
                        </td>
                        <td>
                            Round button. For action that could be available on screen.
                            Usually located on screen corners (regulary - bottom right)
                        </td>
                    </tr>
                </tbody>
            </table>




            {/* -------  BUTTON VARIATIONS -------  */}

            <div className="separator-block"></div>

            <h2>Grouped buttons</h2>
            <p>
                Grouped buttons give users access to frequently performed actions of a focused
                task or switch between screen states.
            </p>


        </div>
    );
};


