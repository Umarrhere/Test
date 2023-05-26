import './App.css';
import {Box, Button, Typography} from '@mui/material'
import { useEffect, useState } from 'react';
import moment from 'moment'
import axios from 'axios'


function App() {
  const [clock, setClock] = useState(moment().format('hh:mm:ss a'))
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getData = async () => {
      try{
        const response = await axios.get('https://60eedea7eb4c0a0017bf4685.mockapi.io/api/test/todo/')
        setTasks(response.data)

      }catch(err){
        console.log(err);
      }
    }
    getData()   
  }, [])
  



  setInterval(() => {
    setClock(moment().format('hh:mm:ss a'))
  }, 1000);


  const deleteTask = (task) => async () => {
    try{
      await axios.delete(`https://60eedea7eb4c0a0017bf4685.mockapi.io/api/test/todo/${task.id}`)
      alert('Deleted Successfully')
      setTasks(tasks.filter(x => x.id !== task.id))

    }catch(err){
      console.log(err);
    }
  }


  return (
    <div className="App">
        <Box sx={{margin:'5rem', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            {/* Task One */}
           <Box sx={{margin:'3rem', width:'400px', display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start'}}>
            <Typography variant='h4' sx={{color:'blue'}}>
                {moment().format('dddd')}
              </Typography>
              <Typography variant='h2' sx={{color: clock.split(':')[1] % 2 === 0 ? 'red' : 'green'    }}>
                {clock}
              </Typography>
          </Box>
        

          {/* Task Two */}
          <Box sx={{backgroundColor: 'silver'}}>
            <Box sx={{margin:'3rem', width: '600px'}}>
              <Typography variant='h3' sx={{borderBottom:'1px '}}>You have {tasks.length} todo</Typography>
              {
                tasks.map(task => {

                  return  <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                    <Box key={task?.id}>
                      {task?.task}
                    </Box>
                    <Box>
                      <Button onClick={deleteTask(task)}>X</Button>
                    </Box>
                  </Box>

                })


              }

            </Box>


          </Box>


      </Box>
    </div>
  );
}

export default App;
