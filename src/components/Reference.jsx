import React from "react";
import PropTypes from "prop-types";

function Reference({ disabled = false }) {
  return <div>Reference</div>;
}

Reference.propTypes = { disabled: PropTypes.bool };

export default Reference;
