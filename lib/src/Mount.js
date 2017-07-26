'use strict';

const assert = require('./assert');
const DOM = require('./DOM');
const Element = require('./Element');
const Reconciler = require('./Reconciler');
const instantiateComponent = require('./instantiateComponent');
const shouldUpdateComponent = require('./shouldUpdateComponent');

let ROOT_ID = 1;
const ROOT_KEY = 'reactLiteRootId';
const instancesByRootID = {}; // Use to keep track root instances

function isRoot(node) {
  return node.dataset[ROOT_KEY];
}

function render(element, node) {
  // Ensure our element is valid
  assert(Element.isValidElement(element));

  // First to check if we've already rendered into this node.
  // If so, we'll be doing an update.
  // Otherwise we'll assume this is an initial render.
  return isRoot(node)
    ? update(element, node)
    : mount(element, node);
}

// Describe the creation, instantiation, and rendering of those instances
// Responsible for initial rendering
function mount(element, node) {
  // Mark this node as a root
  node.dataset[ROOT_KEY] = ROOT_ID;

  // Create the internal instance and we're assuming for now that we only have
  // `Component` being rendered at the root.
  let component = instantiateComponent(element);

  // Bookkeeping our root instance component
  instancesByRootID[ROOT_ID] = component;

  // This will render a DOM node. React does more work here to determine if we're remounting
  // server-rendered content
  let renderedNode = Reconciler.mountComponent(component, node);

  // Empty out `node` so we can put it under our control
  DOM.empty(node);

  // Append `renderedNode` to `node`
  DOM.appendChild(node, renderedNode);

  // Increment ROOT_ID so we can track appropriately
  ROOT_ID++;
}

function update(element, node) {
  // Ensure we have a valid root node
  assert(node && isRoot(node));

  // Find the internal instance and update it
  let id = node.dataset[ROOT_KEY];

  let instance = instancesByRootID[id];

  if (shouldUpdateComponent(instance, element)) {
    // TODO: do the update
  } else {
    // Unmount and then mount the new one
    unmountComponentAtNode(node);
    mount(element, node);
  }

  // TODO: update
}

function unmountComponentAtNode(node) {
  // Ensure we have a valid root node
  assert(node && isRoot(node));

  let id = node.dataset[ROOT_KEY];

  // In React we would do a batch unmount operation. This would in turn call
  // componentWillUnmount for each instance. We aren't going to support that,
  // so we can just delete the top level instance and let everything get garbage
  // collected.
  let instance = instancesByRootID[id];
  Reconciler.unmountComponent(instance);

  delete instancesByRootID[id];

  // Reset the DOM node
  DOM.empty(node);
  delete node.dataset[ROOT_KEY];
}

module.exports = {
  render,
  unmountComponentAtNode,
};