import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Book from '../../Models/Book.model';
import Notifier from '../../Utils/Notifier';
import { pdfjs, Document, Page } from 'react-pdf';
import BookNotFoundView from '../Public/BookNotFound.view';
import LoadingPage from '../../Widgets/Loading.page';
import DB from '../../Database/Database.db';
import BookViewerNav from './PDFViewer.nav';
import { Modal } from 'bootstrap';
import RegisterModal from './Register.modal';
import Progress from '../../Models/Progress.model';


const options = {
  cMapUrl: '/cmaps/',
  cMapPacked: true,
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const registerModalID = 'PDFViewerRegisterModalId';

function PDFViewer() {

  let id = useParams().id;
  let db = new DB();
  const notifier = new Notifier();

  const [zoom, setZoom] = useState(4);
  const [numPages, setNumPages] = useState();
  const [index, setIndex] = useState(1);

  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const [book, setBook] = useState(new Book());
  
  const [user, setUser] = useState();
  const [progress, setProgress] = useState();
  
  useEffect(()=>{
    initialize();
    // eslint-disable-next-line
  }, [])

  async function initialize(){
    let mBook = await db.Books.findBookByID(id);
    setBook(mBook);
    
    db.userStream((mUser, mProgress)=>{
      setUser(mUser);
      setProgress(mProgress.find((p)=> p.id === id) ?? Progress.instance());
    })
  
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function getTemp(object){
    return JSON.parse(JSON.stringify(object));
  }

  // Jump to Next Page / Function
  async function nextPage(){
    if(index + 1 < numPages){
      let ind = index + 1;
      notifier.setLoading(true);
      setIndex(ind);
      await db.Progress.setIndex(ind);
      notifier.setLoading(false);
    }
  }

  // Back to Previos Page / Function
  async function prevPage(){
    if(index - 1 > 0){
      setIndex(index - 1);
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
        setProgress(pro)
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

  function showRegisterModal(){
    // Show Register Modal
    let modal = Modal.getInstance(`#${registerModalID}`);
            
    if(!modal){
        modal = new Modal(`#${registerModalID}`)
    }

    modal.show();
  }

    return (<>      

      {/* Large screens */}
      <div>
        <div className="row m-0">

          {/* Navbar Section */}
          <BookViewerNav 
            bid={id}
            index={index}
            onNext={nextPage}
            onPrev={prevPage}
            numberOfPages={numPages}
            zoom={zoom}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            progress={progress}
            resetProgress={resetProgress}
            onRegister={showRegisterModal}/>

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
                      pageNumber={index ?? 1}
                      loading={<LoadingPage />} 
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />

                  <div className="page-number p-2 text-center"><small>{index ?? 1}</small></div>
                </div>
            </Document>
          </div>}
        </div>
      </div>

      <RegisterModal nodeId={registerModalID} />
    </>);
  }

export default PDFViewer;