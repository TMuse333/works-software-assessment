import React,{useState, useEffect} from "react";
import './hydrolist.css'
import { hydroText } from "../../data/data";

const HydroList = ({text,intro,absolute}) => {

    const [expandedIndex, setExpandedIndex] = useState(null);

    const [isHovered, setIsHovered] = useState(null)

    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 865);

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

    const placeHolder = [
      {
        name: "Scenic Views",
        description: "Bedford offers stunning views of the Bedford Basin and has many homes situated along its picturesque coastline, providing residents with breathtaking views of the water."
      },
      {
        name: "Community Events",
        description: "The Bedford community hosts various events throughout the year, including festivals, farmers' markets, and cultural celebrations, creating a vibrant and engaging atmosphere for residents and visitors alike."
      },
      {
        name: "Historic Charm",
        description: "With a rich history dating back centuries, Bedford is home to many historic buildings and landmarks, adding character and charm to its neighborhoods."
      },
      {
        name: "Recreational Opportunities",
        description: "Residents of Bedford enjoy access to a wide range of recreational activities, including hiking trails, parks, and waterfront areas, making it an ideal location for outdoor enthusiasts."
      },
      {
        name: "Convenient Amenities",
        description: "Bedford boasts a variety of amenities, including shopping centers, restaurants, schools, and healthcare facilities, providing residents with everything they need for a comfortable and convenient lifestyle."
      }
  ];

  text = text || placeHolder



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
      
     
      

    return (
        <>
        <div className="hydro-wrapper"
             style={{
                    
                      
              marginTop:absolute ? '5rem' : '0'
            }}
>

<h2 style={{
    marginLeft:'1rem',
    color:'white'
}}>{intro?.title || 'Title Here'}</h2>

              <p className="docs-intro"
              style={{
                fontSize: absolute? '1.4rem' : 'auto'
              }}>
            {intro?.description || 'intro'}

        </p>
   
        <div className="hydrolist-container">

            <div className="hydro-list"
               >
               {text.map((text,index) => (
                <div className="hydro-element"
                key={index}
                onClick={()=>handleContentClick(index)}
                style={hydroStyle(index)}
                onMouseEnter={()=>handleMouseEnter(index)}
                onMouseLeave={()=>handleMouseLeave()}
                >

<div className="name-logo-box">
              <h2>{text?.name }</h2>
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
                    {text.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius excepturi beatae dolorum laborum reiciendis iste quisquam odio tempore tempora fugit?'}
                  </p>
                 
                  </section>
                       

                             
                  
                    </div>

               ))}



            </div>
        </div>
        </div>
        </>
    )
}

export default HydroList