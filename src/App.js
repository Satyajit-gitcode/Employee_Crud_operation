import React, { useState } from 'react';
import Signup from './Signup';

const App = () => {
  const [nextId, setNextId] = useState(1);

  const handleNextId = () => {
    setNextId(nextId + 1);
  };

  return (
    <div>
      <Signup nextId={nextId} incrementId={handleNextId} />
    </div>
  );
};

export default App;
