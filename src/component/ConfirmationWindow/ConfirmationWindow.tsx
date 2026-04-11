import {JSX} from 'react';
import './ConfirmationWindow.css';
import {vacationService} from "../../services/vacation-service";

interface ConfirmationWindowProps {
    setIsDelete: any;
    vacationId: number | undefined;
}

function ConfirmationWindow(confirmationWindowProps: ConfirmationWindowProps): JSX.Element {
    let{setIsDelete, vacationId} = confirmationWindowProps;

    function cancel() {
        setIsDelete(false);
    }

    async function confirmDeleteVacation() {
        // await vacationService.deleteVacation(vacationId);
        console.log(vacationId);

        setIsDelete(false);
    }

    return (
        <div className="confirmation-window-container">
           <div className="confirmation-window-message">
                <h3>Are you sure you want to delete?</h3>
           </div>
            <div className="confirmation-window-buttons-container">
                <button className="conformation-window-delete" onClick={confirmDeleteVacation}>Delete</button>
                <button className="conformation-window-cancel" onClick={cancel}>Cancel</button>
            </div>
        </div>
    );
}

export default ConfirmationWindow;