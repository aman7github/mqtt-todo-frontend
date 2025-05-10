import React, { useEffect, useRef, useState } from 'react'
import mqtt from 'mqtt'
import '../CSS/todo.css'
import Notes from '../components/Notes';
import UpperBox from '../components/UpperBox';

const Todo = () => {

const [text,setText] = useState('')
const [data,setData] = useState([])
const [errorMsg, setErrorMsg] = useState('')
const clientRef = useRef(null)



    useEffect(()=>{
     
        clientRef.current = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')

        clientRef.current.on('connect',()=>{
         console.log('connected to mqtt');
          setErrorMsg('')
        }) 

       clientRef.current.on('error',(err)=>{
        console.log(err.message); 
        setErrorMsg(`MQTT Error: ${err.message}`)
       })


      getData()


     return ()=>{
      if(clientRef.current){
        clientRef.current.end()
      }

     }


    },[])
 
//localhost:5000/fetchAllTasks

   const getData=()=>{
    fetch(`https://mqtt-todo-backend.onrender.com/fetchAllTasks`)
    .then(res=>res.json())
    .then(res=>{
         let d = res.allTask.reverse()
         setData(d)
        if (res.error) setErrorMsg(res.error);
        else setErrorMsg(null);
    })
    .catch(err=>{
       setErrorMsg(` Error: ${err.message}`)
    })
   }


   const handleChange=(e)=>{
    setText(e.target.value)
   }



   const handleClick=()=>{
       const trimmed = text.trim();
    // Validation reject if empty or only numbers/special chars
    if (!trimmed || /^[\W\d_]+$/.test(trimmed)) {
      alert('Please enter a valid task (not empty, not only numbers or special characters)');
      return;
    }

     if(clientRef.current && clientRef.current.connected){
           
         clientRef.current.publish('/add', text)
         
         setText('')
         
        setTimeout(() => {
         getData(); 
        },1000);

     }else{

        console.log('MQTT client not connected')
        setErrorMsg('MQTT client not connected') 
     }


  }

  


  return <>
  
   <div className='MainContainer' >
  
     <div className='extraUpperDiv'></div>

     <UpperBox text={text} handleChange={handleChange} handleClick={handleClick} />

     <div className='listBoxContainer'>
         
           <div className='listBox'>
              {errorMsg && <div className="error-box">{errorMsg}</div>}

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