import { ThemeProvider } from './providers/ThemeProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppContainer from './hoc/AppContainer';
import Home from './views/Home';
import Results from './views/Results';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </AppContainer>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
