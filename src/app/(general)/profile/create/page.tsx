"use client";

import styles from "./page.module.css";
import Image from "next/image";
import Modal from './modal';
import { SetStateAction, useState } from "react";
import { UploadImage } from "@/components/UploadImage";
import { getPostPicture, uploadPicture } from '@/services/api'


type Business = {
  name: string;
  location: {
      address1: string;
      city: string;
  };
  phone: string;
  rating: number;
  review_count: number;
};


const CreatePost = () => {
    const description = "Add your review ...";
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
    const [review, setReview] = useState('');
    const [postUrl, setPostUrl] = useState<string>()
    const [file, setFile] = useState<File | null>(null);



    const handleOpenModal = () => {
      setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSelectBusiness = (business: any) => {
      setSelectedBusiness(business);
      setModalVisible(false);
    };

    const handleSearch = async () => {
      const apiUrl = `http://localhost:5001/api/test/yelp/${location}?term=${searchQuery}`;
      
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("data: ", data)
        setSearchResults(data.businesses);
        setModalVisible(true); // Open modal with search results
    } catch (error) {
        console.error("Error fetching data from Yelp API:", error);
    }
  };

  const updatePostUrl = async (postId: string, newUrl: string) => {
    try {
      const response = await fetch(`http://localhost:5001/api/test/post/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "post_url": newUrl }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update post URL');
      }
  
      const updatedPost = await response.json();
      return updatedPost;
    } catch (error) {
      console.error(error);
    }
  };

  // we have to fix this
  const onSubmit = async (postId: string) => {
    if (!file) {  
      console.error('no image being provided for post');
      return;
    }

    try {
      // const data = new FormData()
      // data.set('file', file)
      // this will make it immediately upload to s3
      const res = await uploadPicture(file, true, postId);
      if (res && res.key) {
        console.log("here is key: ", res.key);
        return res.key;
      } else {
        console.error('Upload failed', res);
      }
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
  
    if (!selectedBusiness) {
        alert("Please select a business before submitting.");
        return;
    }

    const postData = {
        "businessData": selectedBusiness,
        "review": review,
        "postUrl": postUrl
    };

    try {
        console.log("selectedBusiness: ", postData.businessData)
        console.log("review: ", postData.review)

        const response = await fetch('http://localhost:5001/api/test/create-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
          throw new Error("Error creating post");
        }

        else if(response.ok){
          // grab the postId with current no post_url
          const postResponse = await fetch('http://localhost:5001/api/test/user/erick/post'); // replace with current user
          const postInfo = await postResponse.json();
          const lastPostId = postInfo[0][postInfo[0].length-1].id;

          console.log("whole postInfo: ", postInfo)
          console.log("postInfo id: ", lastPostId);
          // submit to aws the file and update post_url in post table
          if (file) {
            try {
              const newUrl = await onSubmit(lastPostId);
              setPostUrl(newUrl);
              updatePostUrl(lastPostId, newUrl);
            } catch (error) {
              console.error(error);
            }
          }
        }


        // Clear the form
        setSelectedBusiness(null);
        setReview('');

        alert("Post submitted successfully!");
        // console.log("Post submitted successfully!");


    } catch (error) {
        console.error("Error submitting post:", error);
        alert("Error submitting post. Please try again.");
    }
};

const handleFileChange = (file:File) => {
  setFile(file);
};

    return (
            <div className={styles.uploadPostBox}>
              <h3>Create Post</h3>
              <div className={styles.search}>
                <input type="text" 
                    placeholder="Search for business ..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
                <div className={styles.searchLocation}>
                  <input type="text" 
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}  /> 
                  <button onClick={handleSearch}>Search</button>
                </div>
                <div>
                  {selectedBusiness && (
                  <div className={styles.selectedBusiness}>
                    <h4>Selected Business:</h4>
                    <p>{selectedBusiness.name}</p>
                    <p>{selectedBusiness.location.address1}, {selectedBusiness.location.city}</p>
                    <p>{selectedBusiness.phone}</p>
                    <p>Rating: {selectedBusiness.rating}</p>
                    <p>{selectedBusiness.review_count} reviews</p>
                  </div>
                )}
                </div>
                
              <form onSubmit={handleSubmit} className={styles.uploadPostBoxForm}
              >
              <label htmlFor="upload-image">Upload Images</label>
                <div className={styles.uploadPostBoxFormFirstContainer}>
                  <div className={styles.imageContainer}>
                        {/* <UploadImage onUpload={setPostUrl} onFileChange={setFile as React.Dispatch<React.SetStateAction<File | undefined>>}/> */}
                        <UploadImage handleFileChange={handleFileChange}/>
                  </div>
                    <label htmlFor="review">Review</label>
                    <textarea name="review" id="review" cols={30} rows={10} placeholder={description} style={{width: '100%'}}  value={review} onChange={(e) => setReview(e.target.value)}></textarea>
                </div>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </form>
              <Modal
                visible={modalVisible}
                onClose={handleCloseModal}
                businesses={searchResults}
                onSelect={handleSelectBusiness}
              />
            </div>
    );
};

export default CreatePost;
