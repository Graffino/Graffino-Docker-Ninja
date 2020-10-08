# Vanilla Javascript Components

- [Vanilla Javascript Components](#vanilla-javascript-components)
  - [Element](#element)
  - [State](#state)
  - [Props](#props)
  - [Refs](#refs)

## Element

```this.state.element``` or ```{ element } = this.state``` holds a direct reference to the HTMLElement on top of which the component is attached.

## State

The state will track the internal transformation of the component and provide an upper scope for all functions available in the component.

```this.setState({ data }}```

```this.state.data```

## Props

Props are custom settings that can be passed with data-prop-my-prop-name="myValue".

Everything after *data-prop* will turn into the key that will hold your value.
data-prop-**my-prop-name**="myValue" will turn to ```this.state.props.myPropName``` and will hold the value ```myValue```.

Convenience methods:
```{props} = this.state``` will then allow you to use ```props.myPropName```.

## Refs

Refs will foremost solve the necessity to select children elements by means of ```querySelectorAll``` and such while giving them as the same time a convenient way to access and a more solid structure management.

Refs hold direct references to other child elements or components.
```data-ref="my-child``` will turn into ```this.state.refs.myChild``` and will hold a reference to its HTMLElement.

Multiple refs with the same name will become available as an array.
