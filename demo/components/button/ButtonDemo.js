import React from 'react';
import {Button, Link} from '../../../src';
import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';

export default () => {
    return (
        <DemoWithSnippet>
            <table>
                <tr>
                    <td>
                        <Button className="btn btn--sm">Small button</Button>
                    </td>
                    <td>
                        <Button className="btn btn--m">Medium button</Button>
                    </td>
                    <td>
                        <Button className="btn btn--lg">Large button</Button>
                    </td>
                    <td>
                        <Button className="btn btn--default">
                            Default
                        </Button>
                    </td>
                </tr>

            </table>
            <table>
                <tr>
                    <td>

                        <Button className="btn btn--primary">
                            Primary
                        </Button>
                    </td>
                    <td>
                        <Button className="btn btn--success">
                            Success
                        </Button>
                    </td>
                    <td>
                        <Button className="btn btn--danger">
                            Danger
                        </Button>
                    </td>
                    <td>
                        <Button className="btn btn--warning">
                            Warning
                        </Button>
                    </td>
                    <td>
                        <Button disabled className="btn btn--primary">
                            Disabled
                        </Button>
                    </td>
                    <td>

                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>
                        <Button className="btn-link btn--sm">
                            Button Link
                        </Button>
                    </td>
                    <td>

                        <Button className="btn-link btn--m">
                            Button Link
                        </Button>
                    </td>
                    <td>
                        <Button className="btn-link btn--lg">
                            Button Link
                        </Button>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>
                        <div className="btn btn--icon">
                            <i className="icon im icon-flame"/>
                        </div>
                    </td>
                    <td>
                        <Button className="btn btn--sm">Small button</Button>
                        <div className="btn btn--sm btn--icon btn--icon-danger">
                            <i className="icon icon--xxs im icon-close"/>
                        </div>
                    </td>
                    <td>
                        <div className="btn btn--sm btn--icon btn--icon-success">
                            <i className="im icon-ok"/>
                        </div>
                    </td>
                    <td>
                        <div className="btn btn--lg btn--icon">
                            <i className="im icon-flame"/>
                        </div>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>
                        <Button disabled title="title" className="btn btn--primary">
                            disabled with title
                        </Button>
                    </td>
                </tr>
            </table>

            <br/>
            <Link className="someClass" href="wwww.google.com">link</Link>
        </DemoWithSnippet>
    );
};
