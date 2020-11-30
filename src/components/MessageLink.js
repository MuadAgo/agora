import React from 'react';

const MessageLink = (props) => {
  const messageLinkClicked = (e) => {
    e.preventDefault();
    props.onMessageClick(props.nid);
  }

  return (
    <React.Fragment>
      <a href={props.path} onClick={(e) => messageLinkClicked(e)}>{props.title}</a><span className='ml-2'>{props.author}</span><span className='ml-2'>{props.date}</span>
    </React.Fragment>
  )
}

export default MessageLink;