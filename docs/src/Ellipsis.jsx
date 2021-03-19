import React, { useEffect, useState } from 'react';

import Ellipsis from '../../src';
import './ellipsis.css';

function EllipsisDemo(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="demo">
      <div className="demo-container">{show && <Ellipsis {...props} />}</div>
    </div>
  );
}
export default React.memo(EllipsisDemo);
