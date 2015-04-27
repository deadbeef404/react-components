define(function(require) {
    'use strict';

    var Dispatcher = require('flux').Dispatcher;
    Dispatcher = new Dispatcher();
    var actionDispatch = function(action){
        return this.dispatch({action: action});
    };
    //Create alias functions for backward compatibility
    Dispatcher.handleViewAction = actionDispatch;
    Dispatcher.handleServerAction = actionDispatch;
    Dispatcher.dispatchAction = actionDispatch;
    return Dispatcher;
});
