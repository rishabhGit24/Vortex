import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReportForm.css';

function ReportForm() {
    const [formData, setFormData] = useState({
        company: '',
        frequency: '',
        abuseType: '',
        description: ''
    });
    const [setErrors, errors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        errors({ ...setErrors, [e.target.name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.company) newErrors.company = 'Please select a company';
        if (!formData.frequency) newErrors.frequency = 'Please select a frequency';
        if (!formData.abuseType) newErrors.abuseType = 'Please select an abuse type';
        if (!formData.description) newErrors.description = 'Please provide a description';
        errors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:5000/reports', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    setSubmitted(true);
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    const errorData = await response.json();
                    errors({ submit: errorData.error || 'Failed to submit the report. Please try again.' });
                }
            } catch (error) {
                console.error('Error:', error);
                errors({ submit: 'An error occurred. Please try again later.' });
            }
        }
    };

    const isFormValid = formData.company && formData.frequency && formData.abuseType && formData.description;

    return (
        <section className="report-form">
            <div className="form-container">
                <h2>Submit Your Report</h2>
                {submitted ? (
                    <div className="success-message">
                        Report submitted successfully! Redirecting...
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <select
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a company</option>
                                <option value="company1">Company A</option>
                                <option value="company2">Company B</option>
                                <option value="company3">Company C</option>
                            </select>
                            {setErrors.company && <span className="error">{setErrors.company}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="frequency">Frequency of Abuse</label>
                            <select
                                id="frequency"
                                name="frequency"
                                value={formData.frequency}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select frequency</option>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            {setErrors.frequency && <span className="error">{setErrors.frequency}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="abuseType">Type of Abuse</label>
                            <select
                                id="abuseType"
                                name="abuseType"
                                value={formData.abuseType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select type</option>
                                <option value="harassment">Harassment</option>
                                <option value="discrimination">Discrimination</option>
                                <option value="retaliation">Retaliation</option>
                                <option value="unsafe_conditions">Unsafe Working Conditions</option>
                            </select>
                            {setErrors.abuseType && <span className="error">{setErrors.abuseType}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="6"
                                placeholder="Describe your experience..."
                                required
                            ></textarea>
                            {setErrors.description && <span className="error">{setErrors.description}</span>}
                        </div>
                        {setErrors.submit && <div className="error submit-error">{setErrors.submit}</div>}
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={!isFormValid}
                        >
                            Submit Report
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}

export default ReportForm;