import React from 'react'
import ArticleIcon from '@mui/icons-material/Article';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Notes from '../components/Notes';
import Box from '@mui/material/Box';

const UpperBox = ({text,handleChange,handleClick}) => {
  return<>
  
   <div className='container'  >
  
  
           <div className='logo-title'>
              <div className='child1' >
                 <ArticleIcon sx={{color:'rgb(138, 75, 56)',fontSize:'2rem'}}  />
              </div>
              <div className='child1'>
                <h3>Note App</h3>
              </div>
              
          
           </div>
  
           <div className='input-button-container' >
  
                <input placeholder='New Note...' className='input' type="text"  value={text} onChange={handleChange} />
               <div className='btnDiv' onClick={handleClick} >
                  <div className='child1' >
                       <AddCircleOutlineIcon sx={{color:'white',fontSize:'1.3rem'}} />
                  </div>
                  <div  className='child1'>
                       <h4>Add</h4>
                  </div>
               </div>
  
  
                 
  
           </div>
  
            <div  className='notesListTitlte'  >
              Notes
            </div>
  
     
      </div>
  
  </>
}

export default UpperBox