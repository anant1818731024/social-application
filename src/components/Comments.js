import PropTypes from 'prop-types';
import styles from '../styles/home.module.css';
import TimeDifference from './TimeDifference';
const Comments = ({ comments }) => {
  return (
    <div className={styles.postCommentsList}>
      {comments.map((comment) => {
        return (
          <div
            className={styles.postCommentItem}
            key={`comment ${comment._id}`}
          >
            <div className={styles.postCommentHeader}>
              <span className={styles.postCommentAuthor}>
                {comment?.user?.name}
              </span>
              <span className={styles.postCommentTime}>
                {
                  <TimeDifference time = {comment.createdAt}/>
                }
              </span>
              <span className={styles.postCommentLikes}>
                {comment?.likes?.length}
              </span>
            </div>

            <div className={styles.postCommentContent}>{comment?.content}</div>
          </div>
        );
      })}
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default Comments;
