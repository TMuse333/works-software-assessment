import React,{useState, useEffect} from "react";
import './list.css'
import { FaCheck } from 'react-icons/fa';

/*
  HydroList Component

  This component represents a list of tasks or notes with various functionalities such as adding, deleting, and marking tasks as complete.

  Props:
  - None

  State:
  - expandedIndex: Array containing indices of expanded tasks
  - isHovered: Index of the task currently being hovered over
  - isDesktop: Boolean indicating whether the window width is larger than 865px
  - tasks: Array of objects representing tasks or notes
  - searchInput: String representing the search input text
  - addNote: Boolean indicating whether the add note form is visible
  - input: String representing the input for the task name
  - description: String representing the input for the task description
  - deleteNoteSelected: Boolean indicating whether a note deletion is selected
  - noteToDelete: Index of the note to be deleted
  - finalDeletion: Boolean indicating whether the final deletion confirmation is shown
  - hoveredCheck: Index of the task check icon being hovered over
  - completedTasks: Array containing indices of completed tasks

  Functions:
  - handleSearchInputChange: Function to handle changes in the search input
  - toggleCompletedTask: Function to add or remove a task from completedTasks array
  - handleContentClick: Function to handle content click (expanding/collapsing task)
  - handleMouseEnter: Function to handle mouse enter event on a task
  - handleMouseLeave: Function to handle mouse leave event on a task

  Other Notes:
  - This component uses React Hooks for managing state and lifecycle.
*/



const HydroList = ({}) => {

    const [expandedIndex, setExpandedIndex] = useState([]);

    const [isHovered, setIsHovered] = useState(null)

    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 865);


    const [tasks, setTasks] = useState([
     
    ])

    const [searchInput, setSearchInput] = useState('');
   
    const [addNote, setAddNote] = useState(false)

    const [input, setInput] = useState(null)

    const [description, setDescription] = useState(null)

    const [deleteNoteSelected, setDeleteNoteSelected] = useState(false)

    const [noteToDelete, setNoteToDelete] = useState(null)

    const [finalDeletion, setFinalDeletion] = useState(false)

    const [hoveredCheck, setHoveredCheck] = useState(null)

    const [completedTasks, setCompletedTasks] = useState([])


    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    // Function to perform the search and sort the notes
    useEffect(() => {
        // Filter the tasks array based on the search input
        const filteredTasks = tasks.filter(task =>
            task.name.toLowerCase().includes(searchInput.toLowerCase())
        );

        // Separate the matching and non-matching tasks
        const matchingTasks = filteredTasks.filter(task => task.name.toLowerCase().includes(searchInput.toLowerCase()));
        const nonMatchingTasks = tasks.filter(task => !matchingTasks.includes(task));

        // Concatenate the matching tasks with the non-matching ones
        const sortedTasks = [...matchingTasks, ...nonMatchingTasks];

        // Update the state with the sorted tasks
        setTasks(sortedTasks);
    }, [searchInput]);

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
    

    //functions to set if the check is hovered or not
 

    const handleCheckHover = (index) => {
        setHoveredCheck(index)
    }

    const handleCheckLeave = () => {
        setHoveredCheck(null)
    }


//styling of the checkmark, if it is hovered over, it will turn green

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

    //the final selection to delete a particular task,
    //when this function is called the state of the task
    //manager is set back to default, as opposed to 
    // getting ready for deleting a task

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

    //canceling a deletion

    const handleCancelDeletion = () => {
        setFinalDeletion(false)
        setDeleteNoteSelected(false)
        setNoteToDelete(null)
    }
    
    //function to put the task manager into delete mode,
    //only if there is at least 1 task present

    const handleDeleteClick = () => {

        if(tasks.length === 0){
            window.alert('There are no tasks to delete')
            return
        }
        setDeleteNoteSelected(true)
    }


    const handleCancelSubmission = () => {
        setAddNote(false)
    }


    const handleMouseEnter = (index) => {
        setIsHovered(index)
    }

    const handleMouseLeave = () => {
        setIsHovered(null)
    }


    //function to handle when a task is clicked on,
    // if in delete mode, it will set the selected task
    //to be delete then ask if you are sure you want to delete it


    const handleContentClick = (index) => {

        //checking if the clicked element is already expanded

        const indexInExpandedIndex = expandedIndex.findIndex(idx => idx === index);


        if(deleteNoteSelected){
            setNoteToDelete(index)
            console.log('we have the note to delete')
        }

      else  if (indexInExpandedIndex !== -1) {
            // If the task is already expanded, remove it from the array
            setExpandedIndex(prevIndex => prevIndex.filter((_, i) => i !== indexInExpandedIndex));
            console.log('already in there');
        } else {
            // If the task is not expanded, add it to the array
            setExpandedIndex(prevIndex => [...prevIndex, index]);
        }
    }

    //setting the background color for the container that the content is within
    //there are three different states, hovering over it in while not in deletion mode

      const hydroStyle = (index) => {
        const hovered = isHovered === index;
        const noteDelete =  deleteNoteSelected && hovered;
        const completed = completedTasks.includes(tasks[index])
    
        return {
          
           
            transition: 'background-color 0.3s ease-in, border-bottom 0.3s ease-in, border 0.3s ease-in, width 0.3s ease-in 1.3s', // Separate transitions with a delay for width
            backgroundColor: noteDelete ? '#540000' :completed? 'rgb(17, 153, 17)' :
             hovered ? '#005672' :
              'transparent',

           
        };
    };


      const contentStyle = (index, description) => {
        const isExpanded = expandedIndex.includes(index);
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
        if(!deleteNoteSelected){
            setAddNote(true)
        }
       
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
            transform: inView ? 'scale(1) translateX(-50%)' : 'scale(0) translateX(-50%)',
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

            <input
            className="search-bar"
                type="text"
                placeholder="Search notes"
                value={searchInput}
                onChange={handleSearchInputChange}
            />
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
                    <button className="deletion-button"
                    onClick={()=>handleFinalDeletion(noteToDelete)}>Delete</button>
                <button className="deletion-button"
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
            }}className="hydro-button"
            onClick={handleCancelDeletion} >Cancel deletion</button>
            </>
        )}


        <div className="hydro-wrapper"
        
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
            onClick={(e) => {
                e.stopPropagation(); // Stop propagation of the click event
                addCompleteTask(index);
            }}
            />
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