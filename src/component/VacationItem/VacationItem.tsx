import {JSX} from 'react';
import "./VacationItem.css";
import {Vacation} from '../../models/vacation.model';

interface VacationItemProps {
    vacation: Vacation;
}

function VacationItem(vacationItemProps: VacationItemProps): JSX.Element {

    const vacation = vacationItemProps.vacation;

    const startDate = vacation.startDate.split('T')[0].split('-').reverse().join('.');
    const endDate = vacation.endDate.split('T')[0].split('-').reverse().join('.');

    return (
        <div className="vacation-item-container">
            <div className="vacation-item-image-container">
                <img className="vacation-item-img" src="https://www.shutterstock.com/image-photo/sun-sets-behind-mountain-ranges-600nw-2479236003.jpg" />
            </div>
            <div className="vacation-item-dates">
                <svg className="vacation-item-svg" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                    <rect x="16" y="16" width="4" height="4"/>
                </svg>
                {/*20 10 2022 - 9 11-2022*/}
                {startDate} - {endDate}
            </div>
            <div className="vacation-item-content-container">
                <p className="vacation-item-text">
                    {vacation.description}
                </p>
                <button className="form-button vacation-item-button">
                    $ {vacation.cost}
                </button>
            </div>
            <div className="vacation-item-title">
                {vacation.destination}
            </div>
            <div className="vacation-item-likes-container">
                <div className="vacation-item-likes-container-content">
                    ❤️ Like 7
                </div>
            </div>
        </div>
    );
}

export default VacationItem;