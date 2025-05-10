/**
 * 
 * @param {object} obj 
 * @param {Number} obj.progress
 * @returns 
 */

const LoadingPage = ({progress, isLoading, children}) => {

    return ( <>
        {(progress == null && isLoading) &&  <div className="w-100 h-80 d-flex justify-content-center align-items-center">
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

        {progress != null && !isLoading &&  <div className="w-100 h-80 d-flex justify-content-center align-items-center">
            <div className="m-2 progress-container">
                <div className="d-block w-100">
                    <div className="text-center mb-5">
                        <i className="fa-solid fa-book-open glow fa-7x"></i>
                    </div>
                    <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={(progress * 100).toFixed(0)} aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{width: `${progress*100}%`}}></div>
                    </div>   
                </div>
            </div>
       </div>}

       {progress == null && !isLoading  && (children ?? <></>)}
    </> );
}
 
export default LoadingPage;