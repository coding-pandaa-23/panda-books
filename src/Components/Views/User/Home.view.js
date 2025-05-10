import { useEffect, useState } from "react";
import BookWidget from "../../Widgets/Book.wid";
import LoadingPage from "../../Widgets/Loading.page";
import UserNav from "../Public/User.nav";
import DB from "../../Database/Database.db";


const HomeView = () => {

    let db = new DB();

    let [books, setBooks] = useState([]); 
    let [categories, setCategories] = useState([]); 
    let [progressList, setProgressList] = useState([]);

    let [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        db.publicStream((bookList, categoryList)=>{
            setBooks(bookList);
            setCategories(categoryList);
            setLoading(false)
        });

        db.userStream((mUser, progList)=>{
            setProgressList(progList)
        })

        // eslint-disable-next-line
    },[])

    // 
    function continueReadingFilter(book, ind){
        return ind < 6 && progressList.find((p)=> p.id === book.id)?.index > 1
    }

    // 
    function recentlyAddedFilter(book, ind){
        return ind < 6;
    }
    
    function continueReadingList(){
        let list = progressList.filter((p)=> p.index > 1);
        return list;
    }

    return ( <>
        {/* Top Nav */}
        <UserNav 
            view="home">

            {/* View */}
            <LoadingPage isLoading={isLoading} >
                
                <div className="container-fluid">
                    <div className="row m-0">  
                        
                        <div className="col-12 my-4">
                            <div className="card border-0 rounded-0">
                                <div className="card-body">

                                    <div className="text-center mb-2 ff-gill fw-bold fs-3">
                                        EXPLORE THE VAST WORLD OF BOOKS
                                    </div>

                                    <p className="text-center mb-4 ff-gill">Read, discover, and explore your next favorite book online.</p>

                                    <div className="col-10 offset-1 col-md-6 offset-md-3 pointer" onClick={(e)=> window.location.href = '/library'}>
                                        <div className="input-group">
                                            <input type="text" className="form-control border-0 rounded-0 shadow-none bg-light fs-5" placeholder="Find Book" readOnly/>
                                        
                                            <span className="input-group-text border-0 rounded-0 bg-danger">
                                                <i className="fa-solid fa-magnifying-glass text-white"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categories Section */}
                        <div className="categories col-12 mb-3">
                            <p className="ff-gill text-secondary mb-3 text-center">Explore Categories</p>

                            {categories.map((category, ind)=>(
                                <a key={ind} href={`/library/${category.id}`} className="btn btn-light rounded-pill mx-1 btn-sm mb-2">{category.title}</a>
                            ))}

                            <div>
                                <hr className="mx-5 my-3"/>
                            </div>
                        
                        </div>

                       

                        {/* Continue Reading */}
                        {continueReadingList().length > 0 && <div className="col-12 mb-3">
                            <div className="mb-4">
                                <span className="fs-3">Continue Reading</span>
                                <a className="ms-2" href="/continue-reading"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                            </div>

                            <div className={`of-auto pt-2 col-12 mb-3`}>
                                <div className="row m-0">
                                    {books
                                    .filter(continueReadingFilter)
                                    .map((book, ind)=> <BookWidget key={ind} book={book}/>)}
                                </div>
                            </div>

                            <div>
                                <hr className="mx-5 my-3"/>
                            </div>

                        </div>}

                        {/* Recently Added Book List */}
                        <div className="col-12 mb-3">
                            <div className="mb-4">
                                <span className="fs-3">Recently Added</span>
                                <a className="ms-2" href="/library"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
                            </div>

                            <div className={`of-auto pt-2 col-12 mb-5`}>
                                <div className="row m-0">
                                    {books
                                    .filter(recentlyAddedFilter)
                                    .map((book, ind)=> <BookWidget key={ind} book={book}/>)}
                                </div>
                            </div>

                            <div>
                                <hr className="mx-5 my-3"/>
                            </div>
                        </div>

                        <div className="col-12 mb-5">
                            <div className="fs-3 ff-gill mb-4">Community</div>

                            <div className="card rounded-0 border-0 border-primary border border-bottom border-4 h-40 p-4 of-auto">
                                {/* Comment 1 */}
                                <div className="d-flex justify-content-between align-items-center mb-2 bg-light ff-gill p-1 px-3 fs-sm">
                                    <span className="">
                                        <b className="me-2">James.B.</b>
                                        <span>This Book is one of a kind.</span>
                                    </span>

                                    <button className="btn btn-light btn-sm text-secondary">
                                        <i className="fa-solid fa-book-open me-2"></i>
                                        Rich Dad Poor Dad
                                    </button>
                                </div>

                                {/* Comment 2 */}
                                <div className="d-flex justify-content-between align-items-center mb-2 bg-light ff-gill p-1 px-3 fs-sm">
                                    <span className="">
                                        <b className="me-2">Sara Maher</b>
                                        <span>I've read this book many times and every time i enjory it</span>
                                    </span>

                                    <button className="btn btn-light btn-sm text-secondary">
                                        <i className="fa-solid fa-book-open me-2"></i>
                                        Rich Dad Poor Dad
                                    </button>
                                </div>

                                {/* Comment 3 */}
                                <div className="d-flex justify-content-between align-items-center mb-2 bg-light ff-gill p-1 px-3 fs-sm">
                                    <span className="">
                                        <b className="me-2">Mohammed Subhi</b>
                                        <span>This is how you change your life</span>
                                    </span>

                                    <button className="btn btn-light btn-sm text-secondary">
                                        <i className="fa-solid fa-book-open me-2"></i>
                                        The power of you subc...
                                    </button>
                                </div>


                                {/* Comment 4 */}
                                <div className="d-flex justify-content-between align-items-center mb-2 bg-light ff-gill p-1 px-3 fs-sm">
                                    <span className="">
                                        <b className="me-2">Ann Darian</b>
                                        <span>Best Book Ever</span>
                                    </span>

                                    <button className="btn btn-light btn-sm text-secondary">
                                        <i className="fa-solid fa-book-open me-2"></i>
                                        Atomic Habits
                                    </button>
                                </div>

                                {/* Comment 5 */}
                                <div className="d-flex justify-content-between align-items-center mb-2 bg-light ff-gill p-1 px-3 fs-sm">
                                    <span className="">
                                        <b className="me-2">SAM</b>
                                        <span>I didn't like this one</span>
                                    </span>

                                    <button className="btn btn-light btn-sm text-secondary">
                                        <i className="fa-solid fa-book-open me-2"></i>
                                        Fairy Tails 1
                                    </button>
                                </div>

                                {/* Comment 5 */}
                                <div className="d-flex justify-content-between align-items-center mb-2 bg-light ff-gill p-1 px-3 fs-sm">
                                    <span className="">
                                        <b className="me-2">Brant Eric</b>
                                        <span>Waiting for the writer to publish his next episode</span>
                                    </span>

                                    <button className="btn btn-light btn-sm text-secondary">
                                        <i className="fa-solid fa-book-open me-2"></i>
                                        Fairy Tails 3
                                    </button>
                                </div>

                                {/* Comment 6 */}
                                <div className="d-flex justify-content-between align-items-center mb-2 bg-light ff-gill p-1 px-3 fs-sm">
                                    <span className="">
                                        <b className="me-2">Farah</b>
                                        <span>It's very nice to find out that you are not alone in books world</span>
                                    </span>

                                    <button className="btn btn-light btn-sm text-secondary">
                                        <i className="fa-solid fa-book-open me-2"></i>
                                        سيدتي
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                        

                    </div>
                </div>
            </LoadingPage>
        </UserNav>
    </> );
}
 
export default HomeView;