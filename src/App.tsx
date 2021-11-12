import AnimationRoute from '@/views/layout/AnimationRoute';
import { BrowserRouter as Router } from 'react-router-dom';
import '@/styles/common.less';
import { ReactElement } from 'react';

function App(): ReactElement {
  return (
    <Router>
      <AnimationRoute />
    </Router>
  );
}

export default App;
