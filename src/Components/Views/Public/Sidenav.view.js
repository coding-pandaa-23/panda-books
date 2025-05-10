import { languages } from "../../Utils/static.util";

const GeustSideNav = (props) => {

    let categories = props.categories ?? [];

    let language = props.language;
    let activeCategory = props.activeCategory;

    let selectCategory = props.selectCategory ?? (()=>{})
    let selectLanguage = props.selectLanguage ?? (()=>{})
    let clearFilters = props.clearFilters ?? (()=>{})

    let lastRead = props.lastRead;
    

    return ( <>
        <div className="offcanvas offcanvas-end" data-bs-backdrop="static" id="guestSideNav" aria-labelledby="guestSideNavLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="guestSideNavLabel">Filter</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {/* Recent */}
                {lastRead && <div className="card border-0 shadow p-3 mb-3">
                    <div className="fs-5 mb-3">
                        <i className="fa-solid fa-book fa-md me-2"></i>
                        <span>Last Read</span>
                    </div>

                    <div className="list-group list-group-flush of-auto">
                        <a href={`books/${lastRead.id}#${lastRead.title.replace(/\s/g, '-')}`} className='list-group-item list-group-item-action rounded-0 '>
                        {lastRead.title}</a>
                    </div>


                </div>}

                {/* Categories */}
                <div className="card border-0 shadow p-3 mb-3">
                    <div className="fs-5 mb-3">
                        <i className="fa-solid fa-list fa-md me-2"></i>
                        <span>Category</span>
                    </div>

                    <ul className="list-group list-group-flush h-30 of-auto">
                        {categories
                        .map((cat, ind)=>
                            <li 
                                key={ind} onClick={()=>{selectCategory(cat)}}
                                className={`list-group-item list-group-item-action rounded-0 ${cat.id === activeCategory?.id && 'active'}`}>
                                    {cat.title}
                            </li>
                        )}
                    </ul>
                </div>

                <div className="card border-0 shadow p-3 mb-3">
                    <div className="fs-5 mb-3">
                        <i className="fa-solid fa-language fa-md me-2"></i>
                        <span>Language</span>
                    </div>

                    <ul className="list-group list-group-flush">
                        {languages.map((lang, ind)=>(
                            <li 
                                key={ind} onClick={()=> selectLanguage(lang)}
                                className={`list-group-item list-group-item-action rounded-0 ${lang === language && 'active'}`}>
                                    {lang}
                                </li>
                        ))}
                    </ul>
                </div>

                <button className="btn btn-danger w-100" onClick={clearFilters}>Clear Filters</button>
            </div>
        </div>
    </> );
}
 
export default GeustSideNav;