import { useParams, useHistory } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { useEffect, useState } from 'react';
import { addFriend, getUserProfile, removeFriend } from '../api';
import { toast } from 'react-toastify';
import { Loader } from '../components';
import { useAuth } from '../hooks';
import { checkFriend } from '../utils';


const UserProfile = () => {
  const auth = useAuth();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const [isFriend, setIsFriend] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchUserInfo = async (userId) => {
        const response = await getUserProfile(userId);

        if(response.success){
            setUser(response.data.user);
        }else{
            toast(response.message,{
                type: "error"
            })
            return history.push("/");
        }

        setLoading(false);
    }
    fetchUserInfo(userId);
  },[userId, history])

  useEffect(() => {
    if(auth.user){
        setIsFriend(checkFriend(auth.user, userId));
    }
  },[auth, userId])

  const handleAddFriend = async (userId) => {
    setInProgress(true);
    const response = await addFriend(userId);
    if(response.success){
        auth.updateUserFriends(true, response.data.friendship);
        toast("friend added successfullly", {
            type: "success"
        })
    }else{
        toast(response.message, {
            type: "error"
        })
    }
    setInProgress(false);
  }

  const handleRemoveFriend = async (userId) => {
    setInProgress(true);
    const response = await removeFriend(userId);
    if(response.success){
        auth.updateUserFriends(false, null, userId);
        toast("friend removed successfullly", {
            type: "success"
        })
    }else{
        toast(response.message, {
            type: "error"
        })
    }
    setInProgress(false);
  }

  if(loading){
    return <Loader/>
  }
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://p7.hiclipart.com/preview/312/283/679/avatar-computer-icons-user-profile-business-user-avatar.jpg"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        <>
          {
            !isFriend?
            <button 
                className={`button ${styles.saveBtn}`} 
                onClick = {() => handleAddFriend(userId)}
                disabled = {inProgress}
            >
                {inProgress? "Adding Friend...": "Add Friend"}
            </button>:
            <button 
                className={`button ${styles.saveBtn}`} 
                onClick={() => handleRemoveFriend(userId)}
                disabled = {inProgress}
            >
                {inProgress? "Removing Friend...": "Remove Friend"}
            </button>
          }
        </>
      </div>
    </div>
  );
};

export default UserProfile;
