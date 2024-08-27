import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  addComment,
  updateComment,
  selectCommentsByReportId,
} from "../../store";
import PropTypes from "prop-types";
import { Button, List, Paper, TextField, Typography } from "@mui/material";

const Comments = ({ reportId, currentUserId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectCommentsByReportId(reportId));
  const [commentText, setCommentText] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);

  useEffect(() => {
    // Fetch comments for the specific report
    dispatch(fetchComments(reportId));
  }, [dispatch, reportId]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      if (editCommentId) {
        // Update existing comment
        dispatch(
          updateComment({
            commentId: editCommentId,
            updatedComment: commentText,
          })
        )
          .unwrap()
          .then(() => {
            setEditCommentId(null);
            setCommentText("");
            dispatch(fetchComments(reportId));
          });
      } else {
        // Add new comment
        dispatch(addComment({ reportId, comment: commentText }))
          .unwrap()
          .then(() => {
            setCommentText("");
            dispatch(fetchComments(reportId));
          });
      }
    }
  };

  const handleEditComment = (commentId, currentText) => {
    setEditCommentId(commentId);
    setCommentText(currentText);
  };

  return (
    <div className="comments-section">
      <Typography variant="h3">Comments</Typography>
      <List>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Paper
              key={comment._id || comment.description}
              sx={{ display: "block" }}
            >
              <p>{comment.description}</p>
              <p>
                <strong>By:</strong>{" "}
                {comment.createdBy
                  ? `${comment.createdBy.firstName} ${comment.createdBy.lastName}`
                  : "Unknown"}
              </p>
              <p>
                <strong>At:</strong>{" "}
                {new Date(comment.timestamp).toLocaleString()}
              </p>

              {/* {comment.createdBy && comment.createdBy === currentUserId && ( */}
              <Button
                onClick={() =>
                  handleEditComment(comment._id, comment.description)
                }
              >
                Edit
              </Button>
              {/* )} */}
            </Paper>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </List>
      <form onSubmit={handleAddComment}>
        <TextField
          multiline
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <br />
        <Button type="submit">
          {editCommentId ? "Update Comment" : "Submit Comment"}
        </Button>
      </form>
    </div>
  );
};

Comments.propTypes = {
  reportId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired, // Pass the current user's ID
};

export default Comments;
