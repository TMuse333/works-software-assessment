import React,{useState, useEffect} from "react";
import './list.css'
import { FaCheck } from 'react-icons/fa';


const HydroList = ({absolute}) => {

    const [expandedIndex, setExpandedIndex] = useState([]);

    const [isHovered, setIsHovered] = useState(null)

    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 865);


    const [tasks, setTasks] = useState([
        {
            name:'note',
            description:'be a real one'
        }
    ])

    const [addNote, setAddNote] = useState(false)

    const [input, setInput] = useState(null)

    const [description, setDescription] = useState(null)

    const [deleteNoteSelected, setDeleteNoteSelected] = useState(false)

    const [noteToDelete, setNoteToDelete] = useState(null)

    const [finalDeletion, setFinalDeletion] = useState(false)

    const [hoveredCheck, setHoveredCheck] = useState(null)

    const [completedTasks, setCompletedTasks] = useState([])

    const addCompleteTask = (index) => {
        // Check if the task is already in the completedTasks array
        const taskIndex = completedTasks.findIndex(task => task === tasks[index]);
    
        if (taskIndex !== -1) {
            // If the task is already in the array, remove it
            setCompletedTasks(prevTasks => prevTasks.filter((_, i) => i !== taskIndex));
        } else {
            // If the task is not in the array, add it
            setCompletedTasks(prevTasks => [...prevTasks, tasks[index]]);
        }
    }
    

 

    const handleCheckHover = (index) => {
        setHoveredCheck(index)
    }

    const handleCheckLeave = () => {
        setHoveredCheck(null)
    }


    const checkStyle = (index) => {
        const hovered = hoveredCheck === index


        return {
            color: hovered ? 'rgb(0, 200, 0)' : 'white',
            transition:'all 0.3s ease-in'
        }
    }
    
    const markAsCompletedStyle = (index) => {
        const hovered = hoveredCheck === index

        return {
            // transform: hovered ? 'scale(1)' : 'scale(0)',
            transition:'all 0.3s ease-in-out',
            opacity: hovered ? 1 : 0,
            zIndex: hovered ? 2 : 1
        }
    }

    const handleInputChange = (event,description) => {

        if(description){
            setDescription(event.target.value)
        }
        else{
            setInput(event.target.value)
        }
       
        
    }

    const handleFinalDeletion = (index) => {
        setFinalDeletion(true);
    
        // Remove the selected index from the tasks array
        const updatedTasks = tasks.filter((_, i) => i !== index);
    
        setTasks(updatedTasks);

        setDeleteNoteSelected(false)

        setNoteToDelete(null)
    };

    useEffect(()=>{
        setFinalDeletion(false)
    },[finalDeletion])

    const handleCancelDeletion = () => {
        setFinalDeletion(false)
        setDeleteNoteSelected(false)
        setNoteToDelete(null)
    }
    

    const handleDeleteClick = () => {

        if(tasks.length === 0){
            window.alert('There are no tasks to delete')
            return
        }
        setDeleteNoteSelected(true)
    }

    useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 865);
       
      };
  
      // Add event listener for window resize
      window.addEventListener("resize", handleResize);
  
      // Initial check when the component mounts
      handleResize();
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);



 
    const handleCancelSubmission = () => {
        setAddNote(false)
    }


    const handleMouseEnter = (index) => {
        setIsHovered(index)
    }

    const handleMouseLeave = () => {
        setIsHovered(null)
    }

    if(deleteNoteSelected){
        setNoteToDelete(index)
        console.log('we have the note to delete')
    }
    const handleContentClick = (index) => {
        // Check if the clicked index is already expanded
        const isAlreadyExpanded = expandedIndex.includes(index);
    
        // Toggle the expansion state of the clicked index
        if (isAlreadyExpanded) {
            // If already expanded, remove the index from the expandedIndex array
            setExpandedIndex(prevExpandedIndex => prevExpandedIndex.filter(i => i !== index));
        } else {
            // If not expanded, add the index to the expandedIndex array
            setExpandedIndex(prevExpandedIndex => [...prevExpandedIndex, index]);
        }
    };
    


      const hydroStyle = (index) => {
        const hovered = isHovered === index;
        const noteDelete =  deleteNoteSelected && hovered;
        const completed = completedTasks.includes(tasks[index])
    
        return {
          
            // borderBottom: hovered ? null : '2px solid white',
            // border: hovered ? '2px solid white' : null,
            transition: 'background-color 0.3s ease-in, border-bottom 0.3s ease-in, border 0.3s ease-in, width 0.3s ease-in 1.3s', // Separate transitions with a delay for width
            backgroundColor: noteDelete ? '#540000' :completed? 'rgb(17, 153, 17)' :
             hovered ? '#005672' :
              'transparent',

            // width: noteDelete ? '0' : 'auto'
        };
    };
    



      const contentStyle = (index, description) => {
        const isExpanded = expandedIndex.includes(tasks[index]);
        const wordCount = description ? description.split(" ").length : 0;
        const height = isExpanded ? `${Math.max((wordCount / 5) * 20, 20)}px` : '0';


       
    
        return {
            height: height,
            transition: isExpanded
                ? 'height 0.2s ease-in, opacity 0.5s ease-in'
                : 'height 0.2s ease-in, opacity 0.5s ease-in 0.3s',
            overflow: isExpanded ? 'scroll' : 'hidden',
           
        };
    };
    
      
      const handleAddNote = () => {
        setAddNote(true)
      }

      const handleSubmitNote = () => {

        if(input === null) {
            window.alert('Please name your task before submitting!')
            return
        }

        const newTask = {
            name:input,
            description:description
        }

        setTasks(() => [...tasks, newTask])
        setAddNote(false)
      }

      const finalWarningStyle = () => {

        const inView = noteToDelete !== null
        
        return {
            transform: inView ? 'scale(1) translateX(-50%)' : 'scale(0)',
            transition: 'all 0.3s ease-in'
        }

      }

      
     
      

    return (
        <>

<div className="list-container">


        <div className="options">
            <button className="hydro-button"
            onClick={handleAddNote}>
                Add Task
            </button>
            <button className="hydro-button"
            onClick={handleDeleteClick}>
                Delete Task
            </button>
        </div>

        <div className="final-warning"
        style={finalWarningStyle()}>
                <h2 style={{
                    color:'white'
                }}>
                    Are you sure you want to delete?
                </h2>
                <p>This action cannot be undone!</p>
                <section> 
                    <button
                    onClick={()=>handleFinalDeletion(noteToDelete)}>Delete</button>
                <button
                onClick={handleCancelDeletion}>Cancel</button>

                </section>
               
        </div>

        {addNote && (
            <><div className="add-note-container">
            <label htmlFor="note">
                <input
               type='name'
                name='note'
                placeholder="Enter your Task "
                onChange={(event)=>handleInputChange(event,false)}>
                </input>
            </label>

            <label htmlFor="description">
                <textarea
               type='name'
                name='description'
                placeholder="Enter a description (optional)"
                onChange={(event)=>handleInputChange(event,true)}>
                </textarea>
            </label>

            <button onClick={()=>handleSubmitNote()}
            className="hydro-button">
                    Submit note
            </button>
            <button style={{
                marginTop:'1rem'
            }}
             className="hydro-button"
             onClick={handleCancelSubmission}>
                Cancel
            </button>
            </div>
            </>
        )}

        {deleteNoteSelected && noteToDelete === null &&(
            <>
            <h2 style={{
                color:'red'
            }}>
                Which note would you like to delete ?
            </h2>
            <button style={{
                color:'white'
            }}
            onClick={handleCancelDeletion} >Cancel deletion</button>
            </>
        )}


        <div className="hydro-wrapper"
             style={{
                    
                      
              marginTop:absolute ? '5rem' : '0'
            }}
>


             
   
        <div className="hydrolist-container">


            {tasks.length > 0 ? (

     

            <div className="hydro-list"
               >
               {tasks.map((text,index) => (
                <>
           
                   
                <div className="hydro-element"
                key={index}
                onClick={()=>handleContentClick(index)}
                style={hydroStyle(index)}
                onMouseEnter={()=>handleMouseEnter(index)}
                onMouseLeave={()=>handleMouseLeave()}
                >

<div className="name-logo-box">
              <h2>{text.name }</h2>
            
              <div className="element-buttons">
              <button className="check-button">
            <FaCheck
            onMouseEnter={()=>handleCheckHover(index)}
            onMouseLeave={handleCheckLeave}
            style={checkStyle(index)}
            onClick={()=>addCompleteTask(index)}/>
          </button>
          <div className="plus-minus">
              
              <div
                className={`hydro-line ${expandedIndex === (index) ? "clicked" : ""}`}
              />
                 <div
                className={`hydro-line ${expandedIndex === (index)  ? "clicked" : ""}`}
             />

     
              
              </div>
                </div>
          
          <p style={markAsCompletedStyle(index)}
         
          className="mark-as-done">
           {completedTasks.includes(tasks[index]) ? 'Mark as uncomplete' : 'mark as complete'}
          </p>
             
            
            </div>
            

            

     
                     
<section className="hydro-expanded"
 style={contentStyle(index, text.description)}>


                  <p
                  className=""
                 
                >
                    {text.description}
                  </p>
                 
                  </section>
                       

                             
                  
                    </div>
                    
{/* <button className="check-button"><FaCheck/></button> */}

</>
               ))}



            </div>

) : <h2 className="no-notes">
    You currently have no tasks, click the add button to add
    a task!</h2>}
        </div>
        </div>
        </div>
        </>
    )
}

export default HydroList