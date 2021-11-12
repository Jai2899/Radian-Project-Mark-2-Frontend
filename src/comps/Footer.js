import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer>
      <div className="footer-data">
        <div className="footmenu">
          <div className="logo">
            <Link to="/">
              <img
                src="/radian-logo.svg"
                alt="site logo"
                width={140}
                height={50}
              />
            </Link>
          </div>
          <div className="foot-ele-right">
            <Link to="/getaquote" className="btn-footer">
              Get a Quote
            </Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
        <div className="footmenu">
          <div className="foot-ele-left">
            <Link to="/">Home</Link>
            <Link to="/">FAQs</Link>
            <Link to="/">About Us</Link>
          </div>
          <div className="foot-ele-right">
            <a href="/">
              <img src="/facebook.svg" alt="Radian facebook page link" />
            </a>
            <a href="/">
              <img src="/twitter.svg" alt="Radian twitter account" />
            </a>
            <a href="/">
              <img src="/youtube.svg" alt="Radian youtube page link" />
            </a>
            <a href="/">
              <img src="/linkedin.svg" alt="Radian linkedin page link" />
            </a>
          </div>
        </div>
        <div>
          <p>
            &copy;2021 Radian Group Inc. All Rights Reserved.
            &ldquo;Radian&rdquo; and &ldquo;titlegenius&rdquo; are brands of
            Radian Group Inc., including its licensed insurance affiliates.
            Title insurance is provided and underwritten by Radian Title
            Insurance Inc., 6100 Oak Tree Blvd, Suite 200, Independence, OH
            44131; Tel: 877.936.8485, NAIC#: 51632, CA &ndash; License# 5093-0.
            FL &ndash; Title insurance license #34-1252928.&nbsp;AZ &ndash;
            Title Insurer 34-1252928 (not licensed in AK, HI, ID, IA, ME, MI,
            NH, NJ, VT and WY). Title Services are provided by Radian Title
            Insurance Inc. and Radian Settlement Services Inc., 1000 GSK Drive,
            Suite 210, Coraopolis, PA 15108, Tel: 800.646.8258, FL- Non-Resident Title
            Agency #A271379, both wholly owned subsidiaries of Radian Group
            Inc.. Radian Settlement Services Inc. is a title insurance agency
            for Radian Title Insurance Inc.
          </p>
          <div>
            <div className="foot-ele-left">
              <Link to="/">Privacy Policy</Link>
              <span>|</span>
              <Link to="/">Terms of Use</Link>
              <span>|</span>
              <Link to="/">Legal Disclosure</Link>
              <span>|</span>
              <Link to="/">Licensing and Disclosure Information</Link>
              <span>|</span>
              <Link to="/">Consumer Complaint Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;