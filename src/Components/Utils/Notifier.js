import { Modal, Toast } from "bootstrap";

export default class Notifier {

    /**
     * Show Confirm Dialog
     * @param {object} data 
     * @param {String} data.extentions e.g.  (.pdf, .png, ...)
     * @param {Function} data.onConfirm
     */
    uploadFile({
        extentions = '.jpeg,.png,.jpg,.gif',
        onConfirm
    }){
        let dialogInput = document.getElementById('upload-file-dialog-input');
        dialogInput.setAttribute('accept', extentions)
        
        let callback = (e)=>{
            onConfirm(dialogInput.files[0]);
        }

        dialogInput.addEventListener('change', callback, {once: true});
        dialogInput.addEventListener('cancel', ()=>{dialogInput.removeEventListener('change', callback, {once: true});}, {once: true});

        dialogInput.click();
    }

    /**
     * @typedef {object} OptionsListItem
     * @property {String} id
     * @property {String} value
     */

    /**
     * @callback OptionsCallback
     * @param {String} id
     */

    /**
     * 
     * @param {object} options 
     * @param {String} options.id
     * @param {String} options.title
     * @param {Array<OptionsListItem>} options.list You need to convert the list into an object list of {id, value}
     * @param {OptionsCallback} options.onConfirm
     */
    showOptionsDialog({
        id,
        title = 'Options',
        list = [],
        onConfirm = ()=>{},
    }){
        document.querySelector('#liveOptionsDialog .modal-title').innerHTML = title;
        let ul = document.querySelector('#liveOptionsDialog ul.list-group');
        const modal = new Modal('#liveOptionsDialog');

        ul.innerHTML = ''

        list.map((option)=>{
            let item = document.createElement('li');
            item.classList = `list-group-item list-group-item-action ${option.id === id && 'active'}`;
            item.dataset.id = option.id
            item.innerHTML = option.value
            ul.append(item);
            return item;
        });

        

        let itemList = document.querySelectorAll('#liveOptionsDialog li.list-group-item');

        let onItemClick = (e)=>{
            onConfirm(e.target.dataset.id);
            modal.hide();
        }

        itemList.forEach((element)=>{
            element.addEventListener('click', onItemClick);
        });

        document.querySelector('#liveOptionsDialog').addEventListener('hide.bs.modal', (e)=>{
            itemList.forEach((element)=>{
                element.removeEventListener('click', onItemClick);
            });
        })

        
        modal.show();

    }
    
    /**
     * Show Confirm Dialog
     * @param {ConfirmDialogObject} object 
     */
    async showConfirmDialog({
        title = 'Confirm', 
        confirmText = 'confirm',
        confirmColor = 'primary',
        message = '', 
        onConfirm = ()=>{}, 
        onCancel = ()=>{}
    }){
        document.querySelector('#liveConfirmDialog .modal-title').innerHTML = title;
        document.querySelector('#liveConfirmDialog .message').innerHTML = message;

        document.querySelector('#liveConfirmDialog .btn-confirm').innerHTML = confirmText;
        document.querySelector('#liveConfirmDialog .btn-confirm').classList.add(`btn-${confirmColor}`);
        
        // On Confirm
        document.querySelector('#liveConfirmDialog .btn-confirm')
        .addEventListener('click',onConfirm, {once: true});
        // On Cancel
        document.querySelector('#liveConfirmDialog .btn-cancel')
        .addEventListener('click', onCancel, {once: true});

        // Modal is Visible
        document.getElementById('liveConfirmDialog').addEventListener('shown.bs.modal', ()=>{
            document.querySelector('#liveConfirmDialog .btn-confirm').focus()
        }, {once: true})

        // Modal is hidden
        document.getElementById('liveConfirmDialog').addEventListener('hidden.bs.modal', ()=>{

            // Remove Color
            document.querySelector('#liveConfirmDialog .btn-confirm').classList.remove(`btn-${confirmColor}`);
            // Remove On Confirm Listener
            document.querySelector('#liveConfirmDialog .btn-confirm')
            .removeEventListener('click',onConfirm, {once: true});
            // Remove On Cancel Listener
            document.querySelector('#liveConfirmDialog .btn-cancel')
            .removeEventListener('click', onCancel, {once: true});
        }, {once: true})

       

        const modal = new Modal('#liveConfirmDialog');
        modal.show();  
    }

    /**
     * Show Text Dialog
     * @param {TextDialogObject} object 
     */
    async showTextDialog({message, hint, value, confirmText, onConfirm, onDelete}){
        document.querySelector('#liveTextDialog .modal-title').innerHTML = message;
        document.querySelector('#liveTextDialog .btn-confirm').innerHTML = confirmText ?? 'Save';
        document.querySelector('#liveTextDialog input').value = value ?? '';
        document.querySelector('#liveTextDialog input').placeholder = hint ?? 'Enter Text';

        let form = document.querySelector('#liveTextDialog form');


        let callback = ()=>{onConfirm(document.querySelector('#liveTextDialog input').value);}

        let deleteCallback = ()=>{onDelete();}

        let dialog = document.getElementById('liveTextDialog');
        let btnDelete = document.querySelector('#liveTextDialog .btn-delete');

        // Hide/Show Delete Button
        if(onDelete == null){btnDelete.classList.add('d-none')}
        else{btnDelete.classList.remove('d-none')}

        // Modal is visible
        dialog.addEventListener('shown.bs.modal', ()=>{
            form.addEventListener('submit', callback, {once: true});
            document.querySelector('#liveTextDialog input').focus();
            btnDelete.addEventListener('click', deleteCallback, {once: true})
        }, {once: true})

        // Modal is hidden
        dialog.addEventListener('hidden.bs.modal', ()=>{
            form.removeEventListener('submit', callback, {once: true}); 
            btnDelete.removeEventListener('click', deleteCallback, {once: true});
            form.reset()
        }, {once: true})

        const modal = new Modal('#liveTextDialog');
        modal.show();
    }

    /**
     * Show Link Dialog
     * @param {LinkDialogObject} object 
     */
    async showLinkDialog({link, onConfirm, onDelete}){

         // Form Vars
         let form = document.getElementById('liveLinkDialogForm');
         let linkData = form.elements
         form.reset();
 
         // Set Data
         linkData['icon'].value =  link?.icon ?? 'fa-facebook-messenger text-primary';
         linkData['path'].value =  link?.path ?? '';         
 
         // Set Data On Confirm
         let callback = ()=>{
             let nLink = {
                 id: link?.id ?? new Date(Date.now()).getTime().toString(),
                 icon: linkData['icon'].value,
                 path: linkData['path'].value,
             }
 
             onConfirm(nLink);
         }
 
         let deleteCallback = ()=>{
             if(link != null){
                 onDelete(link)
             }
         }

        let dialog = document.getElementById('liveLinkDialog');
        let btnDelete = document.querySelector('#liveLinkDialog .btn-delete');

        // Hide/Show Delete Button
        if(onDelete == null){btnDelete.classList.add('d-none')}
        else{btnDelete.classList.remove('d-none')}

        // Modal is visible
        dialog.addEventListener('shown.bs.modal', ()=>{
            form.addEventListener('submit', callback, {once: true});
            btnDelete.addEventListener('click', deleteCallback, {once: true})
        }, {once: true})

        // Modal is hidden
        dialog.addEventListener('hidden.bs.modal', ()=>{
            form.removeEventListener('submit', callback, {once: true}); 
            btnDelete.removeEventListener('click', deleteCallback, {once: true});
            form.reset()
        }, {once: true})

        const modal = new Modal('#liveLinkDialog');
        modal.show();
    }

    /**
     * Show Text Area Dialog
     * @param {TextDialogObject} object 
     */
    async showTextareaDialog({message, hint, confirmText, value, onConfirm, onDelete}){
        document.querySelector('#liveTextareaDialog .modal-title').innerHTML = message;
        document.querySelector('#liveTextareaDialog textarea').value = value ?? '';
        document.querySelector('#liveTextDialog .btn-confirm').innerHTML = confirmText ?? 'Save';
        document.querySelector('#liveTextareaDialog textarea').placeholder = hint ?? 'Enter Text';

        let form = document.querySelector('#liveTextareaDialog form');

        let callback = ()=>{onConfirm(document.querySelector('#liveTextareaDialog textarea').value);}

        let deleteCallback = ()=>{onDelete();}

        let dialog = document.getElementById('liveTextareaDialog');
        let btnDelete = document.querySelector('#liveTextareaDialog .btn-delete');

        // Hide/Show Delete Button
        if(onDelete == null){btnDelete.classList.add('d-none')}
        else{btnDelete.classList.remove('d-none')}

        // Modal is visible
        dialog.addEventListener('shown.bs.modal', ()=>{
            form.addEventListener('submit', callback, {once: true});
            document.querySelector('#liveTextareaDialog textarea').focus();
            btnDelete.addEventListener('click', deleteCallback, {once: true})
        }, {once: true})

        // Modal is hidden
        dialog.addEventListener('hidden.bs.modal', ()=>{
            form.removeEventListener('submit', callback, {once: true}); 
            btnDelete.removeEventListener('click', deleteCallback, {once: true});
            form.reset()
        }, {once: true})

        const modal = new Modal('#liveTextareaDialog');
        modal.show();
    }


    /**
     * Show Toast
     * @param {ToastObject} object 
     */
    toast({message = 'Toast', color = 'primary'}){
        let liveMessage = document.querySelector('#liveToast .message');
        let liveToast = document.querySelector('#liveToast');

        if(liveMessage && liveToast){
            liveMessage.innerHTML = message
            
            liveToast.classList.add(`text-bg-${color}`)
            liveToast.classList.add(`bg-${color}`)

            const elem = document.getElementById('liveToast')
            const toast = new Toast(elem);
            toast.show();

            elem.addEventListener('hidden.bs.toast', ()=>{
                liveMessage.innerHTML = ''
                liveToast.classList.remove(`text-bg-${color}`);
                liveToast.classList.remove(`bg-${color}`);
            })
        }else{
            console.log('could not find element')
        }
        
    }
    
    // Set Loading enabled/disabled
    setLoading(enabled = false){
        let elem = document.querySelector('#liveLoading');

        if(elem != null){
            if(enabled){
                elem.classList.remove('d-none')
                elem.classList.add('d-block')
            }else{
                elem.classList.add('d-none')
                elem.classList.remove('d-block')
            }
        }else{
            console.log('cannot find element')
        }
    }

}

//
// Parameter Identifiers

// Upload File Dialog Parameter Object
// eslint-disable-next-line
class UploadFileDialogObject {
    /** @type {String} */
    extentions; 
    /** @type {Function} */
    onConfirm(){};
}

// Confirm Dialog Parameter Object
// eslint-disable-next-line
class ConfirmDialogObject {
    /** @type {String} */
    title; 
    /** @type {String} */
    message;
    /** @type {String} */
    confirmText; 
    /** @type {String} */
    cancelText;
    /** @type {String} */
    confirmColor;
    /** @type {Function} */
    onConfirm(){};
    /** @type {Function} */
    onCancel(){};
}

// Text Dialog Parameter Object
// eslint-disable-next-line
class TextDialogObject {
    /** @type {String} */
    message;
    /** @type {String} */
    hint;
    /** @type {String} */
    confirmText;
    /** @type {String} */
    value;
    /** @type {Function} */
    onConfirm(value){};
    /** @type {Function} */
    onDelete(){};
}

// Text Dialog Parameter Object
// eslint-disable-next-line
class LinkDialogObject {
    /** @type {LinkModel} */
    link;
    /** @type {Function} */
    onConfirm(value){};
    /** @type {Function} */
    onDelete(){};
}

// product Dialog Parameter Object
// eslint-disable-next-line
class ProductDialogObject {
    /** @type {product} */
    product;
    /** 
     * @type {Function} 
     * @param {product} product
     * */
    onConfirm(product){};

    /** 
     * @type {Function} 
     * @param {product} product
     * */
    onDelete(product){};
}


// Text Dialog Parameter Object
// eslint-disable-next-line
class ToastObject {
    /** @type {String} */
   message;
   /** @type {String} */
   color;
}