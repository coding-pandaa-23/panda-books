
/**
 * 
 * @param {Object} object 
 * @param {'book' | 'circle'} object.type 
 * @returns 
 */
const LoadingWidget = ({children, isLoading = false, type = 'circle'}) => {
    return ( <>
        {type === 'book' && isLoading && <div className="w-100 d-flex justify-content-center align-items-center my-5">
            <div className="m-2 progress-container">
                <div className="d-block w-100">
                    <div className="text-center mb-5">
                        <i className="fa-solid fa-book-open glow fa-7x"></i>
                    </div>
                    <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar progress-bar-striped opacity-50 bg-secondary progress-bar-animated" style={{width: '100%'}}></div>
                    </div>    
                </div>
            </div>
       </div>}

        {type === 'circle' && isLoading && <div className="w-100 d-flex justify-content-center align-items-center my-5">
            <div className="spinner-border text-primary" style={{height: 150, width: 150}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
       </div>}

       {!isLoading && children}
    </> );
}
 
export default LoadingWidget;