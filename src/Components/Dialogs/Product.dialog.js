import { useState } from 'react';

const ProductDialog = (props) => {

    /**@type {import('../models/Product.model').default} */
    let product = props['product'];
        
    let {category} = props;
    let {onClose} = props;
    
    let [imgIndex , setImgIndex] = useState(0);

    function nextImage(){
        if((imgIndex + 1) < product.images.length ){
            setImgIndex(imgIndex + 1)
        }else{
            setImgIndex(0)
        }
    }

    function prevImage(){
        if((imgIndex - 1) >= 0){
            setImgIndex(imgIndex - 1)
        }else{
            setImgIndex(product.images.length - 1)
        }
    }

    return ( <>
        <div className="modal product-modal fade" id={`liveProductDialog-${product.id}`} aria-labelledby="liveProductDialogLabel" aria-hidden="true">
            
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
                
                <div className="modal-header px-3 py-2">
                    {/* Actions */}
                    <span className="actions">

                       {(product?.links ?? []).map((link)=>(
                        <a 
                            href={link.path} 
                            target='_blank' rel="noreferrer" className="btn border-0 text-warning">
                            <i className={`fa-brands ${link.icon} fa-xl`}></i>
                        </a>))}
                        
                    </span>

                    {/* Close Button */}
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                
                <div className="modal-body">
                    <div className="row">
                        {/* Picture */}
                        <div className="col-12 col-lg-6 mb-3 img-container">
                            <img src={product?.images[imgIndex]} className="w-100 rounded" alt="" />
                            
                            {(product.images.length > 1) ? <div className="arrow-buttons" onClick={prevImage}>
                                <button className="btn btn-lg border-0">
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>
                                <button className="btn btn-lg border-0" onClick={nextImage}>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div> : <span></span>}
                        </div>

                        <div className="col-12 col-lg-6  ">
                            {/* Title */}
                            <div className="fs-5 fw-bold ff-custom mb-3">{product?.title ?? ''}</div>
                            
                            {/* Category */}
                            <div className="text-danger mb-1">
                                <small><i className="fa-solid fa-code me-1"></i>Bracelets {category ?? ''}</small>
                            </div>

                            {/* Price */}
                            <div className="text-secondary fw-bold">
                                <small>
                                    <i className="fa-solid fa-hashtag mx-1"></i>
                                     {product.tag}
                                </small>
                            </div>

                            {/* Description */}
                            {(product?.desc ?? '') === '' ? (<span></span>) : <div className="desc my-3">
                                <div className="fs-5 fw-bold text-dark ff-custom  mb-2">Description</div>
                                <p className="p-1 px-3">
                                    {product.desc}
                                </p>
                            </div>}

                        </div>

                        
                    </div>
                    
                </div>
            </div>
            </div>
        </div>
    </> );
}
 
export default ProductDialog;