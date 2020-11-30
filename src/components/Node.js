import React, { useState, useEffect, useCallback } from 'react';
import { callAPI } from '../utils/CallAPI';
import NodeContent from './NodeContent';
import NodeControls from './NodeControls';

const Node = (props) => {
  const [nodeContent, setNode] = useState();

  const loadNode = useCallback(async (sid, nid) => {
    const requestURL = `https://ago3.uniag.ch/rest/node/sid/${sid}/nid/${nid}/`;
    const requestMethod = 'GET';
    const result = await callAPI({url: requestURL, method: requestMethod});
    if (result.ok) {
      setNode(result.response);
    }
    else {
      // fetch error
    }
  }, []);

  useEffect(() => {
    loadNode(props.sid, props.nid);
  }, [loadNode, props.sid, props.nid]);

  if (nodeContent) {
    return (
      <div className='border p-4 my-3'>
        <NodeControls sid={nodeContent.sid} nid={nodeContent.nid} pid={nodeContent.pid} next={''} flagged={nodeContent.flag} btnPrevClick={(nid) => loadNode(props.sid, nid)} btnNextClick={(id) => loadNode(props.sid, id)} btnReplyClicked={() => props.replyToNode(nodeContent)} />
        <NodeContent title={nodeContent.title} realname={nodeContent.realname} cdate={nodeContent.cdate} body={nodeContent.body} />
      </div>
    )
  }
  else {
    return null;
  }
}

export default Node;