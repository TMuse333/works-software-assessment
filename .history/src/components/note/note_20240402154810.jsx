import react, {useState, useEffect} from 'react'



const Note = () => {


    return (
        <div className='bg-black h-screen w-screen
        absolute top-0 left-0'>
            <h1 className='text-white'>This is a note</h1>
            <label htmlFor='note'>
                <input
                name='note'
                type>
                </input>
            </label>
        </div>
    )
}

export default Note