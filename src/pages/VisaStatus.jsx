import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVisaDocument,
  selectVisaDocument,
  selectVisaError,
  selectVisaLoading,
  uploadVisaDocument,
} from "../store";
import DocumentStatus from "../components/DocumentStatus";
import { Typography } from "@mui/material";

export default function VisaStatus() {
  const dispatch = useDispatch();
  const visaDocument = useSelector(selectVisaDocument);
  const loading = useSelector(selectVisaLoading);
  const error = useSelector(selectVisaError);

  // useEffect(() => {
  //   dispatch(fetchVisaDocument())
  // }, [dispatch])

  const handleUpload = (documentType) => (file) => {
    dispatch(uploadVisaDocument({ documentType, file })).then(() => {
      dispatch(fetchVisaDocument());
    });
  };

  if (loading) {
    return (
      <Typography variant="h2" m={4}>
        Loading...
      </Typography>
    );
  }
  if (error) {
    return (
      <Typography variant="h2" m={4}>
        Error: {error}
      </Typography>
    );
  }
  if (!visaDocument) {
    return (
      <Typography variant="h2" m={4}>
        No Visa Document available
      </Typography>
    );
  }
  return (
    <div>
      <Typography variant="h2" m={4}>
        Visa Status Management
      </Typography>

      <DocumentStatus
        documentType="OPT Receipt"
        name={visaDocument.optReceipt.name}
        status={visaDocument.optReceipt.status}
        feedback={visaDocument.optReceipt.feedback}
      />
      <DocumentStatus
        documentType="OPT EAD"
        name={visaDocument.optEAD.name}
        status={visaDocument.optEAD.status}
        feedback={visaDocument.optEAD.feedback}
        previousDocumentApproved={visaDocument.optReceipt.status === "approved"}
        onUpload={handleUpload("optEAD")}
      />
      <DocumentStatus
        documentType="I-983"
        name={visaDocument.i983.name}
        status={visaDocument.i983.status}
        feedback={visaDocument.i983.feedback}
        previousDocumentApproved={visaDocument.optEAD.status === "approved"}
        onUpload={handleUpload("i983")}
      />
      <DocumentStatus
        documentType="I-20"
        name={visaDocument.i20.name}
        status={visaDocument.i20.status}
        feedback={visaDocument.i20.feedback}
        previousDocumentApproved={visaDocument.i983.status === "approved"}
        onUpload={handleUpload("i20")}
      />
    </div>
  );
}
