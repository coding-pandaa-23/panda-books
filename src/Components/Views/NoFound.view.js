const NotFoundView = () => {
    return ( <>
        <div className="h-90 d-flex align-items-center justify-content-center">
            <div>
                <div className="text-center mb-5">
                    <i className="fa-solid fa-triangle-exclamation fa-6x text-muted"></i>
                </div>
                <pre><b>Sorry</b>, The Page you are looking for was <b>Not Found.</b></pre>
                <a className="link-underline link-underline-opacity-0" href="/">
                    <b><pre>Back to home</pre></b>
                </a>
            </div>
        </div>
    </> );
}
 
export default NotFoundView;