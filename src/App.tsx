import { ThemeProvider } from './providers/ThemeProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppContainer from './hoc/AppContainer';
import Home from './views/Home';
import Results from './views/Results';
import { HistoryProvider } from './providers/HistoryProvider';
import HistoryModal from './components/HistoryModal';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <HistoryProvider>
          <AppContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/results" element={<Results />} />
            </Routes>
            <HistoryModal />
          </AppContainer>
        </HistoryProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
