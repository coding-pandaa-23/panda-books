import { Modal } from 'bootstrap';
// eslint-disable-next-line
import Book from '../Models/Book.model';

/**
 * @callback AdminBookCallback
 * @param {Book} book
 */


/**
 * @param {Object} obj 
 * @param {Book} obj.book
 * @param {AdminBookCallback} obj.onShowBook
 * @param {AdminBookCallback} obj.onDelete
 * @param {AdminBookCallback} obj.onSetLanguage
 * @param {AdminBookCallback} obj.onSetDesc
 * @param {AdminBookCallback} obj.onSetPublishDate
 * @param {AdminBookCallback} obj.onSetCategory
 * @param {AdminBookCallback} obj.onSetAuthor
 * @param {AdminBookCallback} obj.onSetPDF
 * @param {AdminBookCallback} obj.onSetCover
 * @param {AdminBookCallback} obj.onSetTitle
 * @param {AdminBookCallback} obj.onSetNumberOfPages
 * @returns 
 */

const AdminBookWidget = ({
    book,
    onDelete,
    onShowBook,
    onSetLanguage,
    onSetDesc,
    onSetPublishDate,
    onSetCategory,
    onSetAuthor,
    onSetPDF,
    onSetCover,
    onSetTitle,
    onSetNumberOfPages,
}) => {

    function showOptionsModal(){
        let modal = Modal.getInstance(`#${book?.id}`);
        if(!modal){
            modal = new Modal(`#${book?.id}`)
        }

        modal.show()
    }

    return (<>
    <li className="list-group-item list-group-item-action" onClick={(e)=>showOptionsModal(book)}>
        <span className="text-truncate w-50">{book.title}</span>
    </li>
    
    <div className="modal" id={book.id}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{book?.title ?? 'Book Title'}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body">
                    <ul className="list-group list-group-flush">

                        {/* Update Title */}
                        <li className={`${listItemStyle}`}
                            onClick={(e)=>{onSetTitle(book)}}  data-bs-dismiss="modal">
                                <span className='text-secondary'>
                                    <i className="fa-solid fa-i fa-lg admin-book-widget-icon"></i>                           
                                    Title
                                </span>

                                <span>
                                    {book?.title && <i className="fa-solid fa-circle-check text-success"></i>}
                                    {!book?.title && <i className="fa-solid fa-circle-xmark"></i>}
                                </span>
                        </li>

                        {/* Update Category */}
                        <li className={`${listItemStyle}`}
                            onClick={(e)=>{onSetCategory(book)}}  data-bs-dismiss="modal">
                                <span className='text-secondary'>
                                    <i className="fa-solid fa-layer-group fa-lg admin-book-widget-icon"></i>                           
                                    Category
                                </span>

                                <span>
                                    {(book.category) && <i className="fa-solid fa-circle-check text-success"></i>}
                                    {(!book.category) && <i className="fa-solid fa-circle-xmark text-danger"></i>}
                                </span>
                        </li>

                        {/* Update Number OF Pages */}
                        <li className={`${listItemStyle}`}
                            onClick={(e)=>{onSetNumberOfPages(book)}}  data-bs-dismiss="modal">
                                <span className='text-secondary'>
                                    <i className="fa-solid fa-list-ol fa-lg admin-book-widget-icon"></i>                           
                                    Number OF Pages
                                </span>

                                <span>
                                    {book?.numberOfPages && <i className="fa-solid fa-circle-check text-success"></i>}
                                    {!book?.numberOfPages && <i className="fa-solid fa-circle-xmark"></i>}
                                </span>
                        </li>

                        {/* Update Language */}
                        <li className={`${listItemSepStyle}`}
                            onClick={(e)=>{onSetLanguage(book)}}  data-bs-dismiss="modal">
                                <span className='text-secondary'>
                                    <i className="fa-solid fa-language fa-lg admin-book-widget-icon"></i>                           
                                    Language
                                </span>

                                <span>
                                    {book?.language && <i className="fa-solid fa-circle-check text-success"></i>}
                                    {!book?.language && <i className="fa-solid fa-circle-xmark"></i>}
                                </span>
                        </li>
                        {/* =========================================================== */}

                        {/* Update PDF */}
                        <li className={`${listItemStyle}`} 
                            onClick={(e)=>{onSetPDF(book)}}  data-bs-dismiss="modal">
                                <span className='text-secondary'>
                                    <i className="fa-solid fa-file-pdf fa-lg admin-book-widget-icon"></i>                           
                                    PDF File
                                </span>

                                <span>
                                    {book?.url && <i className="fa-solid fa-circle-check text-success"></i>}
                                    {!book?.url && <i className="fa-solid fa-circle-xmark"></i>}
                                </span>
                        </li>

                        {/* Update Cover */}
                        <li className={`${listItemSepStyle}`} 
                            onClick={(e)=>{onSetCover(book)}}  data-bs-dismiss="modal">
                                <span className='text-secondary'>
                                    <i className="fa-solid fa-image fa-lg admin-book-widget-icon"></i>                           
                                    Cover File
                                </span>

                                <span>
                                    {book?.coverUrl && <i className="fa-solid fa-circle-check text-success"></i>}
                                    {!book?.coverUrl && <i className="fa-solid fa-circle-xmark"></i>}
                                </span>
                        </li>
                        {/* =========================================================== */}

                        {/* Update Author */}
                        <li className={`${listItemStyle}`}
                            onClick={(e)=>{onSetAuthor(book)}}  data-bs-dismiss="modal">
                                <span className='text-secondary'>
                                    <i className="fa-solid fa-at fa-lg admin-book-widget-icon"></i>                           
                                    Author
                                </span>

                                <span>
                                    {(book.author) && <i className="fa-solid fa-circle-check text-success"></i>}
                                    {(!book.author) && <i className="fa-solid fa-circle-xmark text-danger"></i>}
                                </span>
                        </li>

                        {/* Update Publish Date */}
                        <li className={`${listItemStyle}`}
                            onClick={(e)=>{onSetPublishDate(book)}}  data-bs-dismiss="modal">
                                <span className='text-secondary'>
                                    <i className="fa-solid fa-calendar-check fa-lg admin-book-widget-icon"></i>                           
                                    Publish Date
                                </span>

                                <span>
                                    {(book.publicationDate) && <i className="fa-solid fa-circle-check text-success"></i>}
                                    {(!book.publicationDate) && <i className="fa-solid fa-circle-xmark text-danger"></i>}
                                </span>
                        </li>

                        {/* Update Description */}
                        <li className={`${listItemSepStyle}`}
                            onClick={(e)=>{onSetDesc(book)}}  data-bs-dismiss="modal">
                                <span className='text-secondary'>
                                    <i className="fa-solid fa-file-lines fa-lg admin-book-widget-icon"></i>                           
                                    Description
                                </span>

                                <span>
                                    {(book.desc && book.desc  !== '') && <i className="fa-solid fa-circle-check text-success"></i>}
                                    {(!book.desc || book.desc === '') && <i className="fa-solid fa-circle-xmark text-danger"></i>}
                                </span>
                        </li>
                       
                        <li className="list-group-item mt-4 p-0 d-flex">
                                {/* Show Book Information */}
                                <div className="w-50 px-1">
                                    <button className="btn btn-primary w-100" data-bs-dismiss="modal" onClick={(e)=>{onShowBook(book)}}>
                                        <i className="fa-solid fa-eye fa-lg me-2"></i>                           
                                        Show Book
                                    </button>
                                </div>

                                {/* Delete Book */}
                                <div className="w-50 px-1">
                                    <button className="btn btn-danger w-100" data-bs-dismiss="modal" onClick={(e)=>{onDelete(book)}}>
                                        <i className="fa-solid fa-trash fa-lg me-2"></i>                           
                                        Delete Book
                                    </button>
                                </div>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    </>);
}
 
export default AdminBookWidget;

const listItemStyle = 'list-group-item list-group-item-action d-flex justify-content-between';
const listItemSepStyle = 'list-group-item list-group-item-action d-flex justify-content-between border-warning mb-3 border-0 border-bottom border-2';