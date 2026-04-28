import React, {JSX} from 'react';
import './CheckBoxItem.css';

interface CheckBoxItemProps {
    isAdmin: boolean;
    showFunction: any;
    handleVacationFunction: any;
    headLine: string;
}

function CheckBoxItem(checkBoxItemProps: CheckBoxItemProps): JSX.Element {

    const {isAdmin, showFunction, handleVacationFunction, headLine} = checkBoxItemProps;

    return (
        <div className="checkbox-item-container">
            <label
                className={isAdmin ? "checkbox-display-none" : "checkbox-label"}>
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={showFunction}
                    onChange={handleVacationFunction}
                />
                <h4>{headLine}</h4>
            </label>
        </div>
    );
}

export default CheckBoxItem;