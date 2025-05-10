import { useEffect, useState } from "react";
import LoadingPage from "../../Widgets/Loading.page";
import BookWidget from "../../Widgets/Book.wid";
import { languages } from "../../Utils/static.util";
import { Link, useParams } from "react-router-dom";
import UserNav from "../Public/User.nav";
import DB from "../../Database/Database.db";

const LibraryView = () => {

    let {cid} = useParams();

    const db = new DB();
    const pageStep = 12;

    const [books, setBooks] = useState([]); 
    const [categories, setCategories] = useState([]); 
    
    const [isLoading, setLoading] = useState(true);
    
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [language, setLanguage] = useState('');

    const [pageNumber, setPageNumber] = useState(1);

    useEffect(()=>{
        db.publicStream((bookList, categoryList)=>{
            if(cid){
                setActiveCategory(categoryList.find((c) => c.id === cid))
            }
            
            setBooks(bookList);
            setCategories(categoryList);
            setLoading(false)
        })
        // eslint-disable-next-line
    },[])


    // Filters
    // =============================================
    

    // Filter Books By (search, category, language)
    function filteredBooks(list){
        let filteredList = (list ?? books ?? []).filter((book)=>{
            let isEqualCategory = activeCategory === null || book.category === activeCategory?.id;
            let isEqualSearch = (book.title ?? '').toLowerCase().includes(search.toLowerCase());
            let equalLang = (book.language?? '').includes(language ?? '');

            return isEqualCategory && isEqualSearch && equalLang;
        });

        return filteredList;
    }

     // Get The Last Page Number
     function getLastPageNumber(){
        return Math.ceil((filteredBooks().length / pageStep))
    }

    // Get Selected Page Books
    function getPageBooks(list){
        let arr = []
    
        for (let i = ((pageNumber * pageStep) - pageStep); i < pageNumber * pageStep ; i++) {
            if(list[i]){
                arr.push(list[i])
            }else{
                break;
            }
        }

        return arr;
    }

    // Selectors
    // =============================================

    // Toggle Active Category
    function selectCategory(cat){
        if(cat?.id !== activeCategory?.id){
            setActiveCategory(cat);
        }else{
            setActiveCategory(null);
        }

        setPageNumber(1);
    }

    // Toggle Active Language
    function selectLanguage(lang){
        if(lang !== language){
            setLanguage(lang);
        }else{
            setLanguage(null);
        }

        setPageNumber(1);
    }

    // Navigation
    // =============================================

    // Navigate to Next Page
    function nextPage(){
        if(getLastPageNumber() > pageNumber){
            let npn = pageNumber + 1;
            setPageNumber(npn);
        }
    }

    // Navigate to Previous Page
    function prevPage(){
        if(pageNumber > 1){
            let npn = pageNumber - 1;
            setPageNumber(npn);
        }
    }

    return ( <>
        <UserNav view="library">
            <LoadingPage isLoading={isLoading} >
                <div className="row m-0 mt-2">
                    <div className="col-12 col-lg-3 border-end d-none d-lg-block">

                        {/* Categories Section 
                        =============================================== */}
                        <div className="my-4 text-secondary d-flex justify-content-between align-items-center mb-5">
                            <span className="fw-bold">Explore Categories</span>
                            
                            {activeCategory && <i className="fa-solid fa-close fa-lg text-danger px-3 pointer" onClick={(e)=> setActiveCategory(null)}></i>}
                        </div>
                        
                        <div className="h-85 of-auto">
                            {categories.map((category, ind)=> (
                                <Link to={`/library/${category.id}`}
                                    key={ind} onClick={(e)=> selectCategory(category)}
                                    className={`btn rounded-pill btn-sm mx-2 mb-2 ${category.id === activeCategory?.id ? 'btn-primary' : 'btn-light'}`}>
                                        {category.title}
                                    </Link>))}
                        </div>
                        
                    </div>

                    <div className="col-12 col-lg-9 h-90">
                        
                        {/* Right Side */}
                        <div className="col-12 mt-2">
                            
                            <div className="row m-0">
                                {/* Search Section 
                                =============================================== */}
                                <div className="col-12 col-md-6  mb-3">
                                    <div className="input-group">

                                        {/* Show Categories Sidenav */}
                                        <button className="input-group-text border-0 rounded-0 text-bg-primary d-lg-none me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#categoriesOffcanvas">
                                            <i className="fa-solid fa-list"></i>
                                        </button>

                                        <span className="input-group-text border-0 rounded-0 bg-danger">
                                            <i className="fa-solid fa-magnifying-glass text-white"></i>
                                        </span>
                                        
                                        {/* Search Bar */}
                                        <input 
                                            type="search" className="form-control border-0 rounded-0 shadow-none bg-light" 
                                            placeholder="Find Book" value={search} onChange={(e)=> setSearch(e.target.value)}/>
                                        
                                    
                                    </div>
                                </div>
                                
                                <div className="col-12 col-md-6 mb-3 d-flex justify-content-between justify-content-md-end align-items-center">

                                    {/* Navigation Buttons Section
                                    =============================================== */}
                                    <div>
                                        <button className="btn btn-sm border-0" onClick={pageNumber > 1 ? prevPage : null}>
                                            <i className={`fa-solid fa-chevron-left fa-xl ${pageNumber > 1 ? prevPage : null ? 'text-primary' : 'text-secondary'}`}></i>
                                        </button>

                                        <button className="btn border-0 mx-1 text-dark disabled fw-bold">
                                            {pageNumber}
                                        </button>
                                        
                                        <button className="btn btn-sm border-0" onClick={getLastPageNumber() > pageNumber ? nextPage : null}>
                                            <i className={`fa-solid fa-chevron-right fa-xl ${getLastPageNumber() > pageNumber ? nextPage : null ? 'text-primary' : 'text-secondary'}`}></i>
                                        </button>
                                    </div>

                                    {/* Language Section
                                    =============================================== */}
                                    <div className="btn-group mx-3">
                                        {languages.map((lang, ind)=> (
                                            <button 
                                                key={ind} onClick={(e)=> selectLanguage(lang)}
                                                className={`btn ${lang === language ? 'btn-primary' : 'btn-light'}`}>
                                                {lang === 'ar' ? 'عربي' : 'English'}
                                            </button>))}
                                    </div>
                                </div>
                            </div>
                        </div>  

                        <div className="h-80 of-auto">

                            {/* Books Section 
                            =============================================== */}
                            <div className="row m-0 my-3">
                                {getPageBooks(filteredBooks(books))
                                .map((book, ind)=> <BookWidget key={ind} book={book}/>)}
                            </div>
                            {/* Books End */}
                        </div>

                    </div>
                </div>
            </LoadingPage>
        </UserNav>


        {/* Categories Sidenav */}
        <div className="offcanvas offcanvas-start" id="categoriesOffcanvas">
            <div className="offcanvas-header pb-0">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Categories</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body mt-0">
                
                {activeCategory && <Link to={'/library'} onClick={(e)=> selectCategory(null)} className="btn btn-danger btn-sm w-100 mb-3 rounded-pill">Clear Selection</Link>}
                
                <div className="h-80 of-auto">
                    {categories.map((category, ind)=> (
                        <Link to={`/library/${category?.id}`}
                            key={ind} onClick={(e)=> selectCategory(category)}
                            className={`btn rounded-pill btn-sm mx-2 mb-2 ${category.id === activeCategory?.id ? 'btn-primary' : 'btn-light'}`}>
                                {category.title}
                        </Link>))}
                </div>
            </div>
        </div>
    </> );
}
 
export default LibraryView;