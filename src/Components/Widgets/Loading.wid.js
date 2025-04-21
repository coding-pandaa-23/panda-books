const LoadingScreen = ({children, isLoading = false}) => {


    return ( <>
        {isLoading ? <div className="h-80 w-100 d-flex justify-content-center align-items-center">
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" style={{width: '100px', height: '100px'}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div> : children}
    </> );
}
 
export default LoadingScreen;