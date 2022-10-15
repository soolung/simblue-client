import ReactModal from 'react-modal';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Look from './pages/Look/Look';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Main />} />
            <Route path='/look' element={<Look />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;

ReactModal.setAppElement('#root')
