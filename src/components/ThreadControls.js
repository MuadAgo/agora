import React from 'react';

const ThreadControls = (props) => {
  return (
    <div className='py-2 mb-3'>
      <span className='mr-2'>
        <button className='btn btn-secondary' onClick={() => props.btnPrevClick(props.pid)}>prev</button>
      </span>
      <span className='mr-2'>
        <button className='btn btn-secondary' onClick={() => props.btnNextClick(props.next)}>next</button>
      </span>
    </div>
  )
}

export default ThreadControls;