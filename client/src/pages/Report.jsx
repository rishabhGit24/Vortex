import Hero from '../components/Hero.jsx';
import Navbar from '../components/Navbar.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import ReportForm from '../components/ReportForm.jsx';
import '../styles/Report.css';
import Footer from '../components/Footer.jsx';

function Report() {
    return (
        <div className="report-page">
            <Navbar />
            <Hero />
            <ReportForm />
            <ProgressBar />
            <Footer />
        </div>
    );
}

export default Report;