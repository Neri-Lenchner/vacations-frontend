import './HomePage.css'

function HomePage() {
    return (
        <div className="home-page-container">
            <p className="home-page-text">
                TraveLentz is an innovative travel agency that creates personalized journeys tailored to every
                traveler’s interests. It blends adventure, culture, and comfort to deliver memorable experiences across
                the globe. From serene beaches to bustling cities, each itinerary is carefully crafted. TraveLentz
                emphasizes sustainability and meaningful local connections, ensuring responsible travel while helping
                clients discover the authentic beauty and spirit of every destination.
            </p>
            <div className="travel-bg">
                <div className="sky">
                    <div className="sun"></div>
                    <div className="plane" style={{ backgroundImage: "url('/balloon-image-no-background.png')" }}></div>
                </div>

                <div className="sea">
                    <div className="wave wave1"></div>
                    <div className="wave wave2"></div>
                    <div className="boat" style={{ backgroundImage: "url('/ship-image-no-background.png')" }}></div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;