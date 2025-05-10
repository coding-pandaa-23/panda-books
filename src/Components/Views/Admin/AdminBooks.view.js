import { useState } from "react";
import Notifier from "../../Utils/Notifier";
import { languages } from "../../Utils/static.util";
import ProgressBar from "../../Widgets/ProgressBar.wid";
import Book from "../../Models/Book.model";
import DB from "../../Database/Database.db";

const AdminBooksView = ({books = [], categories = []}) => {

    const db = new DB();
    const notifier = new Notifier();

    const [activeBook, setActiveBook] = useState();
    const [search, setSearch] = useState('');
    
    const [coverFile, setCoverFile] = useState();
    const [pdfFile, setPdfFile] = useState();

    const [uploadProgress, setUploadProgress ] = useState();

    function getTemp(obj){
        if(obj){
            return JSON.parse(JSON.stringify(obj));
        }else{
            return {};
        }
    }
    
    // Set PDF File
    function uploadPDF(){
        notifier.uploadFile({
            extentions: '.pdf',
            onConfirm: (nFile)=>{
                setPdfFile(nFile);
            }
        })
    }

    // Set PDF File
    function uploadCover(){
        notifier.uploadFile({
            onConfirm: (nFile)=>{
                setCoverFile(nFile);
            }
        })
    }

    // On Book Input changes
    function setBookInputValue(e){
        let name = e.target.name;
        let value = e.target.value;

        let temp = getTemp(activeBook);
        temp[name] = value;

        setActiveBook(temp);
    }

    // Select Category
    function selectBook(book){
        if(!activeBook || activeBook?.id !== book?.id){
            setActiveBook(book);
        }else{
            clearData();
        }
    }

    // Save Book Changes
    function saveBook(){
        let nBook = Book.instance(activeBook);       

        !nBook.id ? insertBook(nBook) : updateBook(nBook);
    }

    // Insert A New Book
    function insertBook(book){
        notifier.showConfirmDialog({
            title: 'New Book',
            message: 'Do you want to add a new Book?',
            confirmColor: 'primary',
            onConfirm: async ()=>{
                try {                    
                    // Insert Book
                    await db.Books.insert({
                        book: book,
                        pdf: pdfFile,
                        cover: coverFile,
                        onProgressChanged: (progress)=>{
                            setUploadProgress(progress)
                        }
                    });

                    setUploadProgress(null)

                    notifier.toast({color: 'success', message: 'A new Book was added!'});
                    setActiveBook(null);
                    
                } catch (error) {
                    let err = JSON.parse(error);
                    if(err.type === 'internal-error' ){
                        notifier.toast({message: err.message, color: 'danger'});
                    }else{
                        notifier.toast({color: 'danger', message: 'Something went wrong'});
                    }
                }
                clearData();
            }
        })
    }

    // Update An Existing Book
    function updateBook(book){
        notifier.showConfirmDialog({
            title: 'Update Book',
            message: 'Do you want to update Book?',
            confirmColor: 'primary',
            onConfirm: async ()=>{
                try {                    
                    // Update Book
                    await db.Books.update({
                        book: book,
                        pdf: pdfFile,
                        cover: coverFile,
                        onProgressChanged: (progress)=>{
                            setUploadProgress(progress)
                        }
                    });

                    setUploadProgress(null)

                    notifier.toast({color: 'success', message: 'Book was updated!'});
                    setActiveBook(null);
                    
                } catch (error) {
                    let err = JSON.parse(error);
                    if(err.type === 'internal-error' ){
                        notifier.toast({message: err.message, color: 'danger'});
                    }else{
                        notifier.toast({color: 'danger', message: 'Something went wrong'});
                    }
                }
                clearData();
            }
        })
    }

    // Delete A Book
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
                clearData();
            }
        })
    }

    // Clear All Data
    function clearData(){
        setActiveBook(null);
        setCoverFile(null);
        setPdfFile(null)
    }

    return ( <>
        <div className="row">
            
            <div className="col-12 mb-3">
                {/* Action Bar */}
                {!uploadProgress ? <div className="card border-0 shadow p-1">
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

                        {/* Action Buttons */}
                        <div className="col-6 d-flex align-items-center justify-content-end">
                            {/* Clear Data bautton */}
                            {activeBook && <button className="btn btn-secondary mx-1 btn-sm" onClick={()=> clearData()}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>}

                            {/* Delete Book Button */}
                            {activeBook && <button className="btn btn-danger mx-1 btn-sm" onClick={deleteBook}>
                                <i className="fa-solid fa-trash"></i>
                            </button>}

                            {/* Submit Form Button */}
                            <button className="btn btn-success mx-1 btn-sm" type="submit" form="book-form" >
                                <i className="fa-solid fa-check"></i>
                            </button>
                        </div>
                    </div>
                </div>
                :<div className="card border-0 rounded-0 fixed-top p-3 shadow">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <div className="w-100"><ProgressBar progress={uploadProgress}/></div>
                    </div>
                </div>}
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
                        
                        
                        <div className="col-12 col-md-8">

                            {/* Title Input */}
                            <div className="mb-4">
                                <input 
                                    name='title' value={activeBook?.title ?? ''} onChange={setBookInputValue}
                                    type="text" className="form-control custom" placeholder="Title" required/>
                            </div>

                            {/* Author Input */}
                            <div className="mb-4">
                                <input 
                                    name='author' value={activeBook?.author ?? ''} onChange={setBookInputValue}
                                    type="text" className="form-control custom" placeholder="Author" required/>
                                    
                            </div>

                            {/* Year Input */}
                            <div className="mb-4">
                                <input 
                                    name='publicationDate' value={activeBook?.publicationDate ?? ''} onChange={setBookInputValue}
                                    type="text" className="form-control custom" placeholder="Publication Date" required/>
                                    
                            </div>

                            {/* Rate Input*/}
                            <div className="mb-4">
                                <input 
                                    name='rate' value={activeBook?.rate ?? ''} onChange={setBookInputValue}
                                    type="text" className="form-control custom" placeholder="rate"/>
                            </div>

                            {/* Category Input */}
                            <div className="mb-4">
                                <select 
                                    name="category" value={activeBook?.category ?? ''} onChange={setBookInputValue}
                                    className="form-control custom" required>
                                        <option value="">Category</option>
                                        {categories.map((category, ind)=>(
                                            <option key={ind} value={category.id}>{category.title}</option>
                                        ))}
                                </select>
                            </div>

                            {/* Language */}
                            <div className="mb-4">
                                <select 
                                    name="language" value={activeBook?.language ?? ''} onChange={setBookInputValue}
                                    className="form-control custom" required>
                                        <option value="">Language</option>
                                        {languages.map((language, ind)=>(
                                            <option key={ind} value={language}>{language}</option>
                                        ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <textarea 
                                    name="desc" value={activeBook?.desc ?? ''} onChange={setBookInputValue}
                                     className="form-control custom shadow-sm h-20" placeholder="Description"></textarea>
                            </div>
                        </div>

                        
                        {/* Cover Image and File Buttons */}
                        <div className="col-12 col-md-3 mb-3 offset-md-1">
                            {/* Cover Image */}
                            <img 
                                className="book-cover shadow mb-3" alt={activeBook?.title ?? 'Book Title'}
                                src={activeBook?.coverUrl ?? 'https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?fm=jpg'} />

                            {/* Add Book Button */}
                            {coverFile ?
                            <button type="button" className="btn btn-light w-100 mb-3" onClick={()=>{setCoverFile(null)}}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Cancel</span>
                                    <i className="fa-solid fa-square-xmark fa-lg text-danger"></i>
                                </div>
                            </button>
                            : 
                            activeBook?.coverUrl ?
                            <button type="button" className="btn btn-light w-100 mb-3" onClick={uploadCover}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Update Cover</span>
                                    <i className="fa-solid fa-square-check text-success fa-lg"></i>
                                </div>
                            </button>
                            :
                            <button type="button" className="btn btn-light w-100 mb-3" onClick={uploadCover}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Add Cover</span>
                                    <i className="fa-solid fa-square-plus text-secondary fa-lg"></i>
                                </div>
                            </button>}

                            {/* Add Book Button */}
                            {pdfFile ?
                            <button type="button" className="btn btn-light w-100 mb-3" onClick={()=>setPdfFile(null)}>
                                <div className="d-flex justify-content-between align-items-center" >
                                    <span>Cancel</span>
                                    <i className="fa-solid fa-square-xmark fa-lg text-danger"></i>
                                </div>
                            </button>
                            : 
                            activeBook?.url ?
                            <button type="button" className="btn btn-light w-100 mb-3" onClick={uploadPDF}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Update Book</span>
                                    <i className="fa-solid fa-square-check text-success fa-lg"></i>
                                </div>
                            </button>
                            :
                            <button type="button" className="btn btn-light w-100 mb-3" onClick={uploadPDF}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Add Book</span>
                                    <i className="fa-solid fa-square-plus text-secondary fa-lg"></i>
                                </div>
                            </button>}

                            {/* Rate Input*/}
                            <div className="mb-4">
                                <input 
                                    name='numberOfPages' value={activeBook?.numberOfPages ?? '1'} onChange={setBookInputValue}
                                    type="number" step={0} min={1} className="form-control custom" placeholder="Number Of Pages"/>
                            </div>


                        </div>
                    </form> 
                </div>
            </div>
        </div>
    </> );
}
 
export default AdminBooksView;

const bookCSS = "list-group-item list-group-item-action d-flex justify-content-between align-items-center ";