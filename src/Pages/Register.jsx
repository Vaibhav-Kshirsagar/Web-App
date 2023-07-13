import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "./Firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";
import add from "../imges/addAvatar.png";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
  const [err, setErr] = useState(false);
  const nevigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target.displayName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const file = e.target.elements.file.files[0];

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (file) {
        const storageRef = ref(storage, `${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Handle progress or other snapshot events if needed
          },
          (error) => {
            setErr(true);
            console.error("Error uploading file:", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            //   console.log('Download URL:', downloadURL);
              
            //   // Save metadata or perform further actions with the download URL
            //   saveImageMetadata(filename, downloadURL);
            // });
            await updateProfile(user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(collection(db, "users"), user.uid), {
              uid:user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(collection(db,"userChats"),user.uid),{});
          }
        );
      } else {
        await updateProfile(user, {
          displayName,
        });
        await setDoc(doc(collection(db, "users"), user.uid), {
          displayName,
          email,
        }); 
        await setDoc(doc(collection(db,"userChats"),user.uid),{});
        nevigate("/");
      }

      console.log("Registration successful:", user);
    } catch (error) {
      console.log("Registration error:", error);
      setErr(true);
    } 
  };

  return (
    <>
      <div className="form-container">
        <div className="form-wrap">
          <span className="logo">My Chat</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit}>
            <input type="text" name="displayName" placeholder="Display name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <input type="file" id="file" name="file" />
            <label htmlFor="file">
              <img src={add} alt="" />
              <span>Add an avatar</span>
            </label>
            <button className="btn">Sign up</button>
            {err && <span>Something went wrong</span>}
          </form>
          <p>You already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
      </div>
    </>
  );
};

export default Register;
