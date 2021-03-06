import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header";
import "./home.css";
import Section1 from "../../components/section1";
import Section2 from "../../components/Section2";
import Section3 from "../../components/section3";
import Section4 from "../../components/section4";
import Section5 from "../../components/section5";
import Section6 from "../../components/section6";
import FaqSection from "../../components/faqSection";
import Footer from "../../components/footer";
import moment from "moment";
import AfterLaunch from "../../components/afterLaunch";

toast.configure();
const Home = ({ account, mint, totalSupply, displayPrice, loadWeb3 }) => {
  const difference = +new moment("2021-10-09 12:00").utc() - +new Date();
  // const difference = +new moment("2021-09-07 16:51").utc() - +new Date();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((difference / 1000 / 60) % 60));
        setSeconds(Math.floor((difference / 1000) % 60));
      }
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });
  return (
    <div style={{ backgroundColor: "#1D1F4A" }}>
      <div className="banner">
        <Header account={account} loadWeb3={loadWeb3} />
        <div className="mobile-view-connect-button-wrapper">
          <button className="header-connect-button" onClick={() => loadWeb3()}>
            {account
              ? account.slice(0, 8) + "..." + account.slice(account.length - 5)
              : "CONNECT"}
          </button>
          I
        </div>
        <Section1 />
        {difference > 0 ? (
          <Section2
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        ) : (
          <AfterLaunch account={account} mint={mint} />
        )}
      </div>
      <div name="collection" className="collection">
        <Section3 />
      </div>
      <div name="roadmap" className="roadmap">
        <Section4 />
      </div>
      <div name="specs" className="specification">
        <Section5 />
      </div>
      <div name="team" className="team">
        <Section6 />
        <FaqSection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
