import '../assets/css/AppFooter.css'
import '../assets/css/global.css'


function AppFooter(){
return(
  <footer className="container">
      <section className="links">
        <a href="mailto:joblinkj@vt.edu">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="20" height="20" fill="url(#pattern0)" />
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_46_19" transform="scale(0.02)" />
              </pattern>
              <image id="image0_46_19" width="50" height="50"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABtUlEQVR4nO3WMWgUQRTG8UkUAooREbGINkJAsBAsBAsFxUbB0jalrZ22lnbB0k4sbcVKLCwEC0FBEARBCIIgIihINEF/svCE4Qzxbm/vbrLMHw6W23nvfd++2beTUqVSqVRmgZ6Q9M1I2qGoRgpD7zuCuVQ4Mo3bGXmBc6lQcBrPhjHyl4c4lgoBR3Efv7fSu5WRVWzE3+u4jcUZGlgMDY0WoW31v0bi5jIeZN35jOvYNUUD81jBx0zHY5wYeWrhPF5mid7g8hRMXMCrgbqXxhq/wz6Zjgwsj7oThjaSBezFrYG9eheHOjBwIN6DH5H7J+5g/xCxoxnJAo/k0wNfcBMLLQzsxjV8ajsttTUyOM8zAW9xdYT4i3idxTffr7MtdIxnJJLMNeLxPhP0BCe3iTmOR9n6D9GV+ZYaxjeSJdsT2+tbpPsV2+9wtuZg7PvNWPM93ot9Y9bu/tCIJdwLIw1fcSN+zbW416xZ6qjm5E6/OIWn/uU5znRca/LHeFzBO6zFt6jzk7VpGIlCC21Gc3FGJo1qpDDUjhSG2pHCUDtSGGpHCkNvO7LTSXpCqlQqlUqaAX8AyspfT6jtlz0AAAAASUVORK5CYII=" />
            </defs>
          </svg><label className="contact-us">Contact Us</label></a>
        <a href="https://maps.app.goo.gl/XNbNJiruah3fkDhY6">
          <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.00008 8.58335C5.44755 8.58335 4.91764 8.36386 4.52694 7.97316C4.13624 7.58246 3.91675 7.05255 3.91675 6.50002C3.91675 5.94749 4.13624 5.41758 4.52694 5.02688C4.91764 4.63618 5.44755 4.41669 6.00008 4.41669C6.55262 4.41669 7.08252 4.63618 7.47322 5.02688C7.86392 5.41758 8.08342 5.94749 8.08342 6.50002C8.08342 6.77361 8.02953 7.04452 7.92483 7.29728C7.82013 7.55004 7.66668 7.7797 7.47322 7.97316C7.27977 8.16661 7.0501 8.32007 6.79734 8.42477C6.54458 8.52947 6.27367 8.58335 6.00008 8.58335ZM6.00008 0.666687C4.45299 0.666687 2.96925 1.28127 1.87529 2.37523C0.78133 3.46919 0.166748 4.95292 0.166748 6.50002C0.166748 10.875 6.00008 17.3334 6.00008 17.3334C6.00008 17.3334 11.8334 10.875 11.8334 6.50002C11.8334 4.95292 11.2188 3.46919 10.1249 2.37523C9.03091 1.28127 7.54718 0.666687 6.00008 0.666687Z"
              fill="#C3CBCD" />
          </svg>
          <label className="contact-us">Get Directions</label> </a>
      </section>
      <section className="copyright">
        © 2024 BooksBuy. All Rights Reserved. T&C Apply*
      </section>
      <section className="social-media-icons">
        <a href = "https://www.facebook.com/" className="facebook"><svg width="25" height="25" viewBox="0 0 50 50" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22 0C9.86156 0 0 9.86156 0 22C0 33.0191 8.12753 42.1384 18.7129 43.7285L19.8613 43.9023V26.5664H14.6641V23.0469H19.8613V18.373C19.8613 15.495 20.552 13.5994 21.6953 12.4102C22.8387 11.2209 24.528 10.6211 26.8789 10.6211C28.7587 10.6211 29.49 10.735 30.1855 10.8203V13.7012H27.7383C26.3497 13.7012 25.2104 14.4759 24.6191 15.5078C24.0278 16.5397 23.8438 17.7718 23.8438 19.0273V23.0449H29.9668L29.4219 26.5645H23.8438V43.9297L24.9785 43.7754C35.7143 42.3194 44 33.1268 44 22C44 9.86156 34.1384 0 22 0ZM22 2C33.0576 2 42 10.9424 42 22C42 31.7298 35.0358 39.7318 25.8438 41.5332V28.5645H31.1367L32.2988 21.0449H25.8438V19.0273C25.8438 17.9899 26.0336 17.0603 26.3535 16.502C26.6735 15.9436 26.9819 15.7012 27.7383 15.7012H32.1855V9.00977L31.3184 8.89258C30.7186 8.81142 29.3492 8.62109 26.8789 8.62109C24.1758 8.62109 21.8556 9.35745 20.2539 11.0234C18.6522 12.6894 17.8613 15.1701 17.8613 18.373V21.0469H12.6641V28.5664H17.8613V41.4707C8.81699 39.5548 2 31.6244 2 22C2 10.9424 10.9424 2 22 2Z"
              fill="#C3CBCD" />
          </svg>
        </a>
        <a href="https://www.instagram.com/" className="instagram"><svg width="25" height="25" viewBox="0 0 50 50" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 3C8.83248 3 3 8.83248 3 16V34C3 41.1675 8.83248 47 16 47H34C41.1675 47 47 41.1675 47 34V16C47 8.83248 41.1675 3 34 3H16ZM16 5H34C40.0865 5 45 9.91352 45 16V34C45 40.0865 40.0865 45 34 45H16C9.91352 45 5 40.0865 5 34V16C5 9.91352 9.91352 5 16 5ZM37 11C36.4696 11 35.9609 11.2107 35.5858 11.5858C35.2107 11.9609 35 12.4696 35 13C35 13.5304 35.2107 14.0391 35.5858 14.4142C35.9609 14.7893 36.4696 15 37 15C37.5304 15 38.0391 14.7893 38.4142 14.4142C38.7893 14.0391 39 13.5304 39 13C39 12.4696 38.7893 11.9609 38.4142 11.5858C38.0391 11.2107 37.5304 11 37 11ZM25 14C18.9367 14 14 18.9367 14 25C14 31.0633 18.9367 36 25 36C31.0633 36 36 31.0633 36 25C36 18.9367 31.0633 14 25 14ZM25 16C29.9824 16 34 20.0176 34 25C34 29.9824 29.9824 34 25 34C20.0176 34 16 29.9824 16 25C16 20.0176 20.0176 16 25 16Z"
              fill="#C3CBCD" />
          </svg>
        </a>
        <a href="https://twitter.com/" className="twitter"><svg width="25" height="25" viewBox="0 0 25 25" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.5 2C3.57283 2 2 3.57283 2 5.5V19.5C2 21.4272 3.57283 23 5.5 23H19.5C21.4272 23 23 21.4272 23 19.5V5.5C23 3.57283 21.4272 2 19.5 2H5.5ZM5.5 3H19.5C20.8868 3 22 4.11317 22 5.5V19.5C22 20.8868 20.8868 22 19.5 22H5.5C4.11317 22 3 20.8868 3 19.5V5.5C3 4.11317 4.11317 3 5.5 3ZM6.54297 6.5L11.1543 13.0518L6.5 18.5H7.75L11.7188 13.8535L14.9883 18.5H18.957L13.8945 11.3066L18 6.5H16.75L13.3301 10.5049L10.5117 6.5H6.54297ZM8.45703 7.5H9.98926L17.043 17.5H15.5107L8.45703 7.5Z"
              fill="#C3CBCD" />
          </svg>
        </a>
      </section>
    </footer>
)
}
export default AppFooter;
