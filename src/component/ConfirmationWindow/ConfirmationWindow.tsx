import {JSX} from 'react';
import './ConfirmationWindow.css';

interface ConfirmationWindowProps {
    isDelete: boolean;
    setIsDelete: any;
}

function ConfirmationWindow(confirmationWindowProps: ConfirmationWindowProps): JSX.Element {
    let{isDelete, setIsDelete} = confirmationWindowProps;

    function cancel() {
        setIsDelete(false);
    }
    return (
        <div className="confirmation-window-container">
           <div className="confirmation-window-message">
                <h3>Are you sure you want to delete?</h3>
           </div>
            <div className="confirmation-window-buttons-container">
                <button>Yes</button>
                <button onClick={cancel}>Cancel</button>
            </div>
        </div>
    );
}

export default ConfirmationWindow;