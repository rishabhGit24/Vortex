import '../styles/ProgressBar.css';

function ProgressBar() {
  return (
    <section className="progress-bar">
      <div className="progress-container">
        <h2>Your Report's Impact</h2>
        <p>Each report helps build a safer workplace.</p>
        <div className="progress">
          <div className="progress-fill" style={{ width: '75%' }}></div>
        </div>
        <p className="progress-text">75% towards safer workplaces</p>
      </div>
    </section>
  );
}

export default ProgressBar;