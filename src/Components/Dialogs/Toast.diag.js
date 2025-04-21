const Toast = () => {
    return ( <>
        <button type="button" className="d-none" id="liveToastBtn" data-bs-dismiss="toast" aria-label="Close"></button>

        <div id="liveToast" className="toast align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
            <div className="toast-body">
                <span className="message"></span>
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </> );
}
 
export default Toast;