import react, {useState, useEffect} from 'react'



const Note = () => {

    const [inputData, setInputData] = useState(null)

    const handleInput = (event) => {
        setInputData(event.target.value)
    }


    return (
        <div className='bg-black h-screen w-screen
        absolute top-0 left-0'
        >
            <div className='relative'>

      
           
            <label htmlFor='note
            'className='border-transparent border-none
            focus:outline-none
            absolute top-10'
          >
                <textarea
                name='note'
                type='name'
                placeholder='Enter your note here'
                className='p-4 placeholder-gray-200
                bg-transparent text-gray-200 border-transparent
                border-none  leading-6 focus:outline-none'
                onChange={()=>handleInput(e)}
                >
                </textarea>
            </label>
            </div>
        </div>
    )
}

export default Note