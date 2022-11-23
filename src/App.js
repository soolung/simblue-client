import ReactModal from 'react-modal';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Look from './pages/Look/Look';
import Record from "./pages/Record/Record";
import ApplicationManagement from "./pages/Application/ApplicationManagement";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<Main/>}/>
                    <Route path='/look' element={<Look/>}/>
                    <Route path='/record' element={<Record/>}/>
                    <Route path='/application/:id' element={<ApplicationManagement/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default App;

ReactModal.setAppElement('#root')
