import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import { useState } from 'react';
import Modal from './Modal';

export default function ListItem({task}) {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="list-item">
       <div className="info-container">
      <TickIcon/>
      <p>{task.title}</p>
      <ProgressBar/>
        </div>
           <div className="button-container">
             <button className="edit" onClick={()=>setShowModal(true)}>EDIT</button>
             <button className="delete">DELETE</button>

       </div>
       {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task}/>}
     </div>
    );
  }