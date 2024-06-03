'use client'

import s from '@/app/(general)/profile/edit/page.module.css';
import { fetchUserProfile, updateUserProfile } from '@/services/api';
import { useContext, useEffect, useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginResponseBody, UpdateUserRequestBody } from '~shared/types';
import { Context } from './UserContext';


const EditProfile = () => {
    const userContext = useContext(Context);
    if(!userContext){
        throw new Error('context should be loaded within a context provider');
    }
    const {user, loading, userToken, setUser, setUserToken, isUserAuthenticated, setupLocalUser} = userContext;

    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState(''); //implement this later
    const handleUsernameChange = (e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleBioChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value);
    // const handleAvatarChange = (e:React.ChangeEvent<HTMLInputElement>) => setAvatar(e.target.value);
    const handleAvatarChange = (e:React.ChangeEvent<HTMLInputElement>) => () => toast.info('Setting profile picture not complete.');

    const notifySuccessProfileEdit = () => toast.success('Profile successfully updated');
    const notifyFailedProfileEdit = () => toast.error('Profile updating failed');
    const notifyIdNotLoaded = () => toast.error('Id is not loaded properly');
    
    const handleEditProfileForm = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(id === ''){
            notifyIdNotLoaded();
            return;
        }
        const profileUpdateFetch = async() => {
            try {
                const newUser:UpdateUserRequestBody = {
                    username: username,
                    email: email, 
                    password: password,
                    bio: bio,
                    profile_image_URL: avatar,
                };
                const newUserResponse = await updateUserProfile(id, newUser);
                console.log('newUserResponse:', newUserResponse);
                setUsername(newUserResponse.username);
                setEmail(newUserResponse.email);
                setBio(newUserResponse.bio || '');
                setAvatar(newUserResponse.profile_image_URL || '');
                localStorage.setItem('user', JSON.stringify(newUserResponse)); //TESTING
                setUser(newUserResponse);
                notifySuccessProfileEdit();
            } catch (error) {
                console.error('Failed updating profile:', error);
                notifyFailedProfileEdit();
            }
        };
        profileUpdateFetch();
    };

    useEffect(()=>{
        const initialProfileFetch = async() => {
            try {
                const data = await fetchUserProfile();
                setId(data.id);
                setUsername(data.username);
                setEmail(data.email);
                setBio(data.bio || '');
                setAvatar(data.profile_image_URL || '');
                setupLocalUser();
            } catch (error) {
                console.error('Failed initializing edit profile:', error);
            }
        };
        initialProfileFetch();
    },[])

    useEffect(()=>{
        if(!user) return;
        setUsername(user.username);
        setEmail(user.email);
        // setAvatar(user.profile_image_URL || '');
        setBio(user.bio || '');
    },[user, userToken]);

    return (
        <form className={s.profileEditBoxForm} onSubmit={handleEditProfileForm}>
            <div className={s.profileEditBoxFormFirstContainer}>
                <div>
                    <label htmlFor="username">Change username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder={username}
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Change password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        name="bio"
                        id="bio"
                        cols={30}
                        rows={10}
                        placeholder={bio}
                        value={bio}
                        onChange={handleBioChange}
                    ></textarea>
                    <input
                        type="text"
                        name="avatar"
                        id="avatar"
                        placeholder={avatar}
                        onChange={handleAvatarChange}
                    />
                </div>
            </div>
            <div>
                <button type="submit">Save</button>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </form>
    );
};

export default EditProfile;