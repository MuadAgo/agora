import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { callAPI } from '../utils/CallAPI';

const Home = () => {
  const [subscribed, setSubscribed] = useState();
  
  const loadSubscribed = async () => {
    const requestURL = 'https://ago3.uniag.ch/rest/section/subscribed/';
    const requestMethod = 'GET';
    const result = await callAPI({url: requestURL, method: requestMethod});
    if (result.ok) {
      setSubscribed(result.response);
    }
    else {
      // fetch error
    }
  }

  useEffect(() => {
    loadSubscribed();
  }, []);

  return (
    <div className='container-fluid py-4'>
      <div className='border p-4'>
        {Array.isArray(subscribed) && subscribed.map(section => (
          <div className='row' key={section.sid}>
            <div className='col text-right'>{section.unread} / {section.nnode}</div>
            <div className='col col-1 text-right'>{section.nb_flags}&nbsp;&#9873;</div>
            <div className='col'>
              <Link to={{pathname: '/section', search: `?s=${section.sid}`}} >{section.sectionname}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;