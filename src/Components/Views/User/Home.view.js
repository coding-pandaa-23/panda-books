import { useEffect, useState } from "react";
import UserNav from "./User.nav";
import DB from "../../Database/Database.db";
import { bookStatus, languages } from "../../Utils/static.util";

const HomeView = () => {
    const db = new DB();

    const [isLoading, setLoading] = useState(true);

    const [search, setSearch] = useState('');
    const [language, setLanguage] = useState();
    const [status, setStatus] = useState();

    const [books, setBooks] = useState([]);
    const [progressList, setProgressList] = useState([]);

    useEffect(()=>{
        initialize();
        // eslint-disable-next-line
    }, [])

    async function initialize(){
        db.publicStream((bookList)=>{
            setBooks(bookList);
        });

        db.userStream((mUser, pList)=>{
            setProgressList(pList);
            setLoading(false);
        })
        
    }

    function showBook(book){
        window.location.href = '/books/'+book.id
    }

    /**
     * 
     * @param {String} bid 
     * @returns {import('../../Models/Progress.model').default | null}
     */
    function getProgressById(bid){
        return progressList.find((p)=> p.id === bid);
    }

    function calcProgress(book){
        let finished = parseFloat(getProgressById(book.id)?.index ?? 0) ;
        let nop = parseFloat(book.numberOfPages) ?? 1;

        return parseInt(((finished / nop) * 100))
    }

    /**
     * 
     * @param {import('../../Models/Book.model').default} book 
     */
    function getBookStatus(book){
        let mProgress = getProgressById(book.id);

        if(!mProgress){
            return bookStatus.unread; // Unread
        }else if(mProgress.index < book.numberOfPages){
            return bookStatus.readingNow; // Readind Now
        }else if(mProgress.index === book.numberOfPages){
            return bookStatus.finished; // Finished
        }
    }

    function filterBook(book){
        let equalTitle = book.title.toLowerCase().includes(search.toLowerCase());
        let equalStatus = !status || getBookStatus(book) === bookStatus[status];
        let equalLang = !language || (language === book.language)
        
        return equalTitle && equalStatus && equalLang;
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

    return ( <>
        <UserNav isLoading={isLoading}>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2">
                       
                        <div className="row">

                            {/* Search */}
                            <div className="col-12">
                                <div className="card shadow border-0 mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text border-0 bg-transparent">
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </span>

                                        <input 
                                            type="text" className="form-control shadow-none border-0 px-3 py-2" placeholder="Search"
                                            value={search} onChange={(e)=> setSearch(e.target.value)}/>
                                    </div>
                                </div>
                            </div>

                            {/* Book State */}
                            <div className="col-8 of-x-auto mb-3">
                                <button 
                                        onClick={(e)=> setStatus(null)}
                                        className={`btn btn-outline-secondary btn-sm px-3 mx-1 ${!status && 'active'}`}>
                                            All Books
                                    </button>

                                    {bookStatus.values().map((state, ind)=>
                                    <button 
                                        key={ind} onClick={(e)=>{ setStatus(state);}}
                                        className={`btn btn-outline-secondary btn-sm px-3 mx-1 ${state === status && 'active'}`}>
                                        {bookStatus[state]}
                                </button>)}
                            </div>

                            {/* Language */}
                            <div className="col-4 text-end mb-3">
                                <div className="btn-group">
                                    {languages.map((lang, ind)=> 
                                        <button 
                                            key={ind} onClick={(e)=> selectLanguage(lang)}
                                            className={`btn btn-outline-secondary btn-sm px-3 ${lang === language && 'active'}`}>
                                            {lang}
                                        </button>)}
                                </div>
                            </div>

                            {/* Books List */}
                            <div className="col-12">
                                <div className="card border-0 shadow h-75 of-auto">
                                    <ul className="list-group list-group-flush">
                                    {books
                                    .filter((book)=> filterBook(book))
                                    .map((book, ind)=> ( 
                                        <li key={ind} className="list-group-item list-group-item-action" onClick={(e)=> showBook(book)}>
                                                <div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span className="text-truncate w-75">{book.title}</span>
                                                        <span className="w-25 text-end me-2">

                                                            {/* Unread */}
                                                            {getBookStatus(book) === bookStatus.unread && 
                                                            <button className="btn btn-secondary btn-sm border-0 disabled border-0 mx-1" style={{width: '100px'}}>
                                                                Start Reading
                                                            </button>}

                                                            {/* Reading Now */}
                                                            {getBookStatus(book) === bookStatus.readingNow && 
                                                            <button className="btn btn-sm btn-primary disabled border-0 mx-1" style={{width: '100px'}}>
                                                                {calcProgress(book)} %
                                                            </button>}

                                                            {getBookStatus(book) === bookStatus.finished &&
                                                            <button className="btn btn-sm btn-success border-0 disabled border-0 mx-1" style={{width: '100px'}}>
                                                                Finished
                                                            </button>}
                                                        </span>
                                                    </div>
                                                </div>
                                        </li>))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Row End */} 
                    </div>
                </div>
            </div>
        </UserNav>
    </> );
}
 
export default HomeView;