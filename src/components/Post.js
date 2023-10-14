import { Link } from 'react-router-dom';
import Comments from './Comments';
import styles from '../styles/home.module.css';
import { useState } from 'react';
import { makeComment, toggleLike } from '../api';
import { toast } from 'react-toastify';
import { useAuth, usePosts } from '../hooks';
import TimeDifference from './TimeDifference';
const Post = ({ post }) => {
  const posts = usePosts();
  const auth = useAuth();
  const [comment, setComment] = useState('');
  const [commenting, setCommenting] = useState(false);
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleKeyDow = async (e) => {
    if (e.key === 'Enter') {
      if(!auth.user){
        toast("please log in", {
          type: "error"
        })
        return;
      }
      setCommenting(true);
      setComment('');
      const response = await makeComment(comment, post._id);
      if (response.success) {
        posts.addCommentToPost(post._id, response.data.comment);
        toast('commented successfully', {
          type: 'success',
        });
      } else {
        toast(response.message, {
          type: 'error',
        });
      }
      setCommenting(false);
    }
  };

  const handleLikeButtonClick = async () => {
    if(!auth.user){
      toast("please log in ", {
        type: "error"
      })
      return;
    }
    const response = await toggleLike(post._id, 'Post');
    if(response.success){
      posts.toggleLike(post._id, auth.user._id, response.data.deleted);
      if(response.data.deleted){
        toast("disliked successfully", {
          type: "success"
        })
      }else{
        toast("liked successfully", {
          type: "success"
        })
      }
    }
  }
  return (
    <div className={styles.postsList} key={`post ${post._id}`}>
      <div className={styles.postWrapper}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img src="userProfile.png" alt="user-pic" />
            <div>
              <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>
                {post.user.name}
              </Link>
              <span className={styles.postTime}>{
                <TimeDifference time = {post.createdAt}/>
              }</span>
            </div>
          </div>
          <div className={styles.postContent}>{post.content}</div>

          <div className={styles.postActions}>
            <div className={styles.postLike}>
              <button onClick={handleLikeButtonClick}>
                <img src="like.png" alt="likes-icon" />
              </button>
              <span>{post?.likes?.length}</span>
            </div>

            <div className={styles.postCommentsIcon}>
              <img src="comment.png" alt="comments-icon" />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className={styles.postCommentBox}>
            <input
              placeholder="Start typing a comment"
              value={comment}
              onChange={handleCommentChange}
              onKeyDown={handleKeyDow}
              disabled={commenting}
            />
          </div>

          <Comments comments={post.comments} />
        </div>
      </div>
    </div>
  );
};

export default Post;
