import { useEffect, useState } from "react";
import UserNav from "./User.nav";
import DB from "../../Database/Database.db";
import { languages } from "../../Utils/static.util";
import AdminBookWidget from "../../Widgets/AdminBook.widget";
import Notifier from "../../Utils/Notifier";
import Book from "../../Models/Book.model";
import StorageUtil from "../../Utils/storage.util";
import { Modal } from "bootstrap";
import AdminBookModal from "../Modals/Book.modal";
import AdminChecker from "../../Widgets/AdminChecker.wid";
import CategoryModal from "../Modals/Category.modal";

const AdminView = () => {
    const categoryModalID = 'AdminViewCategoryModal'

    const db = new DB();
    const notifier = new Notifier();
    const storage = new StorageUtil();

    const [isLoading, setLoading] = useState(true);
    const [activeBook, setActiveBook] = useState();

    const [search, setSearch] = useState('');
    const [language, setLanguage] = useState();
    const [category, setCategory] = useState();
    const [loadingProgress, setLoadinProgress] = useState(1);

    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        initialize();
        // eslint-disable-next-line
    }, [])

    async function initialize(){
        db.publicStream((bookList, categoryList)=>{
            setBooks(bookList);
            setCategories(categoryList);
            setLoading(false);
        });
        
    }

    function getTemp(object){
        return JSON.parse(JSON.stringify(object));
    }

    // Create A New Book
    // ====================================================
    function newBook(){
        notifier.showTextDialog({
            message: 'Add a new book',
            hint: 'Enter Book Title',
            onConfirm: async (val)=>{
                setLoading(true);
                try {
                    if(val === ''){
                        notifier.toast({message: 'Title can not be empty', color: 'success'});
                        return;
                    }

                    let nBook = Book.instance({title: val});
                    await db.Books.insert(nBook)
                } catch (error) {}
                setLoading(false);
            }
        })
    }

    // Update Book Content
    // ====================================================

    /**
     * Set Book Cover
     * @param {Book} book 
     */
    function setBookCover(book){
        notifier.uploadFile({
            extentions: '.png, .jpg, .jpeg',
            onConfirm: async (file)=>{
                let path = `public/covers/${book.id}.png`;
                
                try {
                    let downloadLink = await storage.uploadFile({path: path, file: file, onStateChanged: setLoadinProgress});
                    let nBook = getTemp(book);
                    nBook.coverUrl = downloadLink;
                    await db.Books.update(nBook);
                    notifier.toast({message: 'Book Cover Was Updated', color: 'success'});
                } catch (error) {}
                setLoadinProgress(1);
            }
        })
    }

    /**
     * Set Book PDF
     * @param {Book} book 
     */
    function setBookPDF(book){
        notifier.uploadFile({
            extentions: '.pdf',
            onConfirm: async (file)=>{
                let path = `public/books/${book.id}.pdf`;

                try {
                    let downloadLink = await storage.uploadFile({path: path, file: file, onStateChanged: setLoadinProgress});
                    let nBook = getTemp(book);
                    nBook.url = downloadLink;
                    await db.Books.update(nBook);
                    notifier.toast({message: 'Book PDF File Was Updated', color: 'success'});
                } catch (error) {}
                setLoadinProgress(1);
            }
        })
    }

    /**
     * Set Book Title
     * @param {Book} book 
     */
    function setBookTitle(book){
        notifier.showTextDialog({
            message: 'Book Title',
            hint: 'Book title',
            value: book.title,
            onConfirm: async (value)=>{
                setLoading(true);
                try {
                    if(value === ''){
                        notifier.toast({message: 'Title can not be empty', color: 'danger'});
                    }else{
                        let nBook = getTemp(book);
                        nBook.title = value;
                        await db.Books.update(nBook);
                        notifier.toast({message: 'Book Title Was Updated', color: 'success'});
                    }

                } catch (error) {}
                setLoading(false);
            }
        })
    }

    /**
     * Set Book Author
     * @param {Book} book 
     */
    function setBookAuthor(book){
        notifier.showTextDialog({
            message: 'Book Author',
            hint: 'Book Author',
            value: book.author,
            onConfirm: async (value)=>{
                setLoading(true);
                try {
                    let nBook = getTemp(book);
                    nBook.author = value;
                    await db.Books.update(nBook);
                    notifier.toast({message: 'Book Author Was Updated', color: 'success'});
                } catch (error) {}
                setLoading(false);
            }
        })
    }

    /**
     * Set Book Category
     * @param {Book} book 
     */
    function setBookCategory(book){
        notifier.showOptionsDialog({
            title: 'Choose Category',
            id: book.category,
            list: categories.map((cat)=>({id: cat.id, value: cat.title})),
            onConfirm: async (id)=>{
                setLoading(true);
                try {
                    let nBook = getTemp(book);
                    nBook.category = id;
                    await db.Books.update(nBook);
                    notifier.toast({message: 'Book Category Was Updated', color: 'success'});
                } catch (error) {}
                setLoading(false);
            }
        })
    }

    /**
     * Set Book Publish Date
     * @param {Book} book 
     */
    async function setBookPublishDate(book){
        notifier.showTextDialog({
            message: 'Book Publish Date',
            hint: 'e.g. 05/13/1992',
            value: book.publicationDate,
            type: 'date',
            onConfirm: async (value)=>{
                setLoading(true);
                try {
                    let nBook = getTemp(book);
                    nBook.publicationDate = value;
                    await db.Books.update(nBook);
                    notifier.toast({message: 'Book Publish Date Was Updated', color: 'success'});
                } catch (error) {}
                setLoading(false);
            }
        })
    }
    

    /**
     * Set Book Description
     * @param {Book} book 
     */
    function setBookDescription(book){
        notifier.showTextareaDialog({
            message: 'Book Description',
            hint: 'Enter Description',
            value: book.desc,
            onConfirm: async (value)=>{
                setLoading(true);
                try {
                    let nBook = getTemp(book);
                    nBook.desc = value;
                    await db.Books.update(nBook);
                    notifier.toast({message: 'Book Description Was Updated', color: 'success'});
                } catch (error) {}
                setLoading(false);
            }
        })
    }

    /**
     * Set Book Language
     * @param {Book} book 
     */
    function setBookLanguage(book){
        notifier.showOptionsDialog({
            id: book.language,
            title: 'Choose Language',
            list: languages.map((lang)=> ({id: lang, value: lang})),
            onConfirm: async (value)=>{
                try {
                    setLoading(true);
                    let nBook = getTemp(book);
                    nBook.language = value;
                    await db.Books.update(nBook);
                    notifier.toast({message: 'Book Language Was Updated', color: 'success'});
                } catch (error) {}
                setLoading(false);
            }
        })
    }

    /**
     * Set Book Language
     * @param {Book} book 
     */
    function setNumberOfPages(book){
        notifier.showTextDialog({
            message: 'Number Of Pages',
            hint: 'number of pages',
            value: book.numberOfPages,
            type: 'number',
            onConfirm: async (value)=>{
                setLoading(true);

                try {
                    // eslint-disable-next-line
                    let number = new Number(value);
                    let isNaN = number.toFixed(0) === NaN.toFixed(0)
                    if(isNaN){
                        notifier.toast({message: 'not a valid number', color: 'danger'})
                    } else if(number <= 0){
                        notifier.toast({message: 'not a valid number', color: 'danger'})
                    }
                    else{
                        let nBook = getTemp(book);
                        nBook.numberOfPages = value;
                        await db.Books.update(nBook);
                        notifier.toast({message: 'Number Of Pages Was Updated', color: 'success'});
                    }
                } catch (error) {}
                setLoading(false);
            }
        })
    }

    /**
     * Set Book Description
     * @param {Book} book 
     */
    function deleteBook(book){
        notifier.showConfirmDialog({
            title: 'Delete!',
            message: `Are you sure you want to delete <b>${book.title}</b>`,
            confirmColor: 'danger',
            confirmText: 'delete',
            onConfirm: async ()=>{
                try {
                    setLoading(true);
                    await db.Books.delete(book);
                    notifier.toast({message: 'Book Was Deleted', color: 'danger'});
                } catch (error) {}
                setLoading(false);
            }
        });
    }

    // Show Book Content
    async function showBook(book){

        let modal = Modal.getInstance('#adminBookModal');
        if(!modal){
            modal = new Modal('#adminBookModal');
        }

        setActiveBook(book)
        modal.show()
    }


    // Category Functions
    // ====================================================
    function showCategoryModal(){
        let modal = Modal.getInstance(`#${categoryModalID}`);
        if(!modal){modal = new Modal(`#${categoryModalID}`);}
        modal.show();
    }

    function setActiveCategory(mCategory){
        setCategory(mCategory);
    }

    function addCategory(){
        notifier.showTextDialog({
            message: 'Add a new category',
            hint: 'Enter Category',
            confirmText: 'add',
            onConfirm: async (value)=>{
                setLoading(true);
                try {
                    if(value === ''){
                        notifier.toast({message: 'Category can not be empty', color: 'danger'});
                    }else{
                        await db.Categories.insert({title: value});
                        notifier.toast({message: 'Category was added', color: 'success'});

                    }
                } catch (error) {
                    console.log(error);
                }
                setLoading(false);
            }
        })
    }

    function updateCategory(mCategory){
        notifier.showTextDialog({
            message: 'Update Category',
            value: mCategory.title,
            hint: 'Category',
            onConfirm: async (value)=>{
                setLoading(true);
                try {
                    if(value === ''){
                        notifier.toast({message: 'Category can not be empty', color: 'danger'});
                    }else{
                        mCategory.title = value
                        await db.Categories.update(mCategory);
                        notifier.toast({message: 'Category was Updated', color: 'success'});
                    }
                } catch (error) {console.log(error);}
                setLoading(false);
            }
        })
    }

    function deleteCategory(mCategory){
        notifier.showConfirmDialog({
            title: 'Delete',
            message: 'Do you want to delete <b>${mCategory.title}</b>?',
            onConfirm: async ()=>{
                setLoading(true);
                try {
                    await db.Categories.delete(mCategory);
                    notifier.toast({message: 'Category was Deleted', color: 'danger'});
                } catch (error) {}
                setLoading(false);
            }
        })
    }


    // Select Language
    // ====================================================
    function selectLanguage(lang){
        if(!language || lang !== language ){
            setLanguage(lang);
        }else{
            setLanguage(null)
        }
    }

    // Filters
    // ====================================================
    function filterBook(book){
        let equalTitle = book.title.toLowerCase().includes(search.toLowerCase());
        // let equalStatus = !status || getBookStatus(book) === bookStatus[status];
        let equalLang = !language || (language === book.language)
        let equalCategory = !category || book.category === category?.id;
        
        return equalTitle && equalLang && equalCategory;
    }

    return ( <>
        <UserNav view='admin' isLoading={isLoading} >
            <AdminChecker withAlertVew={true}>

                <div className="container">
                    <div className="row">
                        <div className="col-12 ">
                            <div className="card shadow border-0 mb-3">
                                <div className="input-group">

                                    <span className="input-group-text border-0 bg-transparent">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>

                                    {/* Search */}
                                    <input 
                                        type="text" className="form-control shadow-none border-0 px-3 py-2" placeholder="Search"
                                        value={search} onChange={(e)=> setSearch(e.target.value)}/>

                                    {/* New Book Button */}
                                    <span className="input-group-text border-0 text-bg-primary pointer" onClick={newBook}>
                                        <i className="fa-solid fa-plus"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="mb-3 d-flex justify-content-between">
                                <div >
                                    {/* Category */}
                                    <button 
                                        onClick={showCategoryModal}
                                        className="btn border-0 border-bottom border-secondary rounded-0 text-start text-truncate text-secondary" style={{width: '200px'}}>
                                        {category?.title ?? 'Category'}
                                    </button>
                                </div>
                                
                                <div>
                                    <div className="btn-group">
                                            {languages.map((lang, ind)=> 
                                                <button 
                                                    className={`btn btn-outline-secondary btn-sm px-3 ${lang === language && 'active'}`} 
                                                    key={ind} onClick={(e)=> selectLanguage(lang)}>
                                                    {lang}
                                                </button>)}
                                    </div>
                                </div>
                            </div>

                            {/* Books List */}
                            <div className="card border-0 shadow of-none">
                                
                                <div className="h-70 of-auto">
                                    <ul className="list-group list-group-flush">
                                    {books
                                    .filter((book)=> filterBook(book))
                                    .map((book, ind)=> (
                                        <AdminBookWidget 
                                            key={ind}
                                            book={book}
                                            onShowBook={showBook}
                                            onSetNumberOfPages={setNumberOfPages}
                                            onSetTitle={setBookTitle}
                                            onSetCover={setBookCover}
                                            onSetPDF={setBookPDF}
                                            onSetAuthor={setBookAuthor}
                                            onSetCategory={setBookCategory}
                                            onSetDesc={setBookDescription}
                                            onSetPublishDate={setBookPublishDate}
                                            onSetLanguage={setBookLanguage}
                                            onDelete={deleteBook}/>))}
                                    </ul>
                                </div>

                                <div className="w-100 m-0">
                                    <div 
                                        className="progress rounded-0" role="progressbar" aria-label="" style={{height: '10px'}} 
                                        aria-valuemin="0" aria-valuemax="100">
                                            <div className={`progress-bar ${loadingProgress < 1 ? 'bg-primary' : 'bg-secondary'} `} style={{width: `${(loadingProgress ?? 0)*100}%`, height: '10px'}}></div>
                                    </div>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <CategoryModal
                    id={categoryModalID}
                    category={category}
                    categories={categories}
                    onAddCategory={addCategory}
                    onSelectCategory={setActiveCategory}
                    onUpdateCategory={updateCategory}
                    onDeleteCategory={deleteCategory}/>

                <AdminBookModal book={activeBook}/>

            </AdminChecker>    
        </UserNav>
    </> );
}
 
export default AdminView;