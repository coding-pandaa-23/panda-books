import { useEffect, useState } from "react";
import BookWidget from "../../Widgets/Book.wid";
import Database from "../../Utils/Database.firebase";
import LoadingScreen from "../../Widgets/Loading.wid";
import GeustSideNav from "./Sidenav.view";
import GuestNav from "./Guest.nav";
import { Offcanvas } from "bootstrap";


const HomeView = () => {

    let db = new Database();

    const pageStep = 12;

    let [books, setBooks] = useState([]); 
    let [categories, setCategories] = useState([]); 
    let [language, setLanguage] = useState('');

    let [isLoading, setLoading] = useState(true);

    let [search, setSearch] = useState('');
    let [activeCategory, setActiveCategory] = useState(null);

    const [pageNumber, setPageNumber] = useState(1);


    useEffect(()=>{
        db.snapshot((bookList, categoryList)=>{
            setBooks(bookList);
            setCategories(categoryList);
            setLoading(false)
        })

        // eslint-disable-next-line
    },[])

    

    function filteredBooks(list){
        let filteredList = (list ?? books ?? []).filter((book)=>{
            let isEqualCategory = activeCategory === null || book.category === activeCategory?.id;
            let isEqualSearch = (book.title ?? '').toLowerCase().includes(search.toLowerCase());
            let equalLang = (book.language?? '').includes(language ?? '');

            return isEqualCategory && isEqualSearch && equalLang;
        });

        return filteredList;
    }

    function selectCategory(cat){
        if(cat.id !== activeCategory?.id){
            setActiveCategory(cat);
        }else{
            setActiveCategory(null);
        }

        setPageNumber(1);
    }

    function selectLanguage(lang){
        if(!language || language !== lang){
            setLanguage(lang);
        }else{
            setLanguage(null);
        }

        setPageNumber(1);
    }

    function getLastRead(){
        if(books.length >= 0){
            let arr = JSON.parse(JSON.stringify(books));
            arr.sort((a,b)=> a.lastUpdate.localeCompare(b.lastUpdate));
            return arr[0];

        }

        return null;
    }

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


    // Navigation
    // =============================================

    function getLastPageNumber(){
        return Math.ceil((filteredBooks().length / pageStep))
    }

    // Jump to Next Page
    function nextPage(){
        if(getLastPageNumber() > pageNumber){
            let npn = pageNumber + 1;
            setPageNumber(npn);
        }
    }

    function prevPage(){
        if(pageNumber > 1){
            let npn = pageNumber - 1;
            setPageNumber(npn);
        }
    }

    // Clear All Filters
    function clearFilters(){
        setLanguage(null);
        setActiveCategory(null);
        setSearch('');
    }

    // Show Side Nav
    function showOffConvas(){
        const sideNav = new Offcanvas('#guestSideNav');
        sideNav.show();
    }

    return ( <>

        {/* Top Nav */}
        <GuestNav 
            currentPage={pageNumber}
            search={search}
            onSearchChange={(val)=> setSearch(val)}
            onNextClick={getLastPageNumber() > pageNumber ? nextPage : null} // Disable button if it does not have a next page
            onPrevClick={pageNumber > 1 ? prevPage : null} // Disable button if it does not have a previous page
            onMoreClick={showOffConvas}
            />

        {/* Side Nav */}
        <GeustSideNav 
            categories={categories} 
            language={language} 
            activeCategory={activeCategory} 
            lastRead={getLastRead()}
            selectCategory={selectCategory} 
            selectLanguage={selectLanguage} 
            clearFilters={clearFilters} />

        <div className="container-fluid py-3">
            <div className="row m-0">                    
                {/* Books List */}
                <div className={`of-auto py-3 ${window.innerWidth < 640 ? 'h-70' : 'h-85'} `}>
                    <LoadingScreen isLoading={isLoading} >
                        <div className="row">
                            {getPageBooks(filteredBooks(books))
                            .map((book, ind)=> <BookWidget key={ind} book={book}/>)}
                        </div>
                    </LoadingScreen>
                </div>
            </div>
        </div>
    </> );
}
 
export default HomeView;