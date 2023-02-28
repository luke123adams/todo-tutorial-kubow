import ListHeader from "./components/ListHeader"
import ListItem from './components/ListItem'
import { useEffect, useState } from 'react'
import Auth from "./components/Auth"
import { useCookies } from 'react-cookie'

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userEmail = cookies.Email
  const [ tasks, setTasks ] = useState(null)
  const authToken = cookies.AuthToken

  async function getData() {
    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      //console.log(json)
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }}
    , [])

  console.log(tasks)

  // Sort by date
  const sortedTasks = tasks?.sort((a,b)=> new Date(a.date) - new Date(b.date))


  return (
    <div className="App">
    {!authToken && <Auth/>}
    {authToken && 
    <>
    <ListHeader listName={'My fave fantasy names'} getData={getData} />
    <p>Welcome back, {userEmail}</p>
    {sortedTasks?.map((task)=><ListItem key={task.id} task={task} getData={getData}/>)}
    </>}
    </div>
  );
}
