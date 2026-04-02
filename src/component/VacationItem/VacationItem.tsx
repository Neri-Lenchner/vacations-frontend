import "./VacationItem.css";
import {Vacation} from '../../models/vacation.model';

function VacationItem() {

    const vacation: Vacation = new Vacation(
        "Los Angeles",
        "Discover the vibrant energy of Los Angeles, where sun-soaked beaches, iconic landmarks, and world-class entertainment await. Stroll along Hollywood Boulevard, relax in Santa Monica, and explore trendy neighborhoods filled with culture, cuisine, and creativity. From breathtaking coastal views to unforgettable nightlife, LA offers the perfect blend of excitement and relaxation for your ultimate getaway experience today. Book and create lasting memories in this dazzling California destination.",
        "2026-10-03 00:00:00",
        "2026-11-03 00:00:00",
        10000
    );

    vacation.startDate = vacation.startDate.split(' ')[0].split('-').reverse().join('.');
    vacation.endDate = vacation.endDate.split(' ')[0].split('-').reverse().join('.');

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
                {vacation.startDate} - {vacation.endDate}
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