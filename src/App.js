import React, { useEffect, useMemo, useRef, useState } from 'react'
import './style.css'
// class Sum extends React.PureComponent {
// shouldComponentUpdate(nextProps) {
//   const oldProps = this.props
//   return (
//     oldProps.a !== nextProps.a ||
//     oldProps.b !== nextProps.b ||
//     JSON.stringify(oldProps.style) !== JSON.stringify(nextProps.style)
//   )

/**
 * @PureComponent is exactly the same as Component except that it handles the @shouldComponentUpdate 
 * @method for you. When @props or @state changes, @PureComponent will do a shallow comparison on both 
 * @props and state
 * @Component on the other hand won't compare current @props and state to next out of the box.
 * **/
//   componentDidUpdate(){
//     console.log("updated")
//   }

//   render() {
//     const { a, b, style = {} } = this.props
//     return <div style={style}>Sum: {a + b}</div>
//   }
// }

/**
 * 
 * @returns using React.memo
 */
// const Sum = React.memo(({ a, b, style = {} }) => <div style={style}>Sum: {a + b}</div>)

/**
 * 
 * @returns using @seEffect
 */

const Sum = ({ a, b, on, style = {} }) => {
  function sumExpensively(a, b) {
    console.log("Sum Expensive func")
    return a + b
  }
  function doExpensiveProduct(a, b) {
    console.log("Sum Expensive func")
    return a * b
  }

  const useMemoFn=(fn,memoFn)=>{
    const shouldUpdate = memoFn()
    const idRef = useRef(0)
    if(shouldUpdate){
      idRef.current = idRef.current+1
    }
    return useMemo(fn,[idRef.current])
  }
  useEffect(() => {
    console.log("Did mount or update")
  })
 
  const expensiveSum = useMemo(() => sumExpensively(a, b), [a, b])
  const expensiveProductDivisibleBy5 = useMemoFn(
    () => doExpensiveProduct(a,b),
    () => expensiveSum % 5 === 0
  )
  return (
    <div style={style}>
      <div >Sum: {expensiveSum}</div>
      <div>Product: {expensiveProductDivisibleBy5}</div>
    </div>

  )
}

const App = () => {
  const [count, setCount] = useState(0)
  const [on, setToggle] = useState(true)
  // function Sum({ a, b }) {
  //   return <div>Sum {a + b}</div>
  // }
  return (
    <div className="App">
      <h3>React.Memo vs useMemo vs shouldComponentUpdate</h3>
      <div>Count: {count}</div>
      <div>
        <button onClick={() => setCount(count => count + 1)}>Increment</button>
      </div>
      <hr />
      <div>on: {on.toString()}</div>
      <div>
        <button onClick={() => setToggle(old => !old)}>Toggle</button>
      </div>
      <hr />
      <Sum
        a={count * 2} b={count * 2}
        on={on}
        style={{ color: on ? 'green' : 'red' }}
      />
    </div>

  );
}

export default App;