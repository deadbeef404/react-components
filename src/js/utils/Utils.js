define(function(require) {
    'use strict';

    var _ = require('lodash');
    var moment = require('moment');
    var React = require('react');

    var Utils = {
        guid: function() {
            var s4 = function() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            };
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        },

        /**
         * Get formatted time string given the start and end times.
         * @param  {Int} start - Start timestamp.
         * @param  {Int} end - End timestamp.
         * @param  {Bool} includeDate - Whether time should include date.
         * @return {String} - Formatted time optionally prepended by date.
         */
        calculateTimeString: function(start, end, includeDate) {
            var format = 'h:mm A',
                startTime = moment(start).format(format),
                endTime = moment(end).format(format);

            var date = includeDate ? moment(start).format('MMM Do,') : '';

            // If same minute, just show a single minute, not a range.
            if(startTime === endTime){
                return date + " " + startTime;
            }

            return date + " " + startTime + ' - ' + endTime;
        },

        /**
         * Retrieves the loader classes for a component.
         * @param {Bool} loading - The loading state of a component.
         * @param {Array|String} iconClasses - The classes to add to the loader when loading.
         * @returns {Object} - classSet
         */
        getLoaderClasses: function(loading, iconClasses) {
            if (typeof iconClasses === 'string') {
                iconClasses = iconClasses.split(' ');
            }
            if (!iconClasses || !_.isArray(iconClasses)) {
                iconClasses = ['icon', 'ion-loading-c'];
            }
            var classes = {
                'loader': true,
                'hide': !loading
            };

            _.forEach(iconClasses, function(iconClass) {
                classes[iconClass] = loading;
            });

            return this.classSet(classes);
        },

        /**
         * Utility for creating a string of class names. Each parameter should be the
         * string class name to add, or an object where the key is the classname to add and the
         * value is a boolean value denoting whether it should be added or not.
         *
         * Copied from `classnames` open source project
         *
         * @author JedWatson
         * @license MIT
         * @link https://github.com/JedWatson/classnames
         *
         * @param  {...String|Object} var_args An argument for each class to add
         * @return {String}         String of class names separated by space
         */
        classSet: function() {
            var args = arguments;
            var classes = [];

            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                if (!arg) {
                    continue;
                }

                if ('string' === typeof arg || 'number' === typeof arg) {
                    classes.push(arg);
                }
                else if ('object' === typeof arg) {
                    for (var key in arg) {
                        if (arg.hasOwnProperty(key) && arg[key]) {
                            classes.push(key);
                        }
                    }
                }
            }
            return classes.join(' ');
        },

        /**
         * Starts with a base object that contains all of the functions to create the base react class from. The
         * clobber object contains functions that will overwrite 1 or more functions that exist on the base. The clobbered
         * base object is then assigned as the mixins property of the add object. The add object contains new functions
         * that did not originally exist on the base as well as lifecycle functions that will be called both from the
         * mixins object and the add object. The new React Class is simply the add object with a mixins property containing
         * the base React Class functions that have been potentially altered to yield new functionality.
         * @param {Object} base - A React Class definition object.
         * @param {Object} clobber - The functions to overwrite on the base object.
         * @param {Object} add - The new methods and duplicate lifecycle methods to add to the React Class.
         * @returns {Object} - A React Class
         */
        extendReactClass: function(base, clobber, add) {
            add.mixins = [_.extend(_.cloneDeep(base), clobber)];

            return React.createClass(add);
        }
    };

    return Utils;
});
