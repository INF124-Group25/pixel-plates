"use client";

import styles from "./page.module.css";
import Image from "next/image";
import Modal from './modal';
import { SetStateAction, useState } from "react";
import { UploadImage } from "@/components/UploadImage";

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
    const name = "JonnieEats";
    const description = "Add your review ...";
    const imageSrc = "/default-user.png";
    const password = "password";

    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
    const [review, setReview] = useState('');
    const [postUrl, setPostUrl] = useState<string>()


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

        alert("Post submitted successfully!");

        // Clear the form
        setSelectedBusiness(null);
        setReview('');

    } catch (error) {
        console.error("Error submitting post:", error);
        alert("Error submitting post. Please try again.");
    }
};



    const uploadPostForm = async (formData: FormData) => {
      // 'use server'
      const rawFormData = {
          // handle form data
      };

      // mutate data
      // revalidate cache
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
                
              <form onSubmit={handleSubmit} className={styles.uploadPostBoxForm}>
              <label htmlFor="upload-image">Upload Images</label>
                <div className={styles.uploadPostBoxFormFirstContainer}>
                  <div className={styles.imageContainer}>
                        <UploadImage onUpload={setPostUrl}/>
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
