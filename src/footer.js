import React from 'react';
import './footer.css';

const Footer = (props) => {
    return(
        <footer id="footer">
            
    <span class="Footer">
       
       <span class="FooterText">By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. 2008-2022 © Rushin Makwana. </span>
   </span>
            <span id="social">
                    <a href="https://www.facebook.com/" target="_blank">
                        <img src="https://i.ibb.co/dtzG625/facebook.png" alt="fb" className="slogo"/>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank">
                        <img src="https://i.ibb.co/19H5LvT/insta.png" alt="fb" className="slogo"/>
                    </a>
                    <a href="https://www.youtube.com/" target="_blank">
                        <img src="https://i.ibb.co/w07K2Vn/youtube1.png" alt="fb" className="slogo"/>
                    </a>
            </span>
        </footer>
    )
}

export default Footer;