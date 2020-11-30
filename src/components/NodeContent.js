import React from 'react';

const NodeContent = (props) => {
  return (
    <div className='preLine'>
      <div>{props.title}</div>
      <div>{props.realname}</div>
      <div>{props.cdate}</div>
      {props.body &&
        <div>
          <hr />
          <div>{props.body}</div>
        </div>
      }
    </div>
  )
}

export default NodeContent;