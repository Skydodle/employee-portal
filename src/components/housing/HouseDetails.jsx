import PropTypes from 'prop-types';

const HouseDetails = ({ address, roommates }) => {
  return (
    <div className='house-details'>
      <h2>House Details</h2>
      <div className='address'>
        <strong>Address:</strong>
        <p>{address}</p>
      </div>
      <div className='roommates'>
        <h3>Roommates</h3>
        {roommates.length > 0 ? (
          <ul>
            {roommates.map((roommate, index) => (
              <li key={index}>
                <p>
                  <strong>Name:</strong> {roommate.firstName}{' '}
                  {roommate.lastName}
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  {roommate.cellPhoneNumber || 'Not Provided'}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No roommates assigned to this house.</p>
        )}
      </div>
    </div>
  );
};

HouseDetails.propTypes = {
  address: PropTypes.string.isRequired,
  roommates: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      cellPhoneNumber: PropTypes.string.isRequired
    })
  ).isRequired
};

export default HouseDetails;
