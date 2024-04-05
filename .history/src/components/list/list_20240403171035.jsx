import React,{useState, useEffect} from "react";
import './list.css'


const HydroList = ({absolute}) => {

    const [expandedIndex, setExpandedIndex] = useState(null);

    const [isHovered, setIsHovered] = useState(null)

    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 865);


    const [tasks, setTasks] = useState([])

    const [addNote, setAddNote] = useState(false)

    const [input, setInput] = useState(null)

    const [description, setDescription] = useState(null)



    const handleInputChange = (event,description) => {

        if(description){
            setDescription(event.target.value)
        }
        else{
            setInput(event.target.value)
        }
       
        
    }

    const addTask = (event,description) => {

       

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



 



    const handleMouseEnter = (index) => {
        setIsHovered(index)
    }

    const handleMouseLeave = () => {
        setIsHovered(null)
    }

    const handleContentClick = (index) => {
       if(index === expandedIndex){
        setExpandedIndex(null)
       }
       else{
        setExpandedIndex(index)
       }   
      };


      const hydroStyle = (index) => {
        const hovered = isHovered === index

        return (
            {
                backgroundColor: hovered ? 'rgb(144, 118, 0)' : null,
               
                transition: 'all 0.3s ease-in',
                borderBottom: hovered ? null : '2px solid white',
                border: hovered? '2px solid white' : null,

            }
        )
      }



    const contentStyle = (index) => {

      
      const isExpanded =   expandedIndex === index;
      
        return {
          height: isExpanded ? '230px' : '0',
          transition: isExpanded
            ? 'height 0.5s ease-in, opacity 0.5s ease-in'
            : 'height 0.3s ease-in, opacity 0.5s ease-in 0.3s',
          overflow: isExpanded ? 'scroll' : 'hidden',
        //   opacity: isExpanded ? '1' : '0',
        
        };
      };
      
      const handleAddNote = () => {
        setAddNote(true)
      }

      const handleSubmitNote = () => {
        setTasks(() => [...tasks, input])
        setAddNote(false)
      }

      
     
      

    return (
        <>

        <div className="options">
            <button className="hydro-button"
            onClick={handleAddNote}>
                Add note
            </button>
            <button className="hydro-button">
                Delete Note
            </button>
        </div>

        {addNote && (
            <><div className="add-note-container">
            <label htmlFor="note">
                <input
               type='name'
                name='note'
                placeholder="enter your note"
                onChange={(event)=>handleInputChange(event,false)}>
                </input>
            </label>

            <button onClick={()=>handleSubmitNote()}
            className="hydro-button">
                    submit note
            </button>
            </div>
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
                <div className="hydro-element"
                key={index}
                onClick={()=>handleContentClick(index)}
                style={hydroStyle(index)}
                onMouseEnter={()=>handleMouseEnter(index)}
                onMouseLeave={()=>handleMouseLeave()}
                >

<div className="name-logo-box">
              <h2>{text }</h2>
              <div className="plus-minus">
              
              <div
                className={`hydro-line ${expandedIndex === (index) ? "clicked" : ""}`}
              />
                 <div
                className={`hydro-line ${expandedIndex === (index)  ? "clicked" : ""}`}
             />
              
              </div>
            </div>

            

     
                     
<section className="hydro-expanded"
 style={contentStyle(index)}>


                  <p
                  className=""
                 
                >
                    {'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius excepturi beatae dolorum laborum reiciendis iste quisquam odio tempore tempora fugit?'}
                  </p>
                 
                  </section>
                       

                             
                  
                    </div>

               ))}



            </div>

) : <h2 className="no-notes">
    You currently have no tasks, click the add button to add
    a task!</h2>}
        </div>
        </div>
        </>
    )
}

export default HydroList