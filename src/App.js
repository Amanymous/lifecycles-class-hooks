import React,{useMemo,useState} from 'react'

const App = () => {
  const [count,setCount] = useState(0)
  function Sum({a,b}){
    return <div>Sum {a+b}</div>
  }
  return (
    <div className="App">
      <h3>React.Memo vs useMemo vs shouldComponentUpdate</h3>
      <div>Count: {count}</div>
      <div>
        <button onClick={()=>setCount(old=>old+1)}>Increment</button>
      </div>
      <hr/>
      <Sum a={count} b={count*2}/>
    </div>
    
  );
}

export default App;