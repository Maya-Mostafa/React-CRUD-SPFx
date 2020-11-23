var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import styles from './ReactCrud.module.scss';
import { SPOperations } from '../../Services/SPServices';
import { Button, Dropdown, TextField } from "office-ui-fabric-react";
import { escape } from '@microsoft/sp-lodash-subset';
var ReactCrud = /** @class */ (function (_super) {
    __extends(ReactCrud, _super);
    function ReactCrud(props) {
        var _this = _super.call(this, props) || this;
        _this.getListTitle = function (event, data) {
            console.log("dpd data", data);
            _this.selectedListTitle = data.text;
        };
        _this.getListItemTitleVal = function (event, data) {
            console.log("text data", data);
            _this.listItemTitleVal = data;
        };
        _this.getListItemID = function (event, data) {
            _this.listItemID = parseInt(data);
        };
        _this._spOps = new SPOperations();
        _this.state = { listTitles: [], status: "" };
        return _this;
    }
    ReactCrud.prototype.componentDidMount = function () {
        var _this = this;
        this._spOps.GetAllList(this.props.context).then(function (result) {
            _this.setState({ listTitles: result });
        });
    };
    ReactCrud.prototype.render = function () {
        //let option: IDropdownOption[] = [];
        var _this = this;
        return (React.createElement("div", { className: styles.reactCrud },
            React.createElement("p", null, escape(this.props.description)),
            React.createElement("p", null, escape(this.props["Percent Completed"])),
            React.createElement("p", null, escape(this.props.ListUrl)),
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.row },
                    React.createElement("div", { className: styles.column },
                        React.createElement("span", { className: styles.title }, "Welcome to SPFx CRUD!"),
                        React.createElement("p", { className: styles.subTitle }, "Demo CRUD, Fabric"),
                        React.createElement("div", { id: "dv_Parent" },
                            React.createElement("p", null, "Display all list titles in the dropdown"),
                            React.createElement(Dropdown, { options: this.state.listTitles, placeholder: "***Select your List***", onChange: this.getListTitle }),
                            React.createElement(TextField, { className: styles.marginT20, onChange: this.getListItemTitleVal, placeholder: "Type in the Title for the list item" }),
                            React.createElement(Button, { text: "Create List Item", onClick: function () {
                                    return _this._spOps
                                        .CreateListItem(_this.props.context, _this.selectedListTitle, _this.listItemTitleVal).then(function (result) {
                                        _this.setState({ status: result });
                                    });
                                } }),
                            React.createElement(TextField, { onChange: this.getListItemID, className: styles.marginT20, placeholder: "Type in the ID for the item to be deleted" }),
                            React.createElement(Button, { text: "Delete List Item", onClick: function () {
                                    return _this._spOps
                                        .DeleteListItem(_this.props.context, _this.selectedListTitle, _this.listItemID).then(function (result) {
                                        _this.setState({ status: result });
                                    });
                                } }),
                            React.createElement(Button, { text: "Update List Item", onClick: function () {
                                    return _this._spOps
                                        .UpdateListItem(_this.props.context, _this.selectedListTitle, _this.listItemTitleVal, _this.listItemID).then(function (result) {
                                        _this.setState({ status: result });
                                    });
                                } }),
                            React.createElement("div", null, this.state.status)))))));
    };
    return ReactCrud;
}(React.Component));
export default ReactCrud;
//# sourceMappingURL=ReactCrud.js.map