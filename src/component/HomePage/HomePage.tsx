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
            {/*<div className="travel-bg">*/}
            {/*    <div className="cloud cloud1"></div>*/}
            {/*    <div className="cloud cloud2"></div>*/}
            {/*    <div className="cloud cloud3"></div>*/}
            {/*</div>*/}

            {/*<div className="travel-bg">*/}
            {/*    <div className="sky">*/}
            {/*        <div className="plane"></div>*/}
            {/*    </div>*/}

            {/*    <div className="sea">*/}
            {/*        <div className="boat"></div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="travel-bg">
                <div className="sky">
                    <div className="sun"></div>
                    <div className="plane"></div>
                </div>

                <div className="sea">
                    <div className="wave wave1"></div>
                    <div className="wave wave2"></div>
                    <div className="boat"></div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;