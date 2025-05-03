// 'use client'
import React from 'react'
import styles from "./Home.module.scss"
// import { useRouter } from "next/navigation";
import Header from '../Components//Header/Header';
import Footer from '../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../Components/PopUp/Popup';
import { MapPin, Users } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slider1 from "../assests/slider1.jpg"
import featur from "../assests/features.jpg"
import refree from "../assests/referee2.jpg"
import SportsBuddy from "../assests/SportsBuddy.jpg"
import joinAcedemy from "../assests/joinAcedemy.png"
import AboutUs from '../Components/About/AboutUs';
import BottomImage from "../assests/curlyhairBoy.jpg"
import NavigationMenu from '../Components/Notification/Notification';
import { getTokenData } from '../services/tokenUtiles';
// import slider2 from "../assests/slider2.png"

const Home = () => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };
  // const images = [
  //   slider1
  // ];
    const navigate = useNavigate()
    //   const Router =useRouter()
  const StartPage=()=>{
    navigate("/start")
  }
  const StartAcedemyPage=()=>{
    navigate("/startAcedemy")
  }


  const features = [
    {
      id: 1,
      title: "Search Nearby Turf",
      description: "Find sports venues close to your location with ease.",
      image:featur, // Replace with actual image URL
    },
    {
      id: 2,
      title: "Find Sports Academy",
      description: "Join professional sports academies for expert training.",
      image: joinAcedemy, // Replace with actual image URL
    },
    {
      id: 3,
      title: "Book Umpires",
      description: "Connect with sports umpires for your matches and tournaments.",
      image: refree, // Replace with actual image URL
    },
    {
      id: 4,
      title: "Find Sports Buddy",
      description: "Connect with like-minded sports enthusiasts in your area.",
      image: SportsBuddy, // Replace with actual image URL
    },
  ];
  return <>
  <div className={styles.mainContainer}>
  <div style={{overflow:"hidden"}} >
  {/* <div style={{background:"black"}} >
      <Slider {...settings}>
        {images.map((image, index) => ( */}
          <div  className={styles.background}>
            <img src={slider1}  style={{ width: '100%', }} />
          </div>
        {/* ))} */}
      {/* </Slider>
    </div> */}
    <div className={styles.headerSection}>
  <Header/>
  </div>
      {/* Hero Section */}
      <section className={styles.hero} >
        <div className={styles.container}>
          <h2 className={styles.heroTitle}>Unleash Your Game Potential</h2>
          <p className={styles.heroSubtitle}>Your one-stop destination for sports venues and professional training academies</p>
          {/* <button onClick={()=>StartPage()} className={styles.heroButton}>Get Started</button> */}
          <div className={styles.navButtons}>
      <button onClick={()=>StartPage()} className={styles.button}>
        {/* <MapPin className="" /> */}
        <span className={styles.discover}>Book Sports Turf</span>
      </button>
      
      <button onClick={()=>StartAcedemyPage()} className={styles.button2}>
        {/* <Users className="" /> */}
        <span className="">Join Sports Academy</span>
      </button>
    </div>
          {/* <AlertDialog/> */}
        </div>
      </section>
  </div>


      {/* Features Section */}
      <section id="features" className={styles.features}>
  <div className={styles.container}>
    <h3 className={styles.sectionTitle}>Our Offerings</h3>
    <div className={styles.containers}>
      {features.map((feature) => (
        <div key={feature.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={feature.image} alt={feature.title} className={styles.image} />
            <button className={styles.cardbutton}>Discover More</button>
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>{feature.title}</h2>
            <p className={styles.description}>{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
<div style={{padding:"2vw",background:"black"}}>

<AboutUs/>
</div>

<div style={{height:"45vw",background:"black",display:"flex",alignItems:"center",justifyContent:"center"}}>
 <div className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>Unleash Your Inner Power,</h1>
        <h2 className={styles.heroSubtitle}>Conquer Every Challenge!!!</h2>
        <button className={styles.heroButton}>EXPLORE NOW</button>
      </div>
    </div>
    </div>
<Footer/>
</div>
  </>
}

export default Home
