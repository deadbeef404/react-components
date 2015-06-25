define(function(require) {
    'use strict';

    var PortalMixins = require('drc/mixins/PortalMixins');
    var React = require('react');

    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

    var PageMessage = React.createClass({
        propTypes: {
            message: React.PropTypes.string.isRequired,
            type: React.PropTypes.string.isRequired,
            duration: React.PropTypes.number,
            icon: React.PropTypes.string,
            closeIcon: React.PropTypes.string
        },

        getDefaultProps: function() {
            return {
                duration: 3000
            };
        },

        getInitialState: function() {
            return {
                leaving: false
            };
        },

        componentDidMount: function() {
            this.timeout = setTimeout(function() {
                this.dismiss(true);
            }.bind(this), this.props.duration);
        },

        componentWillUnmount: function() {
            clearTimeout(this.timeout);
            this.timeout = null;
        },

        render: function() {
            var message = this.getMessageMarkup();

            return (
                <div className="page-message">
                    <ReactCSSTransitionGroup transitionName="message" transitionAppear={true}>
                        {message}
                    </ReactCSSTransitionGroup>
                </div>
            );
        },

        getMessageMarkup: function() {
            var closeIcon = this.props.closeIcon ? <i className={this.props.closeIcon + ' close'} onClick={this.dismiss.bind(this, false)} /> : null;
            var icon = this.props.icon ? <i className={this.props.icon} /> : null;

            if (this.state.leaving) {
                return null;
            }

            return (
                <div className={"message " + this.props.type}>
                    {closeIcon}
                    <span>{icon} {this.props.message}</span>
                </div>
            );
        },

        dismiss: function(animate) {
            var animationAllowance = animate ? 1000 : 0;

            this.setState({
                leaving: animate
            });

            this.timeout = setTimeout(function() {
                PortalMixins.closePortal();
            }, animationAllowance);
        }
    });

    return PageMessage;
});
