define(function(require) {
    'use strict';

    var React = require('react');
    var _ = require('lodash');

    var iconClasses = {
        close: 'fa fa-close'
    };

    return React.createClass({
        displayName: 'Modal',

        propTypes: {
            closeModalCallback: React.PropTypes.func,
            backgroundClickToClose: React.PropTypes.bool,
            iconClasses: React.PropTypes.object,
            showCloseIcon: React.PropTypes.bool,
            title: React.PropTypes.string
        },

        getDefaultProps: function() {
            return {
                backgroundClickToClose: true,
                showCloseIcon: true
            };
        },

        getInitialState: function() {
            this.iconClasses = _.merge(_.clone(iconClasses), this.props.iconClasses);

            return {};
        },

        componentDidMount: function() {
            this.refs.content.getDOMNode().focus();
        },

        componentDidUpdate: function() {
            this.refs.content.getDOMNode().focus();
        },

        /**
         * Gets markup to display close icon in upper right corner. Only returns markup if
         * the showCloseIcon prop is set.
         * @return {null|ReactElement} Icon markup or null
         */
        getCloseIconMarkup: function(){
            if(!this.props.showCloseIcon){
                return null;
            }
            return (
                React.createElement("span", {className: "close", onClick: this.closeModalHandler}, 
                    React.createElement("span", {className: "close-text"}, "esc to close"), " | ", React.createElement("i", {className: this.iconClasses.close})
                )
            );
        },

        render: function() {
            return (
                React.createElement("div", {onClick: this.backgroundClickHandler, id: "modal-container", "data-clickcatcher": "true"}, 
                    React.createElement("div", {ref: "content", className: "content", tabIndex: "-1", onKeyDown: this.keyDownHandler}, 
                        React.createElement("div", {className: "header"}, 
                            React.createElement("span", {className: "title"}, this.props.title), 
                            this.getCloseIconMarkup()
                        ), 
                        React.createElement("div", {className: "body"}, 
                            this.props.children
                        )
                    )
                )
            );
        },

        /**
         * If the key pressed is the escape key and the close icon is being shown, the close modal handler will be called.
         * @param {object} e - The simulated React event.
         */
        keyDownHandler: function(e) {
            // escape key pressed
            if (e.keyCode === 27 && this.props.showCloseIcon) {
                this.closeModalHandler(e);
            }
        },

        /**
         * Captures any click event outside the modal and calls the close modal handler.
         * @param {Object} e - The simulated React event.
         */
        backgroundClickHandler: function(e) {
            if (this.props.backgroundClickToClose && e.target.getAttribute('data-clickcatcher')) {
                this.closeModalHandler(e);
            }
        },

        /**
         * Triggered when clicking outside the modal, clicking on the close button, and when pressing escape.
         * @param {Object} e - The simulated React event.
         */
        closeModalHandler: function(e) {
            e.stopPropagation();

            if (typeof this.props.closeModalCallback === 'function') {
                this.props.closeModalCallback();
            }
            else {
                React.unmountComponentAtNode(this.getDOMNode().parentNode);
            }
        }
    });
});
