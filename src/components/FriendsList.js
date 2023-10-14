import { Link } from 'react-router-dom';

import styles from '../styles/home.module.css';
import { useAuth } from '../hooks';

const FriendsList = () => {
  const auth = useAuth();
  const { friendships = [] } = auth.user;

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>

      {friendships && friendships.length === 0 && (
        <div className={styles.noFriends}>NO friends found!</div>
      )}

      {friendships &&
        friendships.map((friend) => (
          <div key={`friend-${friend.to_user._id}`}>
            <Link className={styles.friendsItem} to={`/user/${friend.to_user._id}`}>
              <div className={styles.friendsImg}>
                <img
                  src="https://p7.hiclipart.com/preview/312/283/679/avatar-computer-icons-user-profile-business-user-avatar.jpg"
                  alt=""
                />
              </div>
              <div className={styles.friendsName}>{friend.to_user.email}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FriendsList;
