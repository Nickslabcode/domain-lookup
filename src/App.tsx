import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Results from './views/Results';
import Layout from './hoc/Layout';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
