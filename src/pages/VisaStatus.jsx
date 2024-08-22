import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUploadedDocumentUrls, selectVisaDocument, selectVisaError, selectVisaLoading } from '../store/visaSlice/visa.selectors'
import { fetchVisaDocument, fetchVisaDocumentUrls, uploadVisaDocument } from '../store/visaSlice/visa.thunks'

export default function VisaStatus() {

  const dispatch = useDispatch()
  const visaDocument = useSelector(selectVisaDocument)
  const uploadedDocumentUrls = useSelector(selectUploadedDocumentUrls)
  const loading = useSelector(selectVisaLoading)
  const error = useSelector(selectVisaError)

  useEffect(() => {
    const userId = 'user-id'
    dispatch(fetchVisaDocument(userId))
    dispatch(fetchVisaDocumentUrls(userId))
  }, [dispatch])

  const handleFileUpload = (documentType,file) => {
    const userId = 'user-id'
    const username = 'some-username'
    dispatch(uploadVisaDocument({ userId, username, documentType, file}))
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  return (
    <div>
      <h1>Visa Status Management</h1>
      {/* Render visa document statuses and upload forms */}
      {/* For example, showing the status of OPT Receipt */}
      {visaDocument && visaDocument.optReceipt.status === 'pending' && (
        <p>Waiting for HR to approve your OPT Receipt</p>
      )}
      {visaDocument && visaDocument.optReceipt.status === 'approved' && (
        <div>
          <p>Please upload a copy of your OPT EAD</p>
          <input
            type="file"
            onChange={(e) => handleFileUpload('optEAD', e.target.files[0])}
          />
        </div>
      )}
      {visaDocument && visaDocument.optReceipt.status === 'rejected' && (
        <p>HR Feedback: {visaDocument.optReceipt.feedback}</p>
      )}
      {/* Repeat similar logic for other document types */}
    </div>
  )
}
