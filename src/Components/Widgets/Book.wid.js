const BookWidget = (props) => {
    let book = props.book;

    function showBook(){
        window.location.href = `/books/${book.id}`;
    }

    return ( <>
        <div className="col-6 col-md-3 col-lg-3 col-xl-2 mb-4 book-view">
            <div className="card border-0 shadow-sm of-none pointer" onClick={showBook}>
                <div className="book-widget-image-container">
                    <img src={book.coverUrl ?? 'https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?fm=jpg'} alt={book.title ?? 'Book Title'} />
                </div>
            </div>
            {/* <div className="w-100 text-truncate fw-bold py-1">{book.title ?? 'Title'}</div> */}
        </div>
    </> );
}
 
export default BookWidget;