import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Book from '../../Utils/Book.model';
import Notifier from '../../Utils/Notifier';
import Database from '../../Utils/Database.firebase';
import BookDB from '../../Utils/Book.db';
import { pdfjs, Document, Page } from 'react-pdf';
import ProgressBar from '../../Widgets/ProgressBar.wid';
import BookNotFoundView from './BookNotFound.view';

const options = {
  cMapUrl: '/cmaps/',
  cMapPacked: true,
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function BookView() {

  let id = useParams().id;
  // let bdb = new BookDB();
  let db = new Database();
  let bdb = new BookDB()
  const notifier = new Notifier();

  const [zoom, setZoom] = useState(4);
  const [numPages, setNumPages] = useState();
  const [progress, setProgress] = useState(0)
  
  // eslint-disable-next-line
  const [book, setBook] = useState(new Book());

  useEffect(()=>{

    db.Books.findBookByID(id)
    .then((mBook)=>{
      if(mBook){
        let savedBook = bdb.getBookByID(id);
        
        if(!savedBook){
          bdb.insert(mBook);
          savedBook = mBook;
        }

        setBook(savedBook);

      }else{
        setBook(null);
      }
    });
    
    // eslint-disable-next-line
  }, [])

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function getTemp(object){
    return JSON.parse(JSON.stringify(object));
  }

  // Jump to Next Page / Function
  async function nextPage(){
    let mBook = getTemp(book);
    mBook.index = book.index + 1;
    bdb.update(mBook);
    setBook(mBook)
  }

  // Back to Previos Page / Function
  async function prevPage(){
    let mBook = getTemp(book);
    if(mBook.index - 1 > 0){
      mBook.index = book.index - 1;
      bdb.update(mBook);
      setBook(mBook)
    }
  }

  // Reset Book Index / Function
  function resetBook(){
    notifier.showConfirmDialog({
      title: 'Reset!',
      message: 'Do you want to start from the begining?',
      confirmText: 'restart',
      onConfirm: async ()=>{
        let mBook = getTemp(book);
        mBook.index = 1;
        bdb.update(mBook);
        setBook(mBook)
      }
    })
  }

  // Zoom In / Function
  function zoomIn(){
    let z = zoom + 1;
    if(z <= 8){
      setZoom(z);
    }
  }

  // Zoom Out/ Function
  function zoomOut(){
    let z = zoom - 1;
    if(z >= 2){
      setZoom(z);
    }
  }

    return (<>      

      {/* Large screens */}
      <div>
        <div className="row m-0">

          {/* Navbar Section */}
          <div className="col-12 py-2 mb-5">

            <div className="card border-0 rounded-0 shadow-sm fixed-top m-0 px-1 py-2">

              <div className='row m-0'>
                {/* Home */}
                <div className="col-6 col-lg-4 d-flex justify-content-start align-items-center">
                  <a href='/' className="btn border-0 text-black mx-1">
                    <i className="fa-solid fa-house fa-lg"></i>
                  </a>

                  <button className="btn border-0 text-black mx-1" onClick={resetBook}>
                    <i className="fa-solid fa-arrow-rotate-left fa-lg"></i>
                  </button>

                  <i className="fa-solid fa-grip-lines-vertical fa-lg text-secondary"></i>

                  <span className="w-100 text-truncate d-inline-block text-secondary fw-bold mx-2" title={book?.title ?? 'Title'}>
                    {book?.title ?? 'Title'}
                  </span>
                </div>

                {/* Navigation buttons Section 
                ======================================================= */}
                <div className="col-6 col-lg-4 d-flex justify-content-end justify-content-lg-center">
                  <button className="btn text-secondary border-0 mx-1" onClick={prevPage}>
                    <i className="fa-solid fa-angles-left"></i>
                  </button>

                  <button className="btn btn text-black fw-bold border-0 mx-1 disabled">
                    {book?.index ?? 1} <span className='d-none d-lg-inline-block'>&nbsp;/&nbsp;{numPages}</span>
                  </button>

                  <button className="btn text-secondary border-0 mx-1" onClick={nextPage}>
                    <i className="fa-solid fa-angles-right"></i>
                  </button>
                      
                </div>

                {/* Zoom Section 
                ======================================================= */}
                {window.innerWidth > 640 && <div className="col-4 d-flex justify-content-end ">

                  <button className="btn text-secondary border-0 mx-1" onClick={zoomOut}>
                    <i className="fa-solid fa-magnifying-glass-minus fa-lg"></i>
                  </button>

                  <button className="btn btn text-black fw-bold border-0 mx-1 d-none d-lg-block" onClick={()=>setZoom(3)}>
                    <small><small>{zoom * 20} %</small></small>
                  </button>

                  <button className="btn text-secondary border-0 mx-1" onClick={zoomIn}>
                    <i className="fa-solid fa-magnifying-glass-plus fa-lg"></i>
                    
                  </button>
                      
                </div>}
              </div>
            </div>
          </div>

          {/* End Of Actions */}
          
          {/* Book Pages 
          =======================================================*/}
          
          {book.url && <div className='col-12 of-x-auto p-3'>
            {/* <BookViewer url={book.url}/> */}
            <Document 
              file={book?.url}
              className='mx-auto'
              onLoadError={(error) => console.log("Inside Error", error)}
              error={<BookNotFoundView />}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadProgress={(e)=>setProgress(e.loaded / e.total)}
              loading={<ProgressBar progress={progress} />} 
              options={options}
            >
                
                <div className=''>
                  <Page
                      className='custom-page-style shadow w-100'
                      width={window.innerWidth <= 640 ? window.innerWidth - 30 : null}
                      height={window.innerWidth <= 640 ? null : zoom * 150}
                      error={<BookNotFoundView />}
                      pageNumber={book.index ?? 1}
                      loading={<ProgressBar progress={-1} />} 
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />

                  <div className="page-number p-2 text-center"><small>{book?.index ?? 1}</small></div>
                </div>
            </Document>
          </div>}
        </div>
      </div>
    </>);
  }

export default BookView;