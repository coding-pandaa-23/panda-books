import ConfirmDialog from "./Dialogs/Confirm.dig";
import LinkDialog from "./Dialogs/Link.dialog";
import LoadingDialog from "./Dialogs/Loading.diag";
import OptionsDialog from "./Dialogs/Options.dialog";
import TextDialog from "./Dialogs/Text.dialog";
import TextAreaDialog from "./Dialogs/Textarea.diag";
import Toast from "./Dialogs/Toast.diag";
import UploadFileDialog from "./Dialogs/UploadFile.dig";

const DialogsContainer = () => {
    return ( <>
        <ConfirmDialog />
        <TextDialog />
        <TextAreaDialog />
        <Toast />
        <LoadingDialog />
        <LinkDialog />
        <UploadFileDialog />
        <OptionsDialog />
    </> );
}
 
export default DialogsContainer;