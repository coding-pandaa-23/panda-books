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
}) => {
    return ( <li className="list-group-item">
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <span className="text-truncate w-50">{book.title}</span>
                <span className="w-50 text-end">
                    {/* Delete Book */}
                    <button 
                        className={`${ButtonStyle} border-danger`}
                        onClick={(e)=>{e.preventDefault(); onDelete(book)}}>
                        <i className="fa-solid fa-trash fa-lg mx-1 text-danger"></i>
                    </button>

                    {/* On Show Content */}
                    <button 
                        className={`${ButtonStyle} border-primary`}
                        onClick={(e)=>{e.preventDefault(); onShowBook(book)}}>
                            <i className="fa-solid fa-eye fa-lg text-primary"></i>
                    </button>

                    <span className="mx-4"></span>

                    {/* Update Language */}
                    <button 
                        className={`${ButtonStyle} ${book.language ? 'border-success' : 'border-danger'}`}
                        onClick={(e)=>{e.preventDefault(); onSetLanguage(book)}}>
                            <i className="fa-solid fa-language fa-lg"></i>
                    </button>

                    {/* Update Description */}
                    <button 
                        className={`${ButtonStyle} ${!book.desc || book.desc === '' ? 'border-danger' : 'border-success'}`}
                        onClick={(e)=>{e.preventDefault(); onSetDesc(book)}}>
                            <i className="fa-solid fa-file-lines fa-lg"></i>
                    </button>

                    {/* Update Publish Date */}
                    <button 
                        className={`${ButtonStyle} ${book.publicationDate ? 'border-success' : 'border-danger'}`}
                        onClick={(e)=>{e.preventDefault(); onSetPublishDate(book)}}>
                            <i className="fa-solid fa-calendar-check fa-lg"></i>
                    </button>
                    
                    {/* Update Category */}
                    <button 
                        className={`${ButtonStyle} ${book.category ? 'border-success' : 'border-danger'}`}
                        onClick={(e)=>{e.preventDefault(); onSetCategory(book)}}>
                            <i className="fa-solid fa-layer-group fa-lg"></i>
                    </button>

                    {/* Update Author */}
                    <button 
                        className={`${ButtonStyle} ${book.author ? 'border-success' : 'border-danger'}`}
                        onClick={(e)=>{e.preventDefault(); onSetAuthor(book)}}>
                            <i className="fa-solid fa-at fa-lg"></i>
                    </button>

                    {/* Update PDF */}
                    <button 
                        className={`${ButtonStyle} ${book.url ? 'border-success' : 'border-danger'}`}
                        onClick={(e)=>{e.preventDefault(); onSetPDF(book)}}>
                            <i className="fa-solid fa-file-pdf fa-lg"></i>
                    </button>

                    {/* Update Cover */}
                    <button 
                        className={`${ButtonStyle} ${book.coverUrl ? 'border-success' : 'border-danger'}`}
                        onClick={(e)=>{e.preventDefault(); onSetCover(book)}}>
                            <i className="fa-solid fa-image fa-lg"></i>
                    </button>

                    {/* Update Title */}
                    <button 
                        className={`${ButtonStyle} ${book.title ? 'border-success' : 'border-danger'}`}
                        onClick={(e)=>{e.preventDefault(); onSetTitle(book)}}>
                        <i className="fa-solid fa-i fa-lg mx-1"></i>
                    </button>

                </span>
            </div>
        </div>
</li> );
}
 
export default AdminBookWidget;

const ButtonStyle = 'btn btn-sm border-0 mx-1 mb-md-1 btn-light rounded-bottom-0 border-3 border-bottom text-secondary'