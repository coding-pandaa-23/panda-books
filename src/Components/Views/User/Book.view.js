import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Book from '../../Models/Book.model';
import BookNotFoundView from '../Public/BookNotFound.view';
import LoadingPage from '../../Widgets/Loading.page';
import { formateDate } from '../../Utils/static.util';
import UserNav from '../Public/User.nav';
import DB from '../../Database/Database.db';
import ProgressDB from '../../Database/Progress.db';
import FavoriteButton from '../../Widgets/FavoriteButton.wid';
import RegisterModal from '../Public/Register.modal';
import { Modal } from 'bootstrap';

function BookView() {

  const registerModalID = 'BooksViewRegisterModalId'

  let id = useParams().id;
  let db = new DB();
  let pdb = new ProgressDB();
  
  const [isLoading, setLoading] = useState(true);

  // eslint-disable-next-line
  const [book, setBook] = useState(new Book());
  const [category, setCategory] = useState();
  const [progress, setProgress] = useState();
  const [user, setUser] = useState();

  useEffect(()=>{

    // Set Public Data
    db.publicStream((books, categories)=>{
      const mBook = books.find((b)=> b.id === id);
      setBook(mBook);
      setCategory(categories.find((cat)=> cat.id === mBook?.category))

      setLoading(false);
    });

    // Set User Data
    db.userStream((userInfo, progressList)=>{
      setUser(userInfo);
      setProgress(progressList.find((p)=> p.id === id));
    })

    // eslint-disable-next-line
  }, [])

  // Trigger Register
  function showRegisterModal(){
    let modal = Modal.getInstance(`#${registerModalID}`);
    if(!modal){
      modal = new Modal(`#${registerModalID}`)
    }

    modal.show();

  }


  return (<>   

    {/* Side Nav */}
    <UserNav view='library'>
      {book && <LoadingPage isLoading={isLoading}>
        <div className="col-12 col-lg-10 offset-lg-1 mt-4 px-3">
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/library">Library</a></li>
                  {category && <li className="breadcrumb-item"><a href={`/library/${book?.category}`}>{category?.title}</a></li>}
                  {book && <li className="breadcrumb-item active" aria-current="page">{book.title}</li>}
                </ol>
              </nav>
            </div>

            <div className="col-12 col-md-4">
              <div className="card border-0 shadow-lg of-none mb-5">
                <img src={book?.coverUrl} alt={book?.title ?? ''} className='book-view-cover' />
              </div>
            </div>

            <div className="col-12 col-md-7 offset-md-1 text-secondary">

              <div className='mb-4 d-flex justify-content-between align-items-center'>

                {/* Title */}
                <span>
                  <b className='fs-4 '>{book?.title ?? 'Title'}</b>
                </span>

                {/* Rate */}
                {book?.rate && <div>
                  <span className='me-2'>({book?.rate ?? 0})</span>
                  {Array.from(Array(parseInt(book?.rate) ?? 1).keys()).map((r, ind)=> (<i key={ind} className="fa-solid fa-star text-warning"></i>))}
                  {parseInt(book?.rate ?? 1) < (book?.rate ?? 1) && <i className="fa-solid fa-star-half-stroke text-warning"></i>}
                </div>}
              </div>


              {/* Rate */}

              {/* Desc */}
              <div className='d-flex justify-content-start align-items-center mb-4'>
                <code className='text-secondary'>{book?.desc ?? ''}</code>
              </div>

              <div className="mb-5">
                
                <table className='w-50 book-view-info-table'>
                  <tbody>

                    {/* Category */}
                    <tr >
                      <th><code>CATEGORY</code></th>
                      <td>{category?.title ?? ''}</td>
                    </tr>

                    {/* Author */}
                    <tr>
                      <th><code>AUTHOR</code></th>
                      <td>{book?.author ?? 'Author'}</td>
                    </tr>

                    {/*  */}
                    <tr>
                      <th><code>PUBLISHER</code></th>
                      <td>{book.publisher ?? 'Publisher'}</td>
                    </tr>

                    {/*  */}
                    <tr>
                      <th><code>FIRST PUBLISH</code></th>
                      <td>{book.publicationDate ?? 'First Publish'}</td>
                    </tr>

                    {/*  */}
                    <tr>
                      <th><code>LANGUAGE</code></th>
                      <td>{book.language ?? 'Langugae'}</td>
                    </tr>

                    {/*  */}
                    <tr>
                      <th><code>LAST UPDATE</code></th>
                      <td>{formateDate(book.lastUpdate) ?? 'Last Update'}</td>
                    </tr>

                  </tbody>
                </table>
              </div>


              <hr />

              <div className='col-12 d-flex justify-content-between mb-4'>
                {/* Add To Favorite */}
                <FavoriteButton 
                  bid={id} 
                  active={user != null}
                  isFav={progress?.isFavorite} 
                  onRegister={showRegisterModal}/>

                {/* Show PDF */}
                <a href={`/books/reader/${book.id}`} className="btn btn-light text-primary mx-1">
                  <code className='text-primary'>
                    <i className="fa-solid fa-book-open fa-lg me-3"></i>
                    {progress?.index > 1 ? 'Continue Reading' : 'Start Reading'}
                  </code>
                </a>
              </div>

            </div>
          </div>
        </div>
      </LoadingPage>}

      {!book && <BookNotFoundView />}

      <RegisterModal nodeId={registerModalID}/>

    </UserNav>
  </>);
  }

export default BookView;