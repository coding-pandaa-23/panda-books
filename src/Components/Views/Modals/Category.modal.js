import { useState } from "react";

const CategoryModal = ({
    id = 'LiveCategoryModal',
    category,
    categories = [],
    onSelectCategory,
    onUpdateCategory,
    onDeleteCategory,
    onAddCategory,
}) => {

    const [search, setSearch] = useState(''); 

    return ( <>
        <div class="modal modal-lg" id={id}>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header p-2">
                        <div className="input-group">
                            <div className="input-group-text bg-transparent border-0">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            
                            <input 
                                type="search" className="form-control border-0 shadow-none" placeholder="Find Category"
                                value={search} onChange={(e)=> setSearch(e.target.value)}/>

                            {/* Add New Category */}
                            <div 
                                onClick={onAddCategory}
                                className="input-group-text bg-transparent border-0 pointer" data-bs-dismiss="modal">
                                <i className="fa-solid fa-plus text-primary fa-lg"></i>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body">
                        
                        
                        <div className="list-group list-group-flush h-50 of-auto">
                            {categories
                            .filter((cat)=> cat.title.toLowerCase().includes(search.toLowerCase()))
                            .map((cat, ind)=>
                            <li key={ind} 
                                className={`list-group-item list-group-item-action`}  data-bs-dismiss="modal"
                                onClick={(e)=> onSelectCategory(cat)}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className={`text-truncate ${category?.id === cat.id && 'text-primary fw-semibold'}`}>
                                        {cat.title}
                                    </span>

                                    <span>
                                        <button 
                                            className="btn btn-sm btn-primary mx-1" data-bs-dismiss="modal"
                                            onClick={(e)=>{e.stopPropagation(); onUpdateCategory(cat)}}>
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-danger mx-1" data-bs-dismiss="modal"
                                            onClick={(e)=> {e.stopPropagation(); onDeleteCategory(cat)}}>
                                            <i className="fa-solid fa-trash "></i>
                                        </button>
                                    </span>
                                </div>
                            </li>)}
                        </div>
                    </div>

                    <div class="modal-footer d-block">
                        <div className="d-flex">
                            <div className="p-1 w-50">
                                <button 
                                    type="button" class="btn btn-secondary w-100" data-bs-dismiss="modal">
                                        Close
                                </button>
                            </div>
                            <div className="p-1 w-50">
                                <button 
                                    type="button" class="btn btn-danger w-100" data-bs-dismiss="modal" 
                                    onClick={(e)=> onSelectCategory(null)}>
                                        Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </> );
}
 
export default CategoryModal;