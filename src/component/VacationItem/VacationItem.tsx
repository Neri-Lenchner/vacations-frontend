import "./VacationItem.css";


function VacationItem() {
    return (
        <div className="vacation-item-container">
            <div className="vacation-item-image-container"></div>
            <div className="vacation-item-content-container">
                <div className="vacation-item-dates"></div>
                <div className="vacation-item-text"></div>
                <button className="vacation-item-button"></button>
            </div>


        </div>
    );
}

export default VacationItem;