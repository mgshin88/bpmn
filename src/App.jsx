import React from 'react';
import {ViewWrapper} from '@components';

const App = (props) => {
  return (
  <div style={{ height: '100%', width: '100%' }}>
    <ViewWrapper tenant={props.tenant}/>
  </div>
)}

export default App;