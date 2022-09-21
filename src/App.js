import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
