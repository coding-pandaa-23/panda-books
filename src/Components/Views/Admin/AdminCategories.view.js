import { useState } from "react";
import Notifier from "../../Utils/Notifier";
import Database from "../../Utils/Database.firebase";


const AdminCategoriesView = ({categories = []}) => {

    const db = new Database();
    const notifier = new Notifier();

    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('');

    // Category Functions
    // =============================================

    // Select Category
    function selectCategory(category){
        if(!activeCategory || activeCategory?.id !== category?.id){
            setActiveCategory(category);
        }else{
            setActiveCategory(null);
        }
    }

    // Add New Category
    function newCategory(){
        notifier.showTextDialog({
            title: 'New Category',
            message: 'Create a new category!',
            hint: 'Category',
            onConfirm: async (value)=>{
                notifier.setLoading(true);
                try {
                    await db.Categories.insert({title: value,})
                    notifier.toast({message: 'Category was created!', color: 'sucess'})
                    setActiveCategory(null)
                } catch (error) {
                    notifier.toast({color: 'danger', message: 'Somthing went wrong'});
                }
                notifier.setLoading(false);
            }
        })
    }
    
    // Update Category
    function updateCategory(){
        notifier.showTextDialog({
            message: 'Update Category',
            hint: 'Category',
            value: activeCategory?.title ?? '',
            onConfirm: async (value)=>{
                notifier.setLoading(true);
                try {
                    await db.Categories.update({title: value, id: activeCategory.id});
                    notifier.toast({message: 'Category was updated!', color: 'sucess'})
                    setActiveCategory(null)
                } catch (error) {
                    notifier.toast({color: 'danger', message: 'Somthing went wrong'});
                }
                notifier.setLoading(false);
            },
            onDelete: ()=>{
                deleteCategory();
            }
        })
    }

    // Delete Category
    function deleteCategory(){
        notifier.showConfirmDialog({
            title: 'Delete!',
            confirmText: 'delete',
            confirmColor: 'danger',
            message: `Do you want to delete <b>${activeCategory.title}</b>&nbsp;?`,
            onConfirm: async ()=>{
                notifier.setLoading(true);
                try {
                    await db.Categories.delete(activeCategory);
                    setActiveCategory(null);
                    notifier.toast({message: 'Category was deleted!', color: 'danger'})
                } catch (error) {
                    notifier.toast({color: 'danger', message: 'Somthing went wrong'});
                }
                notifier.setLoading(false);
            }
        })
    }


    return ( <>
        <div className='col-12'>
            {/* Search For Categories */}
            <div className="card border-0 shadow mb-3 p-1">
                <div className="input-group">
                    <span className="input-group-text border-0 bg-white"><i className="fa-solid fa-magnifying-glass"></i></span>
                    <input 
                        value={search} onChange={(e)=> setSearch(e.target.value)}
                        type="search" className="form-control border-0 shadow-none" placeholder="Find Category"/>
                    
                    <span className="input-group-text border-0 bg-white p-0" >
                        {activeCategory && <button className="btn btn-sm btn-success m-0 mx-1" onClick={updateCategory}>
                            <i className="fa-solid fa-pen"></i>
                        </button>}

                        <button className="btn btn-sm btn-primary m-0" onClick={newCategory}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </span>
                </div>
            </div>

            {/* Category List */}
            <div className="card border-0 shadow h-70 of-auto mb-3">
                <ul className="list-group list-group-flush rounded-0">
                    {categories
                    .filter((category)=> category?.title.toLowerCase().includes(search.toLowerCase()))
                    .map((category, ind)=>(
                        <li  key={ind} onClick={(e)=> selectCategory(category)}
                            className={`${bookCSS} ${activeCategory?.id === category.id && 'active'}`}>
                            {category.title}
                        </li>))}
                </ul>
            </div>
        </div>
    </> );
}
 
export default AdminCategoriesView;

const bookCSS = "list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3";