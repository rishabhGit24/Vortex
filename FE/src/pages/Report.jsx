import ProgressBar from '../components/ProgressBar.jsx';
import ReportForm from '../components/ReportForm.jsx';
import '../styles/Report.css';

function Report() {
    return (
        <div className="report-page">
            <ReportForm />
            <ProgressBar />
        </div>
    );
}

export default Report;