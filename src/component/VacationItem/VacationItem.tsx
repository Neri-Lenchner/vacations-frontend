import "./VacationItem.css";


function VacationItem() {
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
                20 10 2022 - 9 11-2022
            </div>
            <div className="vacation-item-content-container">
                <p className="vacation-item-text">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)
                </p>
                <button className="form-button vacation-item-button">
                    $ Price
                </button>
            </div>
            <div className="vacation-item-title">
                Vacation
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