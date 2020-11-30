import React from 'react';
import Child from './Child';
import MessageLink from './MessageLink';

const Thread = (props) => {
  return (
    <div className='mb-3'>
      <MessageLink path={`${props.path}?s=${props.sid}&n=${props.thread.nid}`} nid={props.thread.nid} title={props.thread.title} author={props.thread.realname} date={props.thread.cdate} onMessageClick={(nid) => props.messageClicked(nid)} />
      <span className='ml-2'><button className='btn btn-link btn-thread' onClick={() => props.threadReadClicked()}>read</button></span>
      {props.thread.childs && <ul>
        {Object.keys(props.thread.childs).map((key, index) => {
          const child = props.thread.childs[key];
          return <Child key={key} path={props.path} sid={props.sid} message={child} messageClicked={(nid) => props.messageClicked(nid)} />
        })}
      </ul>}
    </div>
  );
}

export default Thread;