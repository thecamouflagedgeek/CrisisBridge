import React from 'react';
import styles from './LandingPage.module.css';
// import Footer from './Footer.tsx'

const LandingPage: React.FC = () => 
{
    return (
        <>
            <div className={styles.style}>
                <div>
                    <div className={styles.card}>
                        <img src="" alt="image" />
                        <p>
                            <h3>BRIDGING HOPE ,</h3>
                            <h3>EMPOWERING LIVES</h3>
                        </p>
                        <p>
                            <p>Where technology bridges</p>
                            <p>the gap between need and</p>
                            <p>support</p>
                        </p>
                        <button className={styles.button}>Learn More</button>
                    </div>
                </div>
                {/* <p className={styles.heading}>CrisesBridge</p>
                <p className={styles.para}>Your journey starts here!</p> */}
            </div>
            {/* <Footer /> */}
        </> 
    );
};


export default LandingPage;