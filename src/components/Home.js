import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom' ;

const Home = () => (
    <Fragment>
        <Helmet><title>Home - Quiz App</title></Helmet>
        <div id="home">
            <section>
                <div style = {{ textAlign: "center" }}>
                <span class="mdi mdi-cube-outline cube"></span>
                </div>
                <h1>Quiz App</h1>
                <div className = "play-button-container">
                   <ul>
                       <li>
                         <Link className = "play-button" to = "/play/instructions">Play</Link>
                       </li>
                   </ul>
                </div>
                <div className = "auth-container">
                  <a href = "https://github.com/" target = "_blank" className = "auth-buttons" id = "login-button">Go to Code Repository</a>
                </div>
            </section>
        </div>
    </Fragment>
);

export default Home;