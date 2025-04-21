const GuestNav = ({
    currentPage = 1, 
    search = '',
    onPrevClick,
    onNextClick,
    onSearchChange = ((value)=>{}),
    onUserClick,
    onMoreClick,
}) => {
    return ( <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container d-flex justify-content-between">
                <div>
                    <a className="navbar-brand" href="/">Panda Books</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="d-flex">
                    <button className="btn btn-sm border-0 mx-2" onClick={onPrevClick}>
                        <i className={`fa-solid fa-chevron-left fa-xl ${onPrevClick ? 'text-primary' : 'text-secondary'}`}></i>
                    </button>

                    <button className="btn border-0 mx-2 text-dark disabled fw-bold">
                        {currentPage}
                    </button>
                    
                    <button className="btn btn-sm border-0 mx-2" onClick={onNextClick}>
                        <i className={`fa-solid fa-chevron-right fa-xl ${onNextClick ? 'text-primary' : 'text-secondary'}`}></i>
                    </button>
                    
                    <input 
                        className="form-control shadow-sm mx-2" type="search" placeholder="Search" 
                        value={search} onChange={(e)=>onSearchChange(e.target.value)}/>

                </div>

                <div>
                    {onUserClick && <button className="btn btn-sm border-0 mx-2 text-secondary" onClick={onUserClick}>
                        <i className="fa-solid fa-circle-user fa-xl"></i>
                    </button>}

                    {onMoreClick && <button className="btn btn-sm border-0 mx-2 text-secondary" onClick={onMoreClick}>
                        <i className="fa-solid fa-bars fa-xl"></i>
                    </button>}
                </div>
            </div>
        </nav>
    </> );
}
 
export default GuestNav;