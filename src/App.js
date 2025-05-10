import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeView from './Components/Views/User/Home.view';
import BookView from './Components/Views/User/Book.view';
import NotFoundView from './Components/Views/NoFound.view';
import AdminView from './Components/Views/Admin/Admin.view';
import DialogsContainer from './Components/DialogsContainer';
import PDFViewer from './Components/Views/Public/PDFViewer.view';
import LibraryView from './Components/Views/User/Library.view';
import PersonalView from './Components/Views/User/Personal.view';

function App() {
  return (<>
    <DialogsContainer />
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path='/admin' element={<AdminView />}/>
        

        {/* Guest / User */}
        <Route path='/' element={<HomeView />}/>
        {/* Library */}
        <Route path='/library' element={<LibraryView />} />
        <Route path='/library/:cid' element={<LibraryView />} />

        {/* Books */}
        <Route path='/books/:id' element={<BookView />}/>
        <Route path='/books/reader/:id' element={<PDFViewer />}/>

        {/* Account */}
        <Route path='/account/personal' element={<PersonalView />}/>          {/* Not Ready */}
        <Route path='/account/favorites' element={<BookView />}/>         {/* Not Ready */}
        <Route path='/account/continue-reading' element={<BookView />}/>  {/* Not Ready */}

        {/* Community */}
        <Route path='/account/community' element={<BookView />}/>  {/* Not Ready */}


        {/* Page Not found */}
        <Route path='*' element={<NotFoundView />}/>
      </Routes>
    </BrowserRouter>
  </>);
}

export default App;
