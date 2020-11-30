import React, { useEffect, useState, useCallback } from 'react';
import { callAPI } from '../utils/CallAPI';
import SectionControls from './SectionControls';
import Thread from './Thread';
import Node from './Node';
import NodeCreate from './NodeCreate';

const Section = (props) => {
  const location = props.location;
  const searchParams = new URLSearchParams(location.search);
  const sectionID = searchParams.get('s');
  const nodeID = searchParams.get('n');

  const [tree, setTree] = useState();
  const [viewMode, setViewMode] = useState('showunread');
  const [refresh, setRefresh] = useState(true);
  const [activeNode, setActiveNode] = useState(nodeID);
  const [nodeCreate, setNodeCreate] = useState({create: false, replyTo: false});

  const loadSection = useCallback(async () => {
    const requestURL = `https://ago3.uniag.ch/rest/thread/sid/${sectionID}/${viewMode}/200/before/`;
    const requestMethod = 'GET';
    const result = await callAPI({url: requestURL, method: requestMethod});
    if (result.ok) {
      console.log('set tree');
      setRefresh(false);
      setTree(result.response.tree);
    }
    else {
      // fetch error
    }
  }, [sectionID, viewMode]);

  useEffect(() => {
    refresh && loadSection();
  }, [loadSection, refresh]);

  const displayNode = (nid) => {
    if (nid !== activeNode) {
      props.history.push(`${location.pathname}?s=${sectionID}&n=${nid}`);
      setActiveNode(nid);
      closeNodeCreate();
    } else {
      (nodeCreate.create && (!nodeCreate.replyTo || nodeCreate.replyTo.nid !== activeNode)) && closeNodeCreate();;
    }
  }

  const createNewNode = (create, reply) => {
    setNodeCreate({create: create, replyTo: reply});
  }

  const closeNodeCreate = () => {
    setNodeCreate({create: false, replyTo: false});
  }

  const markThreadRead = (tid) => {
    console.log(tid);
  }

  return (
    <div className='container-fluid py-4'>
      <SectionControls btnNewThreadClicked={() => createNewNode(true, false)} viewMode={viewMode} btnViewModeClick={(mode) => {setViewMode(mode); setRefresh(true);}} />
      <div className='border p-4 my-3'>
        {Array.isArray(tree) && tree.map(branch => {
          const thread = branch[Object.getOwnPropertyNames(branch)];
          return (thread !== undefined && thread !== 0) && <Thread key={thread.tid} path={location.pathname} sid={sectionID} thread={thread} messageClicked={(nid) => displayNode(nid)} threadReadClicked={() => markThreadRead(thread.tid)} />
        })}
      </div>
      {(activeNode || nodeID) && <Node sid={sectionID} nid={activeNode || nodeID} replyToNode={(nodeContent) => createNewNode(true, nodeContent)} />}
      {nodeCreate.create && <NodeCreate createParams={nodeCreate} sid={sectionID} cancelNodeCreate={() => closeNodeCreate()} />}
    </div>
  );
}

export default Section;