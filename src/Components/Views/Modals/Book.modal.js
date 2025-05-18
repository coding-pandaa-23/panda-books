

import { useEffect, useState } from 'react';
import { emptyCoverUrl, formateDate } from '../../Utils/static.util';
import DB from '../../Database/Database.db';


/**
 * 
 * @param {object} options 
 * @param {import('../../Models/Book.model').default} options.book 
 * @returns 
 */
const AdminBookModal = ({book}) => {
    const [category, setCategory] = useState(); 

    useEffect(()=>{
        initialize();
    })

    async function initialize(){
        let cat = await new DB().Categories.findCategoryByID(book?.category);
        setCategory(cat);
    }

    return ( <div id="adminBookModal" className="modal modal-lg">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Book</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12 col-md-4 mb-3">
                    {<img src={book?.coverUrl ?? emptyCoverUrl} alt="" className='book-cover shadow' />}
                </div>

                <div className="col-12 col-md-8 mb-3">
                    <div className='fs-4 fw-bold mb-3'>{book?.title ?? 'Book'}</div>

                    {/* Category */}
                    <div className='mb-2'>
                        <code className="me-2">Category:</code>
                        <span className="text-secondary">{category?.title ?? 'N/A'}</span>
                    </div>
                    
                    {/* Author */}
                    <div className='mb-2'>
                        <code className="me-2">Author:</code>
                        <span className="text-secondary">{book?.author ?? 'N/A'}</span>
                    </div>

                    {/* Language */}
                    <div className='mb-2'>
                        <code className="me-2">Language:</code>
                        <span className="text-secondary">{book?.language ?? 'N/A'}</span>
                    </div>

                    {/* Publish Date */}
                    <div className='mb-2'>
                        <code className="me-2">Publish Date:</code>
                        <span className="text-secondary">{formateDate(book?.publicationDate) ?? 'N/A'}</span>
                    </div>

                    {/* Rate */}
                    <div className='mb-2'>
                        <code className="me-2">Rate:</code>
                        <span className="text-secondary">{book?.rate ?? 'N/A'}</span>
                    </div>

                    {/* Pages */}
                    <div className='mb-2'>
                        <code className="me-2">Pages:</code>
                        <span className="text-secondary">{book?.numberOfPages ?? 'N/A'}</span>
                    </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div> );
}
 
export default AdminBookModal;