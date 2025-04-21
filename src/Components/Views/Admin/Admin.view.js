import { useEffect, useState } from "react";
import Database from "../../Utils/Database.firebase";
import AdminNav from "./Admin.nav";
import AdminBooksView from "./AdminBooks.view";
import AdminCategoriesView from "./AdminCategories.view";
import LoadingScreen from "../../Widgets/Loading.wid";



const AdminView = () => {

    const db = new Database();

    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [view, setView] = useState('books')
    
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        db.snapshot((bookList, categoryList)=>{
            setBooks(bookList);
            setCategories(categoryList);
            setLoading(false);
        })
        
        // eslint-disable-next-line
    }, [])
    
    
    return ( <>
        <AdminNav view={view} onClick={(value)=>setView(value)}>
            <div className="container-fluid mt-3">

                <LoadingScreen isLoading={isLoading}>
                    {/* Books Section
                    ========================================================== */}
                    {view === 'books' && <AdminBooksView books={books} categories={categories}/>}

                    {/* Books Section
                    ========================================================== */}
                    {view === 'categories' && <AdminCategoriesView categories={categories}/>}
                </LoadingScreen>

            </div>
        </AdminNav>
    </> );
}
 
export default AdminView;


