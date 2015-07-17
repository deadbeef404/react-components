[![Bower version][bower-image]][bower-url] [![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url]

# react-components

## Just getting your project started?

##### Try our [Yeoman](http://yeoman.io) generator for testing, linting, watchers, and more!

> [generator-reactjs-flux](https://github.com/dataminr/generator-reactjs-flux) for Facebook's React framework and Flux application architecture.

## What's inside react-components?

[Try the Demo](http://dataminr.github.io/react-components)

#### [Table Component](./docs/table.md)

From a simple table to multi-column filtering, column sorting, row selection, client side pagination, and more.

#### [Search Component](./docs/search.md)

Search against large sets of data, populate results, and take action with all the sweet hot keys your power users are after.

#### [Pie Chart Component](./docs/piechart.md)

Display complex data with our pie chart's drill in/out functionality, hover animations, and result list.

#### [Modal Component](./docs/modal.md)

A simple single page modal that renders in it's own DOM tree and operates outside the render cycles of an application.

#### [Confirm Dialog Component](./docs/confirmdialog.md)

A page level component that displays a confirmation dialog to the user with OK/Cancel buttons.

#### [Page Message Component](./docs/pagemessage.md)

A page level component that animates in and out for success, error, warning, info, and custom messages.

## Getting Started

#### Install Bower if it is not already installed

```
$ npm install -g bower
```

#### Bower Install react-components

```
$ bower install react-components --save
```

#### Include the following in require config (alias names must match)

```
RequestHandler: 'path/to/RequestHandler',
drc: 'path/to/bower_components/react-components/src/compiled'
```

#### (Optional) Add mapping to require config to your Flux Dispatcher
This step is only necessary if you have your own Flux Dispatcher. Otherwise you can just use the built-in one in this library.
```
map: {
    "*":{
        "drc/dispatcher/AppDispatcher.min": "path/to/your/dispatcher"
    }
}
```

#### Add external style sheet
```
<link type="text/css" rel="stylesheet" href="/bower_components/react-components/dist/react-components.css" />
```

## Submitting Issues

##### If you are submitting a bug, please create a [jsfiddle](http://jsfiddle.net/) demonstrating the issue if possible.

## Contributing

##### Fork the library and follow the Install Dependencies steps below.

```
$ git clone https://github.com/dataminr/react-components.git
$ git checkout master
```

#### Important Notes

* Pull requests should be made to the `master` branch with proper unit tests.
* Do not include the minified files in your pull request. We build these when we tag a release.

#### We use the following libraries within our project

* [React](http://facebook.github.io/react/) JavaScript library for building user interfaces
* [Flux](https://facebook.github.io/flux/) Application architecture for building user interfaces
* [Require](http://requirejs.org/) JavaScript file and module loader optimized for in-browser use
* [lodash](https://lodash.com/docs) JavaScript utility library
* [Moment](http://momentjs.com/docs/) Parse, validate, manipulate, and display dates in JavaScript
* [jQuery](http://jquery.com/) Fast, small, and feature-rich JavaScript library
* [d3](http://d3js.org/) Manipulate documents based on data with Data-Driven Documents

##### Style

* [Compass](http://compass-style.org/) Css authoring framework
* [Sass](http://sass-lang.com/) CSS with superpowers

##### Unit testing and style checking

* [Jasmine](http://jasmine.github.io/2.2/introduction.html) Behavior-driven development framework for testing JavaScript code
* [Istanbul](https://github.com/gotwarlost/istanbul) JavaScript statement, line, function, and branch code coverage when running unit tests
* [ESLint](http://eslint.org/) The pluggable linting utility for JavaScript and JSX

#### Install Dependencies

##### Node

[node.js.org](nodejs.org)

##### Bower

```
$ npm install -g bower
```

##### Compass & Sass

```
$ gem install compass
```

##### Grunt command line interface

```
$ npm install -g grunt-cli
```

##### React tools

```
$ npm install -g react-tools
```

##### Finally, install third-party dependencies and start watchers:

```
$ cd ~/path/to/react-components/root
$ grunt init
```

#### Bower link react-components to work locally
```
$ cd ~/path/to/react-components/root
$ bower link
$ cd ~/path/to/project/root
$ bower link react-components
```

NPM Troubles? npm ERR! Are you seeing something like: `Error: EACCES, mkdir '/Users/user/.npm/dargs/2.1.0'` ?
Try the following commands and try the previous step again:

```
$ cd ~
$ sudo chown -R $(whoami) .npm
```

If you find your css build results are empty, update your sass gem.

#### Use the sample app in your browser to develop

> /react-components/src/js/examples/index.html

### Grunt Tasks

The default grunt task will compile jsx and scss files as well as start a watcher for them.

```
$ grunt
```

Same as the default grunt task, however it will reinstall dependencies.

```
$ grunt init
```

Run Jasmine unit tests, JSHint, and JSCS

```
$ grunt test
```

Same as grunt test, however, this task will run code coverage and launch the code coverage in your browser.

```
$ grunt test:cov
```

Run unit tests in the browser on actual source rather than instrumented files from istanbul.

```
$ grunt jasmineDebug --filter {/folder|file}
```

Run unit tests for a filtered set of folders or files without code coverage thresholds.

```
$ grunt jasmineFilter --filter {/folder|file}
```

## License

MIT

## Special Thanks To:

The developers that made this project possible by contributing to the the following libraries and frameworks:

[React](http://facebook.github.io/react/), [Flux](https://facebook.github.io/flux/), [Compass](http://compass-style.org/), 
[Sass](http://sass-lang.com/), [Require](http://requirejs.org/), [Grunt](http://gruntjs.com/), [Jasmine](http://jasmine.github.io/2.2/introduction.html),
[Istanbul](https://github.com/gotwarlost/istanbul), [ESLint](http://eslint.org/), [Watch](https://github.com/gruntjs/grunt-contrib-watch),
[d3](http://d3js.org/), [lodash](https://lodash.com/docs), [jQuery](http://jquery.com/), and [Moment](http://momentjs.com/docs/)

[bower-image]: https://badge.fury.io/bo/react-components.svg
[bower-url]: http://badge.fury.io/bo/react-components

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[travis-url]: https://travis-ci.org/dataminr/react-components
[travis-image]: https://travis-ci.org/dataminr/react-components.svg?branch=master