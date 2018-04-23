declare module 'rosemary-ui' {
    export interface Option {
        id: number;
        displayString: string;
    }
    export import NavBar = __RosemaryUI.NavBar;
    export import DatePicker = __RosemaryUI.DatePicker;
    export import DatePickerCalendar = __RosemaryUI.DatePickerCalendar;
    export import NavDropDownItem = __RosemaryUI.NavDropDownItem;
    export import NavHrefItem = __RosemaryUI.NavHrefItem;
    export import NavItem = __RosemaryUI.NavItem;
    export import DatePickerPopup = __RosemaryUI.DatePickerPopup;
    export import DateRangePicker = __RosemaryUI.DateRangePicker;
    export import EventPlanner = __RosemaryUI.EventPlanner;
    export import Alert = __RosemaryUI.Alert;
    export import Avatar = __RosemaryUI.Avatar;

    export import Button = __RosemaryUI.Button;
    export import ButtonProps = __RosemaryUI.ButtonProps;

    export import Confirmation = __RosemaryUI.Confirmation;
    export import CheckBox = __RosemaryUI.CheckBox;
    export import Feedback = __RosemaryUI.NavBar;
    export import FeedbackCard = __RosemaryUI.FeedbackCard;
    export import FeedbackManager = __RosemaryUI.FeedbackManager;
    export import FormField = __RosemaryUI.FormField;
    export import InputIcon = __RosemaryUI.Input;
    export import Label = __RosemaryUI.Label;
    export import Link = __RosemaryUI.Link;
    export import MonthPager = __RosemaryUI.MonthPager;
    export import MonthPicker = __RosemaryUI.MonthPicker;
    export import MonthPickerCalendar = __RosemaryUI.MonthPickerCalendar;
    export import MonthPickerPopup = __RosemaryUI.MonthPickerPopup;
    export import MultiSelect = __RosemaryUI.MultiSelect;
    export import Pager = __RosemaryUI.Pager;
    export import Popup = __RosemaryUI.Popup;
    export import Modal = __RosemaryUI.Modal;
    export import Radio = __RosemaryUI.Radio;
    export import RadioGroup = __RosemaryUI.RadioGroup;
    export import Select = __RosemaryUI.Select;
    export import SelectGrouped = __RosemaryUI.SelectGrouped;
    export import Switch = __RosemaryUI.Switch;
    export import Table = __RosemaryUI.Table;
    export import Tabs = __RosemaryUI.Tabs;
    export import Tab = __RosemaryUI.Tab;
    export import TextArea = __RosemaryUI.TextArea;
    export import Input = __RosemaryUI.TextArea;
    export import GroupedMultiSelect = __RosemaryUI.GroupedMultiSelect;
    export import MultiSelectPopup = __RosemaryUI.MultiSelectPopup;
}

declare namespace __RosemaryUI {
    class DatePicker extends React.Component<any> {}

    class DatePickerCalendar extends React.Component<any> {}

    class NavBar extends React.Component<any> {}

    class NavDropDownItem extends React.Component<any> {}

    class NavHrefItem extends React.Component<any> {}

    class NavItem extends React.Component<any> {}

    class DatePickerPopup extends React.Component<any> {}

    class DateRangePicker extends React.Component<any> {}

    class EventPlanner extends React.Component<any> {}

    class Alert extends React.Component<any> {
        static Type: any;
    }

    class Avatar extends React.Component<any> {}

    type ButtonProps = {
        onClick?: ((e?: React.MouseEvent<any>) => void) | any;
        selected?: boolean;
        disabled?: boolean;
        className?: string;
        title?: string;
        value?: string;
        testId?: string;
        as?: string;
        href?: string;
        baseClassName?: string;
    } & React.HTMLAttributes<{}>;

    class Button extends React.Component<ButtonProps> {}
    class Confirmation extends React.Component<any> {}

    class CheckBox extends React.Component<any> {}

    class Feedback extends React.Component<any> {}

    class FeedbackCard extends React.Component<any> {}

    class FeedbackManager extends React.Component<any> {}

    class FormField extends React.Component<any> {}

    class Input extends React.Component<any> {}

    class InputIcon extends React.Component<any> {}

    class Label extends React.Component<any> {}

    class Link extends React.Component<any> {}

    class MonthPager extends React.Component<any> {}

    class MonthPicker extends React.Component<any> {}

    class MonthPickerCalendar extends React.Component<any> {}

    class MonthPickerPopup extends React.Component<any> {}

    class MultiSelect extends React.Component<any> {}

    class Pager extends React.Component<any> {}

    class Popup extends React.Component<any> {}

    type ModalProps = {
        open?: boolean;
        on?: string;
        trigger?: React.ReactNode;
        closeOnClickOutside?: boolean;
        popupClassName?: string;
        onClose?: () => void;
    };
    class Modal extends React.Component<ModalProps> {}

    class Radio extends React.Component<any> {}

    class RadioGroup extends React.Component<any> {}

    class Select extends React.Component<any> {}

    class SelectGrouped extends React.Component<any> {}

    class Switch extends React.Component<any> {}

    type TableHeaderCell = {
        el: React.ReactNode;
        key: string | number;
    };

    type TableProps = {
        data: any;
        cells: (item) => Array<React.ReactNode>;
        rowIndex: (item: any) => string | number;
        className?: string;
        sorted?: {
            key: any;
            direction: any;
        };
        colgroup?: any[];
        colSpanBottom?: number;
        defSorting?: number;
        rowStyle?: (item: any) => string;
        bottomSection?: React.ReactNode;
        headerCells?: () => Array<any>;
        onHeaderClick?: (key: any, index: number, el: TableHeaderCell, direction: string) => void;
        rowDetails?: {};
        row?: {};
        testId?: any;
    };

    class Table extends React.Component<TableProps> {}

    class Tabs extends React.Component<any> {}

    class Tab extends React.Component<any> {}

    class TextArea extends React.Component<any> {}

    class GroupedMultiSelect extends React.Component<any> {}

    class MultiSelectPopup extends React.Component<any> {}
}

declare module 'rosemary-ui/NavBar' {
    export import NavBar = __RosemaryUI.NavBar;
    export default NavBar;
}
declare module 'rosemary-ui/NavBar/NavDropDownItem' {
    export import NavDropDownItem = __RosemaryUI.NavDropDownItem;
    export default NavDropDownItem;
}
declare module 'rosemary-ui/NavBar/NavHrefItem' {
    export import NavHrefItem = __RosemaryUI.NavHrefItem;
    export default NavHrefItem;
}
declare module 'rosemary-ui/NavBar/NavItem' {
    export import NavItem = __RosemaryUI.NavItem;
    export default NavItem;
}

declare module 'rosemary-ui/EventPlanner' {
    export import EventPlanner = __RosemaryUI.EventPlanner;
    export default EventPlanner;
}

declare module 'rosemary-ui/Alert' {
    export import Alert = __RosemaryUI.Alert;
    export default Alert;
}
declare module 'rosemary-ui/Avatar' {
    export import Avatar = __RosemaryUI.Avatar;
    export default Avatar;
}
declare module 'rosemary-ui/Button' {
    export import Button = __RosemaryUI.Button;
    export default Button;

    import ButtonProps = __RosemaryUI.ButtonProps;
    export { ButtonProps };
}
declare module 'rosemary-ui/CheckBox' {
    export import CheckBox = __RosemaryUI.CheckBox;
    export default CheckBox;
}
declare module 'rosemary-ui/Confirmation' {
    export import Confirmation = __RosemaryUI.Confirmation;
    export default Confirmation;
}
declare module 'rosemary-ui/DatePicker' {
    export import DatePicker = __RosemaryUI.DatePicker;
    export default DatePicker;
}
declare module 'rosemary-ui/DatePicker/DatePickerCalendar' {
    export import DatePickerCalendar = __RosemaryUI.DatePickerCalendar;
    export default DatePickerCalendar;
}
declare module 'rosemary-ui/DatePicker/DatePickerPopup' {
    export import DatePickerPopup = __RosemaryUI.DatePickerPopup;
    export default DatePickerPopup;
}
declare module 'rosemary-ui/DateRangePicker' {
    export import DateRangePicker = __RosemaryUI.DateRangePicker;
    export default DateRangePicker;
}
declare module 'rosemary-ui/Feedback' {
    export import Feedback = __RosemaryUI.Feedback;
    export default Feedback;
}
declare module 'rosemary-ui/Feedback/FeedbackCard' {
    export import FeedbackCard = __RosemaryUI.FeedbackCard;
    export default FeedbackCard;
}
declare module 'rosemary-ui/Feedback/types' {
    type FeedbackTypes = { error: 'error'; warning: 'warning'; info: 'info'; success: 'success' };
    const types: FeedbackTypes;

    export default types;
}

declare module 'rosemary-ui/Feedback/FeedbackManager' {
    export import FeedbackManager = __RosemaryUI.FeedbackManager;
    export default FeedbackManager;
}

declare module 'rosemary-ui/FormField' {
    export import FormField = __RosemaryUI.FormField;
    export default FormField;
}
declare module 'rosemary-ui/Input' {
    export import Input = __RosemaryUI.Input;
    export default Input;
}
declare module 'rosemary-ui/InputIcon' {
    export import InputIcon = __RosemaryUI.InputIcon;
    export default InputIcon;
}
declare module 'rosemary-ui/Label' {
    export import Label = __RosemaryUI.Label;
    export default Label;
}
declare module 'rosemary-ui/Link' {
    export import Link = __RosemaryUI.Link;
    export default Link;
}
declare module 'rosemary-ui/MonthPager' {
    export import MonthPager = __RosemaryUI.MonthPager;
    export default MonthPager;
}
declare module 'rosemary-ui/MonthPicker' {
    export import MonthPicker = __RosemaryUI.MonthPicker;
    export default MonthPicker;
}

declare module 'rosemary-ui/MonthPicker/MonthPickerCalendar' {
    export import MonthPickerCalendar = __RosemaryUI.MonthPickerCalendar;
    export default MonthPickerCalendar;
}

declare module 'rosemary-ui/MonthPicker/MonthPickerPopup' {
    export import MonthPickerPopup = __RosemaryUI.MonthPickerPopup;
    export default MonthPickerPopup;
}
declare module 'rosemary-ui/MultiSelect' {
    export import MultiSelect = __RosemaryUI.MultiSelect;
    export default MultiSelect;
}

declare module 'rosemary-ui/Pager' {
    export import Pager = __RosemaryUI.Pager;
    export default Pager;
}
declare module 'rosemary-ui/Popup' {
    export import Popup = __RosemaryUI.Popup;
    export default Popup;
}
declare module 'rosemary-ui/Modal' {
    export import Modal = __RosemaryUI.Modal;
    export default Modal;
    import ModalProps = __RosemaryUI.ModalProps;
    export { ModalProps };
}
declare module 'rosemary-ui/Radio' {
    export import Radio = __RosemaryUI.Radio;
    export default Radio;
}
declare module 'rosemary-ui/Radio/RadioGroup' {
    export import RadioGroup = __RosemaryUI.RadioGroup;
    export default RadioGroup;
}
declare module 'rosemary-ui/Select' {
    export import Select = __RosemaryUI.Select;
    export default Select;
}
declare module 'rosemary-ui/Select/SelectGrouped' {
    export import SelectGrouped = __RosemaryUI.SelectGrouped;
    export default SelectGrouped;
}
declare module 'rosemary-ui/Switch' {
    export import Switch = __RosemaryUI.Switch;
    export default Switch;
}
declare module 'rosemary-ui/Table' {
    export import Table = __RosemaryUI.Table;
    export default Table;
}
declare module 'rosemary-ui/Tabs' {
    export import Tabs = __RosemaryUI.Tabs;
    export default Tabs;
}
declare module 'rosemary-ui/Tabs/Tab' {
    export import Tab = __RosemaryUI.Tab;
    export default Tab;
}
declare module 'rosemary-ui/TextArea' {
    export import TextArea = __RosemaryUI.TextArea;
    export default TextArea;
}
declare module 'rosemary-ui/GroupedMultiSelect' {
    export import GroupedMultiSelect = __RosemaryUI.GroupedMultiSelect;
    export default GroupedMultiSelect;
}

declare module 'rosemary-ui/MultiSelectPopup' {
    export import MultiSelectPopup = __RosemaryUI.MultiSelectPopup;
    export default MultiSelectPopup;
}
