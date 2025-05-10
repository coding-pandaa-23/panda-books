import FavoriteButton from "../../Widgets/FavoriteButton.wid";


/**
 * 
 * @param {Object} obj 
 * @param {String} obj.bid 
 * 
 * @param {Number} obj.zoom 
 * @param {Function} obj.onZoomIn 
 * @param {Function} obj.onZoomOut 
 * 
 * @param {Number} obj.index 
 * @param {Number} obj.numberOfPages 
 * @param {Function} obj.onNext 
 * @param {Function} obj.onPrev
 *  
 * @param {import('../../Models/Progress.model').default} obj.progress 
 * @param {Function} obj.resetProgress 
 * 
 * @param {Function} obj.onRegister 
 * 
 */
const BookViewerNav = ({
    bid,
    zoom,
    onZoomIn,
    onZoomOut,

    index,
    numberOfPages,
    onNext,
    onPrev,

    progress,
    resetProgress,
    onRegister,
}) => {

    return ( <>
        <div className="col-12 py-2 mb-5">

            <div className="card border-0 rounded-0 shadow-sm fixed-top m-0 px-1 py-2">

                <div className='row m-0'>
                    {/* Home */}
                    <div className="col-6 col-md-4 d-flex justify-content-start align-items-center">
                        <a href={`/books/${bid}`} className="btn btn-light border-0 text-black mx-1">
                            <i className="fa-solid fa-chevron-left fa-lg"></i>
                        </a>

                        {numberOfPages && <button className="btn btn-light border-0 text-black mx-1" onClick={resetProgress}>
                            <i className="fa-solid fa-arrow-rotate-left fa-lg"></i>
                        </button>}

                        {/* Favorite Button */}
                        {numberOfPages && <FavoriteButton bid={progress?.id} onRegister={onRegister} />}

                        {/* Favorite Button */}
                        {numberOfPages && <button className="btn btn-light border-0 text-secondary mx-1">
                            {/* <i class="fa-solid fa-bookmark"></i>     */}
                            <i class="fa-regular fa-bookmark fa-lg"></i>    
                        </button>}
                    </div>

                    {/* Navigation buttons Section 
                    ======================================================= */}
                    <div className="col-6 col-md-4">
                    {numberOfPages && <div className='d-flex justify-content-end justify-content-md-center'>
                        <button className="btn text-secondary border-0 mx-1" onClick={onPrev}>
                        <i className="fa-solid fa-angles-left"></i>
                        </button>

                        <button className="btn btn text-black fw-bold border-0 mx-1 disabled">
                        {index ?? 1} <span className='d-none d-lg-inline-block'>&nbsp;/&nbsp;{numberOfPages}</span>
                        </button>

                        <button className="btn text-secondary border-0 mx-1" onClick={onNext}>
                        <i className="fa-solid fa-angles-right"></i>
                        </button>
                    </div>}
                        
                    </div>

                    {/* Zoom Section 
                    ======================================================= */}
                    {<div className="col-4">

                    {numberOfPages && <div className="d-none d-md-flex justify-content-end">
                        <button className="btn text-secondary border-0 mx-1" onClick={onZoomOut}>
                        <i className="fa-solid fa-magnifying-glass-minus fa-lg"></i>
                        </button>

                        <button className="btn btn text-black fw-bold border-0 mx-1 d-none d-lg-block">
                            <small><small>{zoom * 20} %</small></small>
                        </button>

                        <button className="btn text-secondary border-0 mx-1" onClick={onZoomIn}>
                        <i className="fa-solid fa-magnifying-glass-plus fa-lg"></i>
                        </button>
                    </div>}
                        
                    </div>}
                </div>
            </div>
        </div>
    </> );
}
 
export default BookViewerNav;