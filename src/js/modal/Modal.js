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
            title: React.PropTypes.string
        },

        getDefaultProps: function() {
            return {
                backgroundClickToClose: true
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

        render: function() {
            return (
                <div onClick={this.backgroundClickHandler} id="modal-container" data-clickcatcher="true">
                    <div ref="content" className="content" tabIndex="-1" onKeyDown={this.keyDownHandler}>
                        <div className="header">
                            <span className="title">{this.props.title}</span>
                            <span className="close" onClick={this.closeModalHandler}>
                                <span className="close-text">esc to close</span> | <i className={this.iconClasses.close} />
                            </span>
                        </div>
                        <div className="body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            );
        },

        /**
         * If the key pressed is the escape key, the close modal handler will be called.
         * @param {object} e - The simulated React event.
         */
        keyDownHandler: function(e) {
            // escape key pressed
            if (e.keyCode === 27) {
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
