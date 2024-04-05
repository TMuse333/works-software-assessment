import react, {useState, useEffect} from 'react'



const Note = () => {

    const [inputData, setInputData] = useState(null)

    const handleInput = (event) => {
        setInputData(event.target.value)
    }


    return (
        <div className=className="flex justify-center items-center h-screen w-screen bg-black">
            <h1 className='text-white '>This is a note</h1>
            <label htmlFor='note
            'className='border-transparent border-none
            focus:outline-none'
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
    )
}

export default Note