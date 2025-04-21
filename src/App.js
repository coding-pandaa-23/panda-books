import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeView from './Components/Views/Guest/Home.view';
import BookView from './Components/Views/Guest/Book.view';
import NotFoundView from './Components/Views/NoFound.view';
import AdminView from './Components/Views/Admin/Admin.view';
import DialogsContainer from './Components/DialogsContainer';

function App() {
  return (<>
    <DialogsContainer />
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<AdminView />}/>
        <Route path='/' element={<HomeView />}/>
        <Route path='/books/:id' element={<BookView />}/>
        <Route path='*' element={<NotFoundView />}/>
      </Routes>
    </BrowserRouter>
  </>);
}

export default App;
