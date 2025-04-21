const LoadingDialog = () => {
    return ( <>
        <div id="liveLoading" className="d-none">
            <div className="loading">
                <div className="card">
                    <div className="card-body">
                        <div className="spinner-border text-primary custom-spinner" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </> );
}
 
export default LoadingDialog;