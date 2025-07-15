// 'use client'
import React from 'react'
import styles from "./Home.module.scss"
// import { useRouter } from "next/navigation";
import Header from '../Components//Header/Header';
import Footer from '../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../Components/PopUp/Popup';
import { MapPin, Users, ArrowRight, Play, Star, Trophy, Target, Zap, Calendar, User } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slider1 from "../assests/slider1.jpg"
import featur from "../assests/features.jpg"
import refree from "../assests/referee2.jpg"
import SportsBuddy from "../assests/SportsBuddy.jpg"
import joinAcedemy from "../assests/joinAcedemy.png"
import BottomImage from "../assests/curlyhairBoy.jpg"
import NavigationMenu from '../Components/Notification/Notification';
import { getTokenData } from '../services/tokenUtiles';
import { Check, CreditCard, MousePointer, DollarSign, SlidersHorizontal, BadgeDollarSign, 
  Wallet, Map } from 'lucide-react';

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
    fade: true,
    cssEase: 'linear'
  };

  const navigate = useNavigate()

  const StartPage = () => {
    navigate("/start")
  }

  const StartAcademyPage = () => {
    navigate("/startAcedemy")
  }

  const features = [
    {
      id: 1,
      title: "Find Sports Academy",
      description: "Join professional sports academies for expert training and skill development.",
      image: joinAcedemy,
      status: "Coming Soon",
      icon: <Trophy className={styles.featureIcon} />
    },
    {
      id: 2,
      title: "Book Personal Coach & Trainer",
      description: "Find experienced coaches for personalized one-on-one or group training sessions.",
      image: featur,
      status: "Coming Soon",
      icon: <User className={styles.featureIcon} />
    },
    {
      id: 3,
      title: "Host Tournaments & Matches",
      description: "Plan and manage your own tournaments using our comprehensive booking tools.",
      image: refree,
      status: "Coming Soon",
      icon: <Calendar className={styles.featureIcon} />
    },
    {
      id: 4,
      title: "Find Sports Buddy",
      description: "Connect with like-minded sports enthusiasts and players in your area.",
      image: SportsBuddy,
      status: "Coming Soon",
      icon: <Users className={styles.featureIcon} />
    },
  ];

  const aboutStats = [
    { icon: <Check className={styles.statIcon} />,label: "Verified Venues Only" },
    { icon: <SlidersHorizontal className={styles.statIcon} />, label: "Smart Filters" },
    { icon: <MapPin className={styles.statIcon} />,label: "Location-Based Suggestions" },
    { icon: <Map  className={styles.statIcon} />, label: "View on Google Maps" }
  ];

  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <div className={styles.headerSection}>
        <Header />
      </div>

      {/* Hero Section with Background */}
      <div className={styles.heroWrapper}>
        <div className={styles.backgroundImage}>
          <img src={slider1} alt="Sports venue" className={styles.heroImage} />
          <div className={styles.overlay}></div>
        </div>
        
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Find, Book & Play </h1>
              <p className={styles.heroSubtitle}>
                Book your perfect sports facilities in just few clicks - Turn Your Passion into Play 
              </p>
              
              <div className={styles.heroActions}>
                <button onClick={StartPage} className={styles.primaryButton}>
                  <div className={styles.buttonContent}>
                    <MapPin className={styles.buttonIcon} />
                    <span className={styles.buttonText}>Turf Booking – Go </span>
                    <ArrowRight className={styles.arrowIcon} />
                  </div>
                  <div className={styles.buttonGlow}></div>
                </button>
              </div>
              {/* Verification Badges */}
      <div className={styles.verificationBadges}>
        <div className={styles.badgeItem}>
          <div className={styles.badgeIcon}>
            <DollarSign className={styles.checkIcon} />
          </div>
          <span className={styles.badgeText}>No Platform Charges</span>
        </div>
        
        <div className={styles.badgeItem}>
          <div className={styles.badgeIcon}>
            <MousePointer className={styles.checkIcon} />
          </div>
          <span className={styles.badgeText}>Book in Three Steps</span>
        </div>
        
        <div className={styles.badgeItem}>
          <div className={styles.badgeIcon}>
            <CreditCard className={styles.checkIcon} />
          </div>
          <span className={styles.badgeText}>No Full Payment on Booking</span>
            </div>
      </div>
    </div>
  </div>
        </section>
      </div>

      {/* About Section */}
      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.aboutContent}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>About Indian Maidan</h2>
              <div className={styles.sectionTitleUnderline}></div>
              <p className={styles.sectionSubtitle}>
               Play Bold   |   Achieve Goal   |   Get Gold
              </p>
            </div>
            
            <div className={styles.aboutGrid}>
              <div className={styles.aboutText}>
                <div className={styles.textContent}>
                  <p className={styles.aboutDescription}>
                    Welcome to <span className={styles.brandName}>Indian Maidan</span>, We make it easy for you to find and book nearby sports turfs in just a few clicks. Whether you're planning a friendly match, regular practice, or a weekend game with friends, Indian Maidan helps you book the perfect ground hassle-free. With verified venues, instant booking, no extra charges and no full payment required while booking. We ensure a smooth and reliable turf booking experience to our enthusiastic sports lover– anytime, anywhere.
                  </p>
                  
                  {/* <p className={styles.aboutDescription}>
                    Whether you're looking to book a turf, find the perfect sports academy, connect with a reliable 
                    coach, or secure a sports ground for your game, we've got you covered.
                  </p> */}
                </div>
                
                <div className={styles.aboutFeatures}>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIconWrapper}>
                      <Zap className={styles.featureIcon} />
                    </div>
                    <div className={styles.featureContent}>
                      <h4 className={styles.featureTitle}>Instant Booking</h4>
                      <p className={styles.featureDesc}>Book your favorite sports venue in just a few clicks</p>
                    </div>
                  </div>
                  
                  <div className={styles.featureItem}>
                    <div className={styles.featureIconWrapper}>
                      <BadgeDollarSign className={styles.featureIcon} />
                    </div>
                    <div className={styles.featureContent}>
                      <h4 className={styles.featureTitle}>No platform charges </h4>
                      <p className={styles.featureDesc}>Book your turf without paying any extra fees or hidden charges on Indian Maidan.</p>
                    </div>
                  </div>
                  
                  <div className={styles.featureItem}>
                    <div className={styles.featureIconWrapper}>
                      <Wallet className={styles.featureIcon} />
                    </div>
                    <div className={styles.featureContent}>
                      <h4 className={styles.featureTitle}>No full payment required </h4>
                      <p className={styles.featureDesc}>Secure your slot by paying a small advance amount and pay the rest later.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.aboutStats}>
                <div className={styles.statsContainer}>
                  <div className={styles.statsGrid}>
                    {aboutStats.map((stat, index) => (
                      <div key={index} className={styles.statCard}>
                        <div className={styles.statIconWrapper}>
                          {stat.icon}
                        </div>
                        <div className={styles.statNumber}>{stat.number}</div>
                        <div className={styles.statLabel}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.aboutMission}>
              <div className={styles.missionContent}>
                <h3 className={styles.missionTitle}>Our Mission</h3>
                <p className={styles.missionText}>
                  At Indian Maidan, our mission is to make sports a part of everyday life. We create a smart, digital, and user-friendly platform that helps people discover, book, and enjoy nearby turfs, courts, and sports facilities easily. We want to encourage individuals to step out, stay fit, and have fun with the game. Our goal is to build a vibrant sports community where anyone, from casual players to serious athletes, can connect, compete, and grow together. Whether you’re looking for a quick evening match, professional training, or just a fun game with new people, Indian Maidan brings the game to your fingertips. We work hard every day to improve and innovate by adding new features, experiences, and connections to offer our users something fresh and exciting. As we grow, we’re dedicated to making sports more accessible, affordable, and inclusive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Upcoming Offerings</h2>
            <div className={styles.sectionTitleUnderline}></div>
            <p className={styles.sectionSubtitle}>
              Discover new ways to enhance your sports journey
            </p>
          </div>
          
          <div className={styles.featuresGrid}>
            {features.map((feature) => (
              <div key={feature.id} className={styles.featureCard}>
                <div className={styles.cardImageContainer}>
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className={styles.cardImage} 
                  />
                  <div className={styles.cardOverlay}>
                    <div className={styles.cardOverlayContent}>
                      <span className={styles.statusBadge}>{feature.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIconWrapper}>
                      {feature.icon}
                    </div>
                    <h3 className={styles.cardTitle}>{feature.title}</h3>
                  </div>
                  <p className={styles.cardDescription}>{feature.description}</p>
                  
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <div className={styles.ctaImageContainer}>
            <img src={BottomImage} alt="Athlete" className={styles.ctaImage} />
          </div>
          <div className={styles.ctaOverlay}></div>
        </div>
        
        <div className={styles.ctaContent}>
          <div className={styles.ctaTextContent}>
            <h2 className={styles.ctaTitle}>Show your passion, unleash your potential</h2>
            
           
            <div className={styles.ctaActions}>
              <button className={styles.ctaButton} onClick={StartPage}>
                <Play className={styles.buttonIcon} />
                <span>Start Your Journey</span>
                <ArrowRight className={styles.arrowIcon} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home