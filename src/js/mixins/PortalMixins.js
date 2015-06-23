define(function(require) {
    'use strict';

    var React = require('react');

    return {
        /**
         * Creates a new detatched DOM node to render child components within.
         * @param {Object} children - The items to be displayed in the portal.
         */
        openPortal: function(children) {
            this.portalNode = document.createElement('div');
            document.body.appendChild(this.portalNode);
            React.render(children, this.portalNode);
        },

        /**
         * Displays a confirmation dialog if the value of portalConfirmOnCloseMessage has been set to a string.
         * @param {String|Null} message - The text to display in the confirm dialog or null to clear.
         */
        setPortalConfirmOnClose: function(message) {
            this.portalConfirmOnCloseMessage = message;
        },

        /**
         * Unmounts the components rendered in the portal and removes the associated DOM node.
         */
        closePortal: function() {
            var close = typeof this.portalConfirmOnCloseMessage === 'string' ? confirm(this.portalConfirmOnCloseMessage) : true;

            if (this.portalNode && this.portalNode.parentNode && close) {
                React.unmountComponentAtNode(this.portalNode);
                this.portalNode.parentNode.removeChild(this.portalNode);
                this.portalNode = null;
            }
        }
    };
});
