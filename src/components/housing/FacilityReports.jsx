import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFacilityReports,
  submitFacilityReport,
  selectFacilityReports,
  selectUser // Import the user selector
} from '../../store';
import Comments from './Comments'; // Import the Comments component
import PropTypes from 'prop-types';

const FacilityReports = ({ houseId }) => {
  const dispatch = useDispatch();
  const facilityReports = useSelector(selectFacilityReports);
  const user = useSelector(selectUser); // Get user from Redux state

  // Fallback to get user from local storage if not in Redux state
  const currentUserId =
    user?._id || JSON.parse(localStorage.getItem('user'))._id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (houseId) {
      // Fetch existing facility reports for this house
      dispatch(fetchFacilityReports(houseId));
    }
  }, [dispatch, houseId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      // Dispatch action to submit the new facility report
      dispatch(
        submitFacilityReport({ houseId, reportData: { title, description } })
      )
        .unwrap()
        .then(() => {
          // Re-fetch the facility reports after successful submission
          dispatch(fetchFacilityReports(houseId));
        });

      // Clear form fields after submission
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className='facility-reports'>
      <h2>Facility Reports</h2>
      {/* Form to submit a new facility report */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Submit Report</button>
      </form>

      {/* Display existing facility reports */}
      <h3>Your Submitted Reports</h3>
      {facilityReports.length > 0 ? (
        <ul>
          {facilityReports.map((report) => (
            <li key={report._id || report.title + report.createdAt}>
              <h4>{report.title}</h4>
              <p>{report.description}</p>
              <p>
                <strong>Created By:</strong>
                {report.createdBy
                  ? `${report.createdBy.firstName} ${report.createdBy.lastName}`
                  : 'Unknown'}
              </p>
              <p>
                <strong>Status:</strong> {report.status || 'Open'}
              </p>
              <p>
                <strong>Submitted At:</strong>{' '}
                {new Date(report.createdAt || new Date()).toLocaleString()}
              </p>

              {/* Include the Comments component for each report */}
              <Comments reportId={report._id} currentUserId={currentUserId} />
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not submitted any facility reports yet.</p>
      )}
    </div>
  );
};

FacilityReports.propTypes = {
  houseId: PropTypes.string.isRequired
};

export default FacilityReports;
