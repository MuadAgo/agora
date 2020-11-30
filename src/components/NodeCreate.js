import React from 'react';
import { useInput } from '../utils/InputHook';
import { callAPI } from '../utils/CallAPI';

const NodeCreate = (props) => {
  const {value:title, bind:bindTitle, reset:resetTitle} = useInput('');
  const {value:content, bind:bindContent, reset:resetContent} = useInput('');

  const formNodeCreateSubmit = async (e) => {
    e.preventDefault();
    const requestURL = `https://ago3.uniag.ch/rest/node/sid/${props.sid}/${props.createParams.replyTo ? `pid/${props.createParams.replyTo.nid}/` : ''}`;
    console.log(requestURL);
    const requestMethod = 'POST';
    const requestBody = JSON.stringify({
      title: title,
      body: content
    });
    const result = await callAPI({url: requestURL, method: requestMethod, body: requestBody});
    if (result.ok) {
      console.log(result.response);
    }
    else {
      // fetch error
    }
  }

  const formNodeCreateReset = () => {
    resetTitle();
    resetContent();
  }

  return (
    <div className='border p-4 my-3'>
      <form onSubmit={formNodeCreateSubmit} onReset={formNodeCreateReset}>
        <div className='form-group'>
          <label htmlFor='msgTitle'>Title</label>
          <input id='msgTitle' type='text' className='form-control' placeholder='Title' {...bindTitle} required />
        </div>
        <div className='form-group'>
          <label htmlFor='msgContent'>Content</label>
          <textarea id='msgContent' type='input' className='form-control' placeholder='Content' {...bindContent} required />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-primary'>post</button>
          <button type='reset' className='btn btn-secondary ml-2'>reset</button>
          <button type='button' className='btn btn-danger ml-2' onClick={() => {props.cancelNodeCreate();}}>cancel</button>
        </div>
      </form>
    </div>
  );
}

export default NodeCreate;