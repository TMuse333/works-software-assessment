import react, {useState, useEffect} from 'react'



const Note = () => {

    const [inputData, setInputData] = useState(null)


    return (
        <div className='bg-black h-screen w-screen
        absolute top-0 left-0'>
            <h1 className='text-white'>This is a note</h1>
            <label htmlFor='note'
          >
                <input
                name='note'
                type='name'
                placeholder='enter your note here'
                className='p-4 placeholder-black-400'
                >
                </input>
            </label>
        </div>
    )
}

export default Note