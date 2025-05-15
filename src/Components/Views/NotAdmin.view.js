const NotAdminView = () => {
    return ( <>
        <div className="h-90 d-flex align-items-center justify-content-center">
            <div>
                <div className="text-center mb-5">
                    <i className="fa-solid fa-ban fa-6x text-muted"></i>
                </div>
                <pre><b>Sorry</b>, You don't have permission to enter this page</pre>
                <a className="link-underline link-underline-opacity-0" href="/">
                    <b><pre>Back to home</pre></b>
                </a>
            </div>
        </div>
    </> );
}
 
export default NotAdminView;