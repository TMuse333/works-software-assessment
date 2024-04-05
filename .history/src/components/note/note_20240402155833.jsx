import react, {useState, useEffect} from 'react'



const Note = () => {

    const [inputData, setInputData] = useState(null)

    const handleInput = (event) => {
        setInputData(event.target.value)
    }


    return (
        <div className='bg-black h-screen w-screen
        absolute top-0 left-0'>
            <h1 className='text-white border-none'>This is a note</h1>
            <label htmlFor='note'
          >
                <textarea
                name='note'
                type='name'
                placeholder='Enter your note here'
                className='p-4 placeholder-gray-200
                bg-transparent text-gray-200
                border-none  leading-6'
                onChange={()=>handleInput(e)}
                >
                </textarea>
            </label>
        </div>
    )
}

export default Note