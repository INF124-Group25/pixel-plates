/* eslint-disable @next/next/no-img-element */
"use client";
import s from '../app/(general)/profile/edit/page.module.css';
import { updateUserProfile, uploadPicture } from "../services/api"
import { use, useContext, useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateUserRequestBody } from "../../shared/types";
import { Context } from "./UserContext";

import AvatarUpload from "./AvatarUpload";

const EditProfile = () => {
    const userContext = useContext(Context);
    if (!userContext) {
        throw new Error("context should be loaded within a context provider");
    }
    const {
        user,
        loading,
        login, 
        logout,
        updateUser
    } = userContext;

    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");


    const [avatarOutputFile, setAvatarOutputFile] = useState<File | null>(null);


    const uploadProfilePicture = async() => {
        if(id.length === 0){
            console.error('No User');
            return;
        }
        // console.log('uploadprofilepicture:', avatarOutputFile);//TESTING
        // console.log('id:', id);//TESTING
        const json = await uploadPicture(avatarOutputFile, false, id);
        return json;
    };


    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value);
    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setBio(e.target.value);

    const handleFileReady = (file:File) => {
        // setup avatar saving here
        setAvatarOutputFile(file); // fix error
    };

    const notifySuccessProfileEdit = () =>
        toast.success("Profile successfully updated");
    const notifyFailedProfileEdit = () =>
        toast.error("Profile updating failed");
    const notifyIdNotLoaded = () => toast.error("Id is not loaded properly");

    const handleEditProfileForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id === "") {
            notifyIdNotLoaded();
            return;
        }
        const profileUpdateFetch = async () => {
            let key = `profile_picture/default-user.png`;
            try {
                const photoJson = await uploadProfilePicture();
                key = photoJson.key;
                // console.log("response:", photoJson);
                // console.log('key:', key);
            } catch (error) {
                console.error(`Was not able to upload image: ${error}`);
            }
            try {
                const newUser: UpdateUserRequestBody = {
                    username: username,
                    email: email,
                    password: password,
                    bio: bio,
                    profile_image_URL: key || `profile_picture/default-user.png`,
                };
                const newUserResponse = await updateUserProfile(newUser);
                // console.log("newUserResponse:", newUserResponse);
                // restart context
                // logout();
                // login();
                updateUser();
                notifySuccessProfileEdit();
            } catch (error) {
                console.error("Failed updating profile:", error);
                notifyFailedProfileEdit();
            }
        };
        profileUpdateFetch();
    };

    useEffect(() => {
        if (user){
            setId(user.id);
            setUsername(user.username);
            setEmail(user.email);
            setBio(user.bio || "");
        };
    },[user]);

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
                    <AvatarUpload onFileReady={handleFileReady}/>
                </div>
            </div>
            <div>
                <button type="submit">Save</button>
                {/* {avatarOutputFile && <button type="button" onSubmit={uploadProfilePicture}>Save Photo!!!</button>} */}
                
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