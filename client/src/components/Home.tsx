import '../assets/css/global.css';
import '../assets/css/Home.css'
import {NavigateFunction, useNavigate} from "react-router-dom";

function Home() {

    const navigate: NavigateFunction = useNavigate();
    return (

        <div className="home-page">
            <section className="welcome-text">
                <h2 className="body-title">BooksBuy:Discover Worlds in Words</h2>
                <p className="body-para">
                    Explore the literary treasures at BooksBuy Store, your online haven for captivating stories. Shop
                    and dive
                    into new
                    realms, as each page unveils a world of imagination. Your next favorite book awaits in our virtual
                    aisles!
                </p>
                <button className="start-reading-button" onClick={() => navigate('/categories/Best Sellers')}>Start
                    Shopping Now!
                </button>
            </section>
            <section className="category-images container">
                <div className="top-bar">Buy 2 & Get Upto 20% off now!!!*</div>
                <div className="desktop-body">
                    <img src={require('../assets/images/books/Home/desktop.png')} alt="Books"/>
                </div>
            </section>
        </div>
    )
}

export default Home;
