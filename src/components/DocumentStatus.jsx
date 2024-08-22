import React from "react";

export default function DocumentStatus({
    documentType, name, status, feedback, onUpload, previousDocumentApproved 
}) {

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file && onUpload) {
        onUpload(file);
      }
    };
  
    if (name && status === 'approved') {
        return (
          <div>
            <h3>{documentType}</h3>
            <p><strong>Document Name:</strong> {name}</p>
            <p><strong>Status:</strong> {status}</p>
          </div>
        );
      }
    
      if (name && status === 'pending') {
        return (
          <div>
            <h3>{documentType}</h3>
            <p><strong>Document Name:</strong> {name}</p>
            <p><strong>Status:</strong> {status}</p>
          </div>
        );
      }
    
      if (name && status === 'rejected') {
        return (
          <div>
            <h3>{documentType}</h3>
            <p><strong>Document Name:</strong> {name}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Feedback:</strong> {feedback}</p>
          </div>
        );
      }
    
      if (previousDocumentApproved && !name) {
        return (
          <div>
            <h3>{documentType}</h3>
            <input type="file" onChange={handleFileUpload} />
          </div>
        );
      }
  
    return null;
  }