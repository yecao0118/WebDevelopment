import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Movie Library. All rights reserved.</p>
    </footer>
  );
}

export default Footer;