import React, { useState, useEffect } from "react";
import './list.css'
import { FaCheck } from 'react-icons/fa';

interface Task {
    name: string;
    description?: string;
}

const List: React.FC = () => {

    const [expandedIndex, setExpandedIndex] = useState<number[]>([]);
    const [isHovered, setIsHovered] = useState<number | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');
    const [addNote, setAddNote] = useState<boolean>(false);
    const [input, setInput] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [deleteNoteSelected, setDeleteNoteSelected] = useState<boolean>(false);
    const [noteToDelete, setNoteToDelete] = useState<number | null>(null);
    const [finalDeletion, setFinalDeletion] = useState<boolean>(false);
    const [hoveredCheck, setHoveredCheck] = useState<number | null>(null);
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    useEffect(() => {
        const filteredTasks = tasks.filter(task =>
            task.name.toLowerCase().includes(searchInput.toLowerCase())
        );

        const matchingTasks = filteredTasks.filter(task => task.name.toLowerCase().includes(searchInput.toLowerCase()));
        const nonMatchingTasks = tasks.filter(task => !matchingTasks.includes(task));

        const sortedTasks = [...matchingTasks, ...nonMatchingTasks];

        setTasks(sortedTasks);
    }, [searchInput]);

    const addCompleteTask = (index: number) => {
        const taskIndex = completedTasks.findIndex(taskIndex => taskIndex === index);
    
        if (taskIndex !== -1) {
            setCompletedTasks(prevTasks => prevTasks.filter((_, i) => i !== taskIndex));
        } else {
            setCompletedTasks(prevTasks => [...prevTasks, index]);
        }
    }

    const handleCheckHover = (index: number) => {
        setHoveredCheck(index)
    }

    const handleCheckLeave = () => {
        setHoveredCheck(null)
    }

    const checkStyle = (index: number) => {
        const hovered = hoveredCheck === index;

        return {
            color: hovered ? 'rgb(0, 200, 0)' : 'white',
            transition:'all 0.3s ease-in'
        }
    }

    const markAsCompletedStyle = (index: number) => {
        const hovered = hoveredCheck === index;

        return {
            transition:'all 0.3s ease-in-out',
            opacity: hovered ? 1 : 0,
            zIndex: hovered ? 2 : 1
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, isDescription: boolean) => {
        if(isDescription){
            setDescription(event.target.value)
        } else {
            setInput(event.target.value)
        }
    }

    const handleFinalDeletion = (index: number) => {
        setFinalDeletion(true);
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        setDeleteNoteSelected(false)
        setNoteToDelete(null)
    };

    useEffect(() => {
        setFinalDeletion(false)
    }, [finalDeletion])

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

    const handleCancelSubmission = () => {
        setAddNote(false)
    }

    const handleMouseEnter = (index: number) => {
        setIsHovered(index)
    }

    const handleMouseLeave = () => {
        setIsHovered(null)
    }

    const handleContentClick = (index: number) => {
        const indexInExpandedIndex = expandedIndex.findIndex(idx => idx === index);

        if(deleteNoteSelected){
            setNoteToDelete(index)
            console.log('we have the note to delete')
        } else if (indexInExpandedIndex !== -1) {
            setExpandedIndex(prevIndex => prevIndex.filter((_, i) => i !== indexInExpandedIndex));
            console.log('already in there');
        } else {
            setExpandedIndex(prevIndex => [...prevIndex, index]);
        }
    }

    const taskStyle = (index: number) => {
        const hovered = isHovered === index;
        const noteDelete =  deleteNoteSelected && hovered;
        const completed = completedTasks.includes(index)
    
        return {
            transition: 'background-color 0.3s ease-in, border-bottom 0.3s ease-in, border 0.3s ease-in, width 0.3s ease-in 1.3s',
            backgroundColor: noteDelete ? '#540000' :completed? 'rgb(17, 153, 17)' : hovered ? '#005672' : 'transparent',
        };
    };

    const contentStyle = (index: number, description?: string) => {
        const isExpanded = expandedIndex.includes(index);
        const wordCount = description ? description.split(" ").length : 0;
        const height = isExpanded ? `${Math.max((wordCount / 5) * 20, 20)}px` : '0';
    
        return {
            height: height,
            transition: isExpanded ? 'height 0.2s ease-in, opacity 0.5s ease-in' : 'height 0.2s ease-in, opacity 0.5s ease-in 0.3s',
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

        const newTask: Task = {
            name: input,
            description: description
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
             return (

<>

{/*
The following JSX represents the main structure of the HydroList component, including:
- A container for the entire list
- Options section with buttons for adding and deleting tasks, and a search input
- Final warning message for task deletion
- Form for adding a new note (conditionally rendered)
- Confirmation message for task deletion (conditionally rendered)
- Container for the list of tasks

Individual tasks are mapped over from the 'tasks' array and rendered within the list container.
*/}

<div className="main-list-container">


<div className="options">
    <button className="button"
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
    <button className="button"
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
    className="button">
            Submit note
    </button>
    <button style={{
        marginTop:'1rem'
    }}
     className="button"
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
    }}className="list-button"
    onClick={handleCancelDeletion} >Cancel deletion</button>
    </>
)}


<div className="list-wrapper"

>

<div className="list-container">


    {tasks.length > 0 ? (

    <div className="list"
       >
       {tasks.map((text,index) => (
        <>

        <div className="element"
        key={index}
        onClick={()=>handleContentClick(index)}
        style={taskStyle(index)}
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
        className={`line ${expandedIndex === (index) ? "clicked" : ""}`}
      />
         <div
        className={`line ${expandedIndex === (index)  ? "clicked" : ""}`}
     />


      
      </div>
        </div>
  
  <p style={markAsCompletedStyle(index)}
 
  className="mark-as-done">
   {completedTasks.includes(tasks[index]) ? 'Mark as uncomplete' : 'mark as complete'}
  </p>
     
    
    </div>
             
    <section className="expanded"
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
        </>
    )
}

export default List;
