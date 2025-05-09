import React, { useEffect, useState } from 'react'
import mqtt from 'mqtt'
import '../CSS/todo.css'
import Notes from '../components/Notes';
import UpperBox from '../components/UpperBox';

const Todo = () => {

const [text,setText] = useState('')
const [data,setData] = useState([])

    useEffect(()=>{
      getData()
    },[])
 

   const getData=()=>{
    fetch(`https://mqtt-todo-backend.onrender.com/fetchAllTasks`)
    .then(res=>res.json())
    .then(res=>{
         let d = res.allTask.reverse()
         setData(res.allTask)
    })
    .catch(err=>console.log(err.message))
   }


   const handleChange=(e)=>{
    setText(e.target.value)
   }

   

   const handleClick=()=>{
    setText('')
    const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')

     client.on('connect',()=>{
        console.log('connected to mqtt');
        client.publish('/add', text)
     }) 

      
      setTimeout(() => {
        getData(); 
      },1000);


     client.on('error',(err)=>{
       console.log(err.message); 
     })

  }

  


  return <>
  
   <div className='MainContainer' >
  
     <div className='extraUpperDiv'></div>

     <UpperBox text={text} handleChange={handleChange} handleClick={handleClick} />

     <div className='listBoxContainer'>
         
           <div className='listBox'>
             {
                 data.map((el,i)=>{
                     return <div key={i+el} className='list' >
                                <Notes listItem={el} />
                           </div>

                 })
             }          
          </div>     
     </div>


  </div>

  </>
}

export default Todo