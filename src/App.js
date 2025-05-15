import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeView from './Components/Views/User/Home.view';
import NotFoundView from './Components/Views/NoFound.view';
import DialogsContainer from './Components/DialogsContainer';
import PDFViewer from './Components/Views/User/PDFViewer.view';
import AdminView from './Components/Views/User/Admin.view';

function App() {
  return (<>
    <DialogsContainer />
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path='/admin' element={<AdminView />}/>
        

        {/* Guest / User */}
        <Route path='/' element={<HomeView />}/>

        {/* Books */}
        <Route path='/books/:id' element={<PDFViewer />}/>

        {/* Page Not found */}
        <Route path='*' element={<NotFoundView />}/>
      </Routes>
    </BrowserRouter>
  </>);
}

export default App;
