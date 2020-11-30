import React from 'react';
import { Link } from 'react-router-dom';

const SectionControl = (props) => {
  return (
    <div className='border px-4 py-3 my-3'>
      <span className='mr-2'>
        <Link to='/home' className='btn btn-primary'>home</Link>
      </span>
      <span className='mr-2'>
        <button className='btn btn-primary' onClick={() => props.btnNewThreadClicked()}>new thread</button>
      </span>
      <span className='mr-2'>
        <button className='btn btn-secondary' onClick={() => props.btnViewModeClick('showunread')}>view new</button>
      </span>
      <span className='mr-2'>
        <button className='btn btn-secondary' onClick={() => props.btnViewModeClick('showall')}>view all</button>
      </span>
      <span className='mr-2'>
        {/* <button className='btn btn-danger'>delete</button> */}
      </span>
    </div>
  );
}

export default SectionControl;