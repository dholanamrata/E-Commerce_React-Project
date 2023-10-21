import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";


const Footer = () => {
  return (
    <>
      <div classname="bg-dark" style={{ margin: '"0px",height:"100px"}}' }}>
        <div className="mt-5">
          <footer className="bg-dark text-center text-white">
            <div className="container p-4 pb-0">
              <section className="mb-4">
                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><FaFacebookF /></a>
                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                  <FaTwitter /></a>
                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                  <FaGoogle /></a>
                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                  <FaInstagram /></a>
                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                  <FaLinkedinIn /></a>
                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                  <FaGithub /></a>
              </section>
            </div>
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
              © 2023 Copyright:
              <a className="text-white" href="https://mdbootstrap.com/"> https://github.com/dholanamrata/</a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Footer;
