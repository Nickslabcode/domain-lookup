import { ThemeProvider } from './providers/ThemeProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Results from './views/Results';
import { HistoryProvider } from './providers/HistoryProvider';
import HistoryModal from './components/HistoryModal';
import Layout from './hoc/Layout';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <HistoryProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </Layout>
          <HistoryModal />
        </HistoryProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
