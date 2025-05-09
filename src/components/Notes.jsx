import React from 'react'
import Box from '@mui/material/Box';
import '../CSS/todo.css'


const Notes = ({listItem}) => {

  return <>

   <div className='list'>
       {listItem}
   </div>
  
  </>
  
}

export default Notes