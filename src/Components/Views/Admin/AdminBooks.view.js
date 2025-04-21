import { useState } from "react";
import Notifier from "../../Utils/Notifier";
import Database from "../../Utils/Database.firebase";
import { languages } from "../../Utils/static.util";

const AdminBooksView = ({books = [], categories = []}) => {

    const db = new Database();
    const notifier = new Notifier();

    const [activeBook, setActiveBook] = useState();
    const [search, setSearch] = useState('')

    function getTemp(obj){
        if(obj){
            return JSON.parse(JSON.stringify(obj));
        }else{
            return {};
        }
    }

    // On Book Input changes
    function setBookInputValue(e){
        let name = e.target.name;
        let value = e.target.value;

        let temp = getTemp(activeBook);
        temp[name] = value;

        setActiveBook(temp);
    }

    /**
     * Get The Selected PDF File
     * @returns {File | null}
     */
    function getFile(){
        let file = document.getElementById('pdf-file').files[0];
        return file;
    }

    // Select Category
    function selectBook(book){
        if(!activeBook || activeBook?.id !== book?.id){
            setActiveBook(book);
        }else{
            setActiveBook(null);
        }
    }

    // New Book
    function saveBook(){
        let nBook = {
            id: activeBook?.id,
            title: activeBook?.title,
            language: activeBook?.language,
            category:  activeBook?.category,
            url: activeBook?.url,
            coverUrl: activeBook?.coverUrl,
            index:  activeBook?.index ?? 1,
            numberOfPages:  activeBook?.numberOfPages ?? 1
        }

        !nBook.id ? insertBook(nBook) : updateBook(nBook);
    }

    function insertBook(book){
        notifier.showConfirmDialog({
            title: 'New Book',
            message: 'Do you want to add a new Book?',
            confirmColor: 'primary',
            onConfirm: async ()=>{
                notifier.setLoading(true);
                try {
                    // Upload Book To Storage
                    let file = getFile();

                    // Insert Book
                    await db.Books.insert(book, file);

                    notifier.toast({color: 'success', message: 'A new Book was added!'});
                    setActiveBook(null);
                    
                } catch (error) {
                    let err = JSON.parse(error);
                    if(err.type == 'internal-error' ){
                        notifier.toast({message: err.message, color: 'danger'});
                    }else{
                        notifier.toast({color: 'danger', message: 'Something went wrong'});
                    }
                }
                notifier.setLoading(false);
                
            }
        })
    }

    function updateBook(book){
        notifier.showConfirmDialog({
            title: 'Update Book',
            message: 'Do you want to update Book?',
            confirmColor: 'primary',
            onConfirm: async ()=>{
                notifier.setLoading(true);
                try {
                    let file = getFile();

                    await db.Books.update(book, file);

                    notifier.toast({color: 'success', message: 'Book was updated!'});
                } catch (error) {
                    let err = JSON.parse(error);
                    if(err.type == 'internal-error' ){
                        notifier.toast({message: err.message, color: 'danger'});
                    }else{
                        notifier.toast({color: 'danger', message: 'Something went wrong'});
                    }
                }
                notifier.setLoading(false);
            }
        })
    }

    // Delete Book
    function deleteBook(){
        notifier.showConfirmDialog({
            title: 'Delete',
            message: `Do you want to delete <b>${activeBook.title}</b>&nbsp;?`,
            confirmText: 'delete',
            confirmColor: 'danger',
            onConfirm: async ()=>{
                notifier.setLoading(true);
                try {
                    await db.Books.delete(activeBook);
                    setActiveBook(null);
                    notifier.toast({message: 'Book was deleted', color:'danger'})
                } catch (error) {
                    notifier.toast({color: 'danger', message: 'Somthing went wrong'});
                }
                notifier.setLoading(false);
            }
        })
    }

    return ( <>
        <div className="row">
            <div className="col-12 mb-3">
                <div className="card border-0 shadow p-1">
                    <div className="row">

                        {/* Search Bar */}
                        <div className="col-6">
                            <div className="input-group">
                                <span className="input-group-text border-0 bg-white"><i className="fa-solid fa-magnifying-glass"></i></span>
                                <input 
                                    value={search} onChange={(e)=> setSearch(e.target.value)}
                                    type="search" className="form-control border-0 shadow-none" placeholder="Find Book"/>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="col-6 d-flex align-items-center justify-content-end">
                            {activeBook && <button className="btn btn-secondary mx-1 btn-sm" onClick={()=> setActiveBook(null)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>}

                            {activeBook && <button className="btn btn-danger mx-1 btn-sm" onClick={deleteBook}>
                                <i className="fa-solid fa-trash"></i>
                            </button>}

                            <button className="btn btn-success mx-1 btn-sm" type="submit" form="book-form" >
                                <i className="fa-solid fa-check"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-4 col-lg-4">
                {/* Books List */}
                <div className="card border-0 shadow h-80 mb-3">
                    <ul className="list-group list-group-flush rounded-0">
                        {books
                        .filter((book)=> book.title.toLowerCase().includes(search.toLowerCase()) 
)
                        .map((book, ind)=>(
                            <li  key={ind} onClick={(e)=> selectBook(book)}
                                className={`${bookCSS} ${activeBook?.id === book.id && 'active'}`}>
                                    <span>
                                        <i className="fa-solid fa-book me-3 text-secondary"></i>
                                        <span>{book.title}</span>
                                    </span>
                            </li>))}
                    </ul>
                </div>
            </div>

            {/* Active / New Book */}
            <div className="col-12 col-md-8">
                <div className="card border-0 shadow h-80 of-auto mb-3 p-2">
                    <form id="book-form" className="row m-0" onSubmit={(e)=>{e.preventDefault();saveBook();}}>
                        <div className="col-12 col-md-3">
                            {/* Cover Image */}
                            <img 
                                className="book-cover shadow" alt={activeBook?.title ?? 'Book Title'}
                                src={activeBook?.coverUrl ?? 'https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?fm=jpg'} />
                        </div>
                        <div className="col-12 col-md-9">

                            {/* Title */}
                            <div className="mb-3">
                                <input 
                                    name='title' value={activeBook?.title ?? ''} onChange={setBookInputValue}
                                    type="text" className="form-control custom" placeholder="Title" required/>
                            </div>

                            {/* Cover Path */}
                            <div className="mb-3">
                                <input 
                                    name='coverUrl' value={activeBook?.coverUrl ?? ''} onChange={setBookInputValue}
                                    type="text" className="form-control custom" placeholder="Cover URL" required/>
                                    
                            </div>

                            {/* Book Path */}
                            <div className="mb-3 input-group">
                                <input 
                                    name='url' id="pdf-file"
                                    type="file" className="form-control custom" placeholder="Book URL"/>
                                    
                                <span className="input-group-text border-0 rounded-0 bg-transparent">
                                    {activeBook?.url && <i className='fa-solid fa-circle-check fa-lg text-success'></i>}
                                    {!activeBook?.url && <i className='fa-solid fa-circle-xmark fa-lg text-danger'></i>}
                                </span>
                            </div>

                            {/* Category */}
                            <div className="mb-3">
                                <select 
                                    name="category" value={activeBook?.category ?? ''} onChange={setBookInputValue}
                                    className="form-control custom" required>
                                        <option value="">Category</option>
                                        {categories.map((category, ind)=>(
                                            <option key={ind} value={category.id}>{category.title}</option>
                                        ))}
                                </select>
                            </div>

                            {/* Category */}
                            <div className="mb-3">
                                <select 
                                    name="language" value={activeBook?.language ?? ''} onChange={setBookInputValue}
                                    className="form-control custom" required>
                                        <option value="">Language</option>
                                        {languages.map((language, ind)=>(
                                            <option key={ind} value={language}>{language}</option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </form> 
                </div>
            </div>
        </div>
    </> );
}
 
export default AdminBooksView;

const bookCSS = "list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3";