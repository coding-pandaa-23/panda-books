const BookNotFoundView = () => {
    return ( <>
        <div className="h-70 d-flex justify-content-center align-items-center">
            <div className="text-center">
                <div className="text-center text-danger mb-3"><i class="fa-solid fa-heart-crack fa-3x"></i></div>
                <div className="text-center text-secondary mb-1 fs-5">The Book Was Not Found</div>
                <a href="/" className="btn border-0 text-primary">Back to Home</a>
            </div>
        </div>
    </> );
}
 
export default BookNotFoundView;