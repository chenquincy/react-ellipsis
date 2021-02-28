import React from 'react';

import Ellipsis from '../../src';
import './ellipsis.css';

function EllipsisDemo(props) {
  return (
    <div className="demo">
      <div className="demo-title">demo</div>
      <div className="demo-container">
        <Ellipsis {...props} />
      </div>
    </div>
  );
}
export default React.memo(EllipsisDemo);
