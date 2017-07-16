# React Lite
[![PRs Welcome][prs-badge]][prs]
[![MIT License][license-badge]][license]

> My attempt at understanding the internals of React and its intricacies by re-implementing React from Scratch!

## Terminology 
- Component Class: what you define in your React component
- Component Instance
- Element: what you create in your `render` function

## APIs
> Let's call this library `ReactLite`, a basic re-implementation of the React Reconciler with zero dependencies!

### Top level API
- `ReactLite.createElement`
- `ReactLite.Component`
- `ReactLite.render`

### Component Class API
- `constructor()`
- `render()`
- `setState()`
- `this.props`
- `this.state`

### DOM Renderer 
- render: Determine if we are updating a node that means we already have an instance that we've rendered in there, or we are creating a new instance and mount it
- mount: Describes the initial creation, instantiation and rendering of those instances
- update: Grab the previous instance that we've created and update that instance

### Reconciler
- mountComponent:
- receiveComponent: 
- unmountComponent:

### Internal Component Lifecycle
*constructor -> mountComponent -> receiveComponent -> updateComponent -> unmountComponent*

- constructor: Instantiate our component
- mountComponent: Generates the DOM nodes or the React Native views and doesn't actually do anything with them just returns them out.
- receiveComponent: 
- updateComponent:
- unmountComponent: 

## Inspiration 
Make sure you check out the talk by [Paul O Shannessy](https://www.youtube.com/watch?v=_MAD4Oly9yg)

## License
MIT © [Jay Kan](https://github.com/JayKan)

[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: https://github.com/JayKan/react-lite/pulls
[license-badge]: https://img.shields.io/npm/l/express.svg?style=flat-square
[license]: https://github.com/JayKan/react-lite/blob/master/LICENSE