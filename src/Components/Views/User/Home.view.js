import { useEffect, useState } from "react";
import UserNav from "./User.nav";
import DB from "../../Database/Database.db";

const HomeView = () => {
    const db = new DB();

    const [isLoading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showMyBooks, setShowMyBooks] = useState(false);

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

    function getProgressById(bid){
        return progressList.find((p)=> p.id === bid);
    }

    function calcProgress(book){
        let finished = parseFloat(getProgressById(book.id)?.index ?? 0) ;
        let nop = parseFloat(book.numberOfPages) ?? 1;

        return ((finished / nop) * 100).toFixed(0)
    }

    function toggleMyBooks(){
        setShowMyBooks(!showMyBooks);
    }

    function filterBook(book){
        let isMyBook = true;
        if(showMyBooks){
            isMyBook = progressList.findIndex((p)=> p.id === book.id) >= 0;
        }

        const equalTitle = book.title.toLowerCase().includes(search.toLowerCase())

        return isMyBook && equalTitle;
    }

    return ( <>
        <UserNav isLoading={isLoading}>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2">
                        <div className="card shadow border-0 mb-3">
                            <div className="input-group">

                                <span className="input-group-text border-0 bg-transparent">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </span>

                                <input 
                                    type="text" className="form-control shadow-none border-0 px-3 py-2" placeholder="Search"
                                    value={search} onChange={(e)=> setSearch(e.target.value)}/>

                                <span className="input-group-text border-0 text-bg-primary pointer px-auto" onClick={toggleMyBooks}>
                                    {showMyBooks && <span>All Books</span>}
                                    {!showMyBooks && <span>My Books</span>}
                                </span>
                            </div>
                        </div>

                        {/* Books List */}
                        <div className="card border-0 shadow h-80 of-auto">
                            <ul className="list-group list-group-flush">
                            {books
                            .filter((book)=> filterBook(book))
                            .map((book, ind)=> ( 
                                <li key={ind} className="list-group-item list-group-item-action" onClick={(e)=> showBook(book)}>
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="text-truncate w-75">{book.title}</span>
                                                <span className="w-25 text-end">
                                                    {getProgressById(book.id) && <button className="btn btn-sm btn-primary rounded-pill disabled border-0 mx-1">
                                                        {calcProgress(book)} %
                                                    </button>}

                                                    {!getProgressById(book.id) && <button className="btn btn-sm border-0 disabled border-0 mx-1">
                                                        Start reading
                                                    </button>}
                                                </span>
                                            </div>
                                        </div>
                                </li>))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </UserNav>
    </> );
}
 
export default HomeView;