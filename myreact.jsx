//create the actual React object
const React = {
  createElement(type, props, ...children) {
    // check type of type to determine if component type is a React component or react element
    //<div> and <h1> etc are treated as elements, functions are treated as components
    if (typeof type === "function") {
      return type(props)
    }

    // label the arguments according to whatever appears in the console in the respective positions
    //children is spread because it is an array of all elements contained inside the parent element
    const element = { type, props: { ...props, children } }
    console.log(element)
    return element
  },
}

// const myElement = (
//   <main className='title'>
//     <h1>REACT INTERNALS</h1>
//     <p>
//       Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, quas?
//     </p>
//   </main>
// )

function MyComponent() {
  //   return myElement
  return (
    <main className='title'>
      <h1>REACT INTERNALS</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, quas?
      </p>
    </main>
  )
}

function render(reactElement, domContainer) {
  if (["string", "number"].includes(typeof reactElement)) {
    domContainer.appendChild(document.createTextNode(String(reactElement)))
  }

  const createdDomElement = document.createElement(reactElement.type)
  if (reactElement.props) {
    Object.keys(reactElement.props)
      .filter((key) => key !== "children")
      .forEach((key) => (createdDomElement[key] = reactElement[key]))
  }
  if (reactElement.props.children) {
    reactElement.props.children.forEach((child) => render(child))
    domContainer.appendChild(createdDomElement)
  }

  domContainer.appendChild(createdDomElement)
}

render(<MyComponent />, document.getElementById("app"))
