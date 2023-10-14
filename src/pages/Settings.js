import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingForm, setSavingForm] = useState(false);

  useEffect(() => {
    setName(auth.user?.name);
  },[auth])

  const validateInputs = () => {
    if(!name || !password || !confirmPassword){
      toast("all fields are required", {
        type: "error"
      })
      return false;
    }

    if(password !== confirmPassword){
      toast("password and confirm password do not match", {
        type: "error"
      })
      return false;
    }

    return true;
  }

  const handleProfileChange = async () => {
    setSavingForm(true);

    const validated = validateInputs();
    if(!validated){
      return setSavingForm(false);
    }

    const response = await auth.updateProfile(auth.user?._id, name, password, confirmPassword);
    if(response.success){
      toast("user profile updated successfully", {
        type: "success"
      })
      setEditMode(false);
    }else{
      toast(response.message, {
        type: "error"
      })
    }

    setSavingForm(false);
  }
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="myProfile.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {!editMode ? <div className={styles.fieldValue}>{auth.user?.name}</div>:
        <input type="text" value = {name} onChange={(e) => setName(e.target.value)} />}
      </div>

      {
        editMode && <div className={styles.field}>
        <div className={styles.fieldLabel}>Password</div>
        <input type="password" value = {password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      }

      {editMode && <div className={styles.field}>
        <div className={styles.fieldLabel}>Confirm Password</div>
        <input type="password" value = {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>}

      <div className={styles.btnGrp}>
        {editMode ? 
        <>
          <button className={`button ${styles.saveBtn}`} onClick = {handleProfileChange} disabled={savingForm}>
            {savingForm? "Saving profile...": "Save Profile"}
          </button>
          <button className={`button ${styles.goBack}`} onClick = {() => setEditMode(false)}>Go Back</button>
        </>
        :
        <button className={`button ${styles.editBtn}`} onClick = {() => setEditMode(true)}>Edit Profile</button>}
      </div>
    </div>
  );
};

export default Settings;
