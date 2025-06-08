// "use client"
import React from "react";
import styles from "./Location.module.scss";
import Header from "../../Components/Header/Header";
import { Input } from "@mui/material";
import { SideBar2, SideBar3 } from "../../Components/Sidebar/Sidebar";
const Loaction = () => {
  const venues = {
    id: 1,
    image: "/images/venue1.jpg",
    name: "Elite Sports Arena",
    location: "New York, USA",
    sports: "Football, Basketball",
  };
  // {
  //   id: 2,
  //   image: '/images/venue2.jpg',
  //   name: 'Prime Sports Center',
  //   location: 'Los Angeles, USA',
  //   sports: 'Tennis, Swimming',
  // },

  return (
    <>
      <div style={{ color: "black", marginBottom: "1vw",borderBottom:"1px solid white" }}>
        <Header />
      </div>
      {/* <div className={styles.filterBar}>
        <div className={styles.filterItem}>
          <span className={styles.filterIcon}>📍</span>
          <span className={styles.filterText}>Location</span>
        </div>
        <div className={styles.filterItem}>
          <span className={styles.filterText}>Choose Sports</span>
          <span className={styles.filterIcon}>▼</span>
        </div>
        <div className={styles.filterItem}>
          <span className={styles.filterText}>Price: Low to High</span>
          <span className={styles.filterIcon}>▼</span>
        </div>
      </div> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className={styles.background}>
          {/* <img src="/images/sports2.png" /> */}
        </div>
        <div className={styles.cards}>
        {/* <div className={styles.sportsCard}>
      <div className={styles.sportsCardImage}>
        <img
          src="/images/mob.jpg"
          alt="Sports"
          className={styles.image}
        />
        <div className={styles.rating}>9/10</div>
      </div>
      <div className={styles.sportsCardContent}>
        <h3 className={styles.title}>Elite Sports Academy</h3>
        <p className={styles.location}>New York, USA</p>
        <div className={styles.tags}>
          <span className={styles.tag}>Cricket</span>
          <span className={styles.tag}>Football</span>
          <span className={styles.tag}>Badminton</span>
        </div>
        <div className={styles.sportsCardFooter}>
          <p className={styles.price}>Rs 800 / month</p>
          <button className={styles.detailsButton}>See Details</button>
        </div>
      </div>
    </div> */}
          <div className={styles.card}>
            {" "}
            <div className={styles.images}>
              <img src="/images/mob.jpg" className={styles.image} />
            </div>{" "}
            <div className={styles.content}>
              <h3 className={styles.name}>{venues.name}</h3>
              <p className={styles.location}>{venues.location}</p>
              <p className={styles.sports}>{venues.sports}</p>
              <SideBar2 />
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.images}>
              <img src="/images/football.webp" className={styles.image} />
            </div>{" "}
            <div className={styles.content}>
              <h3 className={styles.name}>{venues.name}</h3>
              <p className={styles.location}>{venues.location}</p>
              <p className={styles.sports}>{venues.sports}</p>
              <SideBar2 />
            </div>
          </div>
          <div className={styles.card}>
            {" "}
            <div className={styles.images}>
              <img src="/images/badminton.webp" className={styles.image} />
            </div>{" "}
            <div className={styles.content}>
              <h3 className={styles.name}>{venues.name}</h3>
              <p className={styles.location}>{venues.location}</p>
              <p className={styles.sports}>{venues.sports}</p>
              <SideBar2 />
            </div>
          </div>
          <div className={styles.card}>
            {" "}
            <div className={styles.images}>
              <img src="/images/swimming.jpg" className={styles.image} />
            </div>{" "}
            <div className={styles.content}>
              <h3 className={styles.name}>{venues.name}</h3>
              <p className={styles.location}>{venues.location}</p>
              <p className={styles.sports}>{venues.sports}</p>
              <SideBar2 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loaction;
