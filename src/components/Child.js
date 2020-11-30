import React from 'react';
import MessageLink from './MessageLink';

const Child = (props) => {
  const messageClicked = (nid) => {
    props.messageClicked(nid);
  }

  return (
    <li>
      <MessageLink path={`${props.path}?s=${props.sid}&n=${props.message.nid}`} nid={props.message.nid} title={props.message.title} author={props.message.realname} date={props.message.cdate} onMessageClick={(nid) => messageClicked(nid)} />
      {props.message.childs &&
        <ul>
          {props.message.childs && Object.keys(props.message.childs).map((key) => {
            const child = props.message.childs[key];
            return <Child key={key} path={props.path} sid={props.sid} message={child} messageClicked={(nid) => props.messageClicked(nid)} />
          })}
      </ul>}
    </li>
  );
}

export default Child;