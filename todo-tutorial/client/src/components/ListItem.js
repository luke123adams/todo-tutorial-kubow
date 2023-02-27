import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import { useState } from 'react';
import Modal from './Modal';

export default function ListItem({ task, getData }) {
  const [showModal, setShowModal] = useState(false)
  const deleteItem = async () => {
    try {
     const response = await fetch (`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
      method: 'DELETE'
     })
     if (response.status === 200) {
      getData()
     }

    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="list-item">
       <div className="info-container">
      <p>{task.title}</p>
      <ProgressBar/>
        </div>
           <div className="button-container">
             <button className="edit" onClick={()=>setShowModal(true)}>EDIT</button>
             <button className="delete" onClick = {deleteItem}>DELETE</button>

       </div>
       {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData}/>}
     </div>
    );
  }