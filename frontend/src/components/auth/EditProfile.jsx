import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, setError, setLoading, setUser } from '../../redux/slices/authSlice';
import axios from 'axios';
import "../../css/auth/EditProfile.css"
import { CiUser } from 'react-icons/ci';
import Input from '../common/Input';

const EditProfile = ({onClose}) => {

    const dispatch=useDispatch();
    const {user,token,isLoading,error}=useSelector((state)=>state.auth);
    const [name,setName]=useState(user?.name || "");
    const [email,setEmail]=useState(user?.email || "");

    //udate password
    const [currentPassword,setCurrentPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [showPasswordFeild,setShowPasswordFeild]=useState(false);

    const [prevImage,setPrevImage]=useState(user?.avatar || "");
    const [base64Image,setBase64Image]=useState("");

    useEffect(()=>{
        if(user){
            setName(user.name || "");
            setEmail(user.email || "");
            setPrevImage(user.avatar || "");

        }
    },[user])
    

    const handleImageChange =(e)=>{

    const file=e.target.files[0];

    if(!file)
      return;

    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload =()=>{
      setPrevImage(reader.result)
      setBase64Image(reader.result)
    }

  }

  //submit handler

  const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch(clearError());

  const payload = {};

  if (name && name !== user.name) payload.name = name;
  if (email && email !== user.email) payload.email = email;
  if (base64Image) payload.avatar = base64Image;

  if (showPasswordFeild) {
    if (!currentPassword || !newPassword) {
      dispatch(setError("To change password, both fields are required"));
      return;
    }
    payload.currentPassword = currentPassword;
    payload.newPassword = newPassword;
  }

  if (Object.keys(payload).length === 0) {
    dispatch(setError("Please update at least one field"));
    return;
  }

  dispatch(setLoading(true));
  const storedToken = token || localStorage.getItem("token");

  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/auth/profile`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );

    dispatch(setUser({ user: res.data.user, token: storedToken }));
    onClose?.();
  } catch (error) {

    console.log("FULL ERROR:", error);
    console.log("RESPONSE DATA:", error?.response?.data);
    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Profile update failed. Please try again.";
    dispatch(setError(msg));
  } finally {
    dispatch(setLoading(false));
        }
    };


    

  return (
    <div className='editprofile-wrapper'>
        <h3 className="editprofile-title">
            Edit Profile
        </h3>
        <p>Update Your account Details</p>

        <form action="" className='editprofile-form' onSubmit={handleSubmit}>
            {!showPasswordFeild && (
                <>
                  <div className="profile-image-container">
                    {prevImage ? (<img src={prevImage} alt="profile" className='profile-image'></img>) : 
                    (
                        <div className="profile-placeholder">
                            <CiUser size={40}/>
                        </div>
                    )}

                    <label className='image-upload-icon'>
                        📷
                        <input type='file' accept='image/*' hidden onChange={handleImageChange}></input>
                    </label>
                  </div>

                  <Input label={"Name"} type={"text"} placeholder={"update your Name"}
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  />

                  <Input label={"Email"} type={"text"} placeholder={"update your email"}
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  />
                </>
            )}

            {showPasswordFeild && (
                <>
                    <Input label={"current password"} type={"password"} placeholder={"Enter Current Password"}
                    value={currentPassword} onChange={(e)=>{setCurrentPassword(e.target.value)}}/>

                    <Input label={"new password"} type={"password"} placeholder={"Enter new Password"}
                    value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
                </>
            )}

            {error && <div className='editprofile-error'>{error}</div>}

            <button type='button' className='editprofile-password-toggle'
            onClick={()=>setShowPasswordFeild(!showPasswordFeild)}>{showPasswordFeild ? "Cancel Password Chnage" : "Change Password"}
            </button>

            <div className="editprofile-actions">
                <button type='button' className='editprofile-btn-cancel' onClick={onClose}
                disabled={isLoading}>

                    Cancel

                </button>

                <button type='submit' className='editprofile-btn-submit'>
                    {isLoading ? "Saving...." : "Save Changes"}
                </button>
            </div>

        </form>
      
    </div>
  )
}

export default EditProfile
