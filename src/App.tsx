import './App.css';
import ThemeController from './components/ThemeController';

function App() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <ThemeController />
      </div>
      <h1 className="font-semibold">Domain lookup</h1>
      <div className="flex justify-center gap-4">
        <button className="btn btn-info">info</button>
        <button className="btn btn-primary">primary</button>
        <button className="btn btn-secondary">secondary</button>
      </div>
    </div>
  );
}

export default App;
