<div className='bg-black h-screen w-screen relative'>
  <div className='absolute top-8 left-1/2 transform -translate-x-1/2'>
    <label htmlFor='note' className='border-transparent border-none focus:outline-none'>
      <textarea
        name='note'
        type='name'
        placeholder='Enter your note here'
        className='p-4 placeholder-gray-200 bg-transparent text-gray-200 border-transparent border-none leading-6 focus:outline-none'
        onChange={handleInput}
      ></textarea>
    </label>
  </div>
</div>
