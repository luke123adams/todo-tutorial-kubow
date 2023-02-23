import ListHeader from "./components/ListHeader"
import ListItem from './components/ListItem'
import { useEffect, useState } from 'react'

export default function App() {
  const userEmail = 'a@test.com'
  const [ tasks, setTasks ] = useState(null)

  async function getData() {
    
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const json = await response.json()
      //console.log(json)
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getData, [])

  console.log(tasks)

  // Sort by date
  const sortedTasks = tasks?.sort((a,b)=> new Date(a.date) - new Date(b.date))


  return (
    <div className="App">
    <ListHeader listName={'Holiday tick list'}/>
    {sortedTasks?.map((task)=><ListItem key={task.id} task={task}/>)}
    </div>
  );
}
