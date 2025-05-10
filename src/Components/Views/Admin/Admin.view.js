import { useEffect, useState } from "react";
import AdminNav from "./Admin.nav";
import AdminBooksView from "./AdminBooks.view";
import AdminCategoriesView from "./AdminCategories.view";
import LoadingPage from "../../Widgets/Loading.page";
import DB from "../../Database/Database.db";

const AdminView = () => {

    const db = new DB();

    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [view, setView] = useState('books')
    
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        db.publicStream((bookList, categoryList)=>{
            setBooks(bookList);
            setCategories(categoryList);
            setLoading(false);
        })
        
        // eslint-disable-next-line
    }, [])
    
    
    return ( <>
        <AdminNav view={view} onClick={(value)=>setView(value)}>
            <div className="container-fluid mt-3">

                <LoadingPage isLoading={isLoading}>
                    {/* Books Section
                    ========================================================== */}
                    {view === 'books' && <AdminBooksView books={books} categories={categories}/>}

                    {/* Books Section
                    ========================================================== */}
                    {view === 'categories' && <AdminCategoriesView categories={categories}/>}
                </LoadingPage>

            </div>
        </AdminNav>
    </> );
}
 
export default AdminView;


