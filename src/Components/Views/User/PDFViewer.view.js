import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Book from '../../Models/Book.model';
import Notifier from '../../Utils/Notifier';
import { pdfjs, Document, Page } from 'react-pdf';
import BookNotFoundView from './BookNotFound.view';
import LoadingPage from '../../Widgets/Loading.page';
import DB from '../../Database/Database.db';
import BookViewerNav from './PDFViewer.nav';
import Progress from '../../Models/Progress.model';
import UserNav from './User.nav';


const options = {
  cMapUrl: '/cmaps/',
  cMapPacked: true,
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PDFViewer() {

  let id = useParams().id;
  let db = new DB();
  const notifier = new Notifier();

  const [zoom, setZoom] = useState(4);
  const [numPages, setNumPages] = useState();

  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const [book, setBook] = useState(new Book());
  const [progress, setProgress] = useState(Progress.instance({id: id}));
  
  useEffect(()=>{
    initialize();
    // eslint-disable-next-line
  }, [])

  async function initialize(){
    let mBook = await db.Books.findBookByID(id);
    let mProgress = await db.Progress.checkout(id);

    setBook(mBook);
    setProgress(mProgress)
  }

  async function updateProgress(progress){
    setProgress(progress);
    await db.Progress.setProgress(progress)
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function getTemp(object){
    return JSON.parse(JSON.stringify(object));
  }

  // Jump to Next Page / Function
  async function nextPage(){
    let temp = getTemp(progress);

    if(temp.index + 1 < numPages){
      temp.index = temp.index + 1;
      updateProgress(temp);
    }
  }

  // Back to Previos Page / Function
  async function prevPage(){
    let temp = getTemp(progress);

    if(temp.index - 1 > 0){
      temp.index = temp.index - 1;
      updateProgress(temp);
    }
  }

  // Reset Book Index / Function
  function resetProgress(){
    notifier.showConfirmDialog({
      title: 'Reset!',
      message: 'Do you want to start from the begining?',
      confirmText: 'restart',
      onConfirm: async ()=>{
        let pro = getTemp(progress);
        pro.index = 1;
        updateProgress(pro)
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
    <UserNav hideTopBar={true}>
      <div className="row m-0">

        {/* Navbar Section */}
        <BookViewerNav 
          bid={id}
          index={progress.index}
          onNext={nextPage}
          onPrev={prevPage}
          numberOfPages={numPages}
          zoom={zoom}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          progress={progress}
          resetProgress={resetProgress}/>

        {/* Book Pages 
        =======================================================*/}
        
        {book.url && <div className='col-12 of-x-auto p-3'>
          {/* <ReadViewer url={book.url}/> */}
          <Document 
            file={book?.url}
            className='mx-auto'
            onLoadError={(error) => console.log("Inside Error", error)}
            error={<BookNotFoundView />}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadProgress={(e)=>setLoadingProgress(e.loaded / e.total)}
            loading={<LoadingPage progress={loadingProgress} />} 
            options={options}
          >
              
              <div>
                <Page
                    className='custom-page-style shadow w-100'
                    width={window.innerWidth <= 640 ? window.innerWidth - 30 : null}
                    height={window.innerWidth <= 640 ? null : zoom * 150}
                    error={<BookNotFoundView />}
                    pageNumber={progress.index ?? 1}
                    loading={<LoadingPage />} 
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />

                <div className="page-number p-2 text-center"><small>{progress.index ?? 1}</small></div>
              </div>
          </Document>
        </div>}
      </div>
    </UserNav>

  </>);
}

export default PDFViewer;