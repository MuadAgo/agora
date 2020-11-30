import React from 'react';

const NodeControls = (props) => {
  return (
    <div className='py-2 mb-3'>
      <span className='mr-2'>
        <button className='btn btn-primary' onClick={() => props.btnReplyClicked()}>reply</button>
      </span>
      <span className='mr-2'>
        <button className='btn btn-secondary' disabled={props.pid === '-1'} onClick={() => props.btnPrevClick(props.pid)}>prev</button>
      </span>
      <span className='mr-2'>
        <button className='btn btn-secondary' onClick={() => props.btnNextClick(props.next)}>next</button>
      </span>
      <span className='mr-2'>
        <button className='btn btn-danger'>delete</button>
      </span>
      <span>flagged:{props.flagged}</span>
    </div>
  )
}

export default NodeControls;