import React from "react";
import {LocationOn,Phone,Mail} from "@material-ui/icons"
import "./footer.css";

function Footer() {
  return (
    <div className="footerWrapper">
      <div className="footerLeft">
        <h2>Sidharth</h2>
        <p>
          Founder and CEO of <b>WOMZONE</b>. we provides you with the best
          shopping experience you can ever get from any platform online.You can
          think of us as your shopping advisor and we are always committed to
          proivde you with the best possible experience.
        </p>
      </div>
      <div className="footerCenter">
        <h3>Usefull links</h3>
        <div className="usefullLinks">
          <div className="linkColumn">
            <div className="eachLink">Home</div>
            <div className="eachLink">About</div>
            <div className="eachLink">Categories</div>
            <div className="eachLink">Products</div>
          </div>
          <div className="linkColumn">
            <div className="eachLink">Offers</div>
            <div className="eachLink">Retail buy</div>
            <div className="eachLink">WholeSale buy</div>
            <div className="eachLink">Distributors</div>
          </div>
        </div>
      </div>
      <div className="footerRight">
        <h3>Contact</h3>
        <div className="footerRightDetails">
          <span className="address">
            <LocationOn className="locationIcon" /> Kochi, Ernakulam, Kerala,
            682317
          </span>
          <span className="address">
            <Phone className="locationIcon" />
            9446348567
          </span>
          <span className="address">
            <Mail className="locationIcon" />
            sidharthsanal01@gmail.com
          </span>
          <div className="cardsSection">
            <img src="https://logosmarcas.net/wp-content/uploads/2020/09/Mastercard-Simbolo.jpg" />
            <img src="https://www.freepngimg.com/thumb/debit_card/3-2-debit-card-png.png" />
            <img src="https://thedigitalfifth.com/wp-content/uploads/2019/10/Banner15-1170x480.png" />
            <img src="https://www.pngmart.com/files/7/Pay-PNG-Clipart.png" />
            <img src="https://logosmarcas.net/wp-content/uploads/2020/04/PayPal-Logo.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
