'use strict';

const Component = require('./src/Component');
const Element = require('./src/Element');
const Mount = require('./src/Mount');

// Do dependency injection to work around circular dependencies
const DOMComponentWrapper = require('./src/DOMComponentWrapper');
const HostElement = require('./src/HostComponent');
HostElement.inject(DOMComponentWrapper);

module.exports = {
  Component: Component,
  createElement: Element.createElement,

  render: Mount.render,
  unmountComponentAtNode: Mount.unmountComponentAtNode,
};

