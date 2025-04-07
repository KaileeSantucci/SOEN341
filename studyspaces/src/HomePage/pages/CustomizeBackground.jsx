import React, { useState, useEffect, use } from 'react';
import '../styles/CustomizeBackground.css'; // Make sure you have custom styles for this page

const CustomizeBackground = () => {
  useEffect(() => {
    const savedImage = localStorage.getItem('customBackground'); // Retrieve saved image from local storage
    if (savedImage) {
      setSelectedImage(savedImage); // Set the saved image as the selected image
    
    //immediately apply the background
    const appContainer = document.querySelector('.app-container');
    if(appContainer){
      appContainer.style.backgroundImage = `url(${savedImage})`;
      appContainer.style.backgroundSize = 'cover';
      appContainer.style.backgroundPosition = 'center';
      appContainer.style.backgroundColor = 'transparent';  // Ensure no pink background
    }
  }
  }, []); // Empty useEffect to mimic componentDidMount

  const [selectedImage, setSelectedImage] = useState(null); // Holds the uploaded or selected image

  // Predefined images (you can add more if needed)
  const preexistingImages = [
    { id: 1, src: '/src/HomePage/assets/darkacademia.jpg', label: 'Background 1' },
    { id: 2, src: '/src/HomePage/assets/fourthwing.jpg', label: 'Background 2' },
    { id: 3, src: '/src/HomePage/assets/harrypotter.avif', label: 'Background 3' },
    { id: 4, src: '/src/HomePage/assets/lofi.jpg', label: 'Background 4' },
    { id: 5, src: '/src/HomePage/assets/OracleRacing.jpg', label: 'Background 5' },
    { id: 5, src: '/src/HomePage/assets/PrettyItaly.jpg', label: 'Background 5' },
  ]; 
  
  // Handle image selection (either preexisting or uploaded)
  const handleSelectImage = (imageUrl) => {
    setSelectedImage(imageUrl); // Save the selected image
  };

  // Handle image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file); // Create a URL for the uploaded image
      setSelectedImage(fileURL); // Save the uploaded image
    }
  };

  // Apply selected image as the background to the entire page
  const handleApplyBackground = () => {
    if (selectedImage) {
      // Set the background of the main content area
      const appContainer = document.querySelector('.app-container');
    appContainer.style.backgroundImage = `url(${selectedImage})`;
    appContainer.style.backgroundSize = 'cover';
    appContainer.style.backgroundPosition = 'center';
    appContainer.style.backgroundColor = 'transparent';  // Ensure no pink background

    //SAVING TO LOCAL STORAGE SO THAT SELECTION IS NOT LOST AFTER REFRESHING
    localStorage.setItem('customBackground', selectedImage);

    // Optionally, clear the background in other elements like main content
    const mainContent = document.querySelector('.main-content');
    mainContent.style.backgroundImage = 'non';
    }
  };

  return (
    <div className="customize-background-container">
      <h2>Customize Your Background</h2>

      {/* Section for selecting a preexisting image */}
      <div className="preexisting-images">
        <h3>Select a Preexisting Image</h3><br />
        <div className="image-options">
          {preexistingImages.map((image) => (
            <div
              key={image.id}
              className="image-option"
              style={{ backgroundImage: `url(${image.src})` }}
              onClick={() => handleSelectImage(image.src)}
            >
              <p>{image.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section for uploading a new image */}
      <div className="upload-image">
        <h3>Or Upload Your Own Image</h3> <br />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="upload-input"
        />
      </div>

      {/* Preview of the selected background */}
      {selectedImage && (
        <div
          className="background-preview"
          style={{ backgroundImage: `url(${selectedImage})` }}
        >
          <p>Preview: Your selected background</p>
        </div>
      )}

      {/* Apply background button */}
      <button className="apply-background-btn" onClick={handleApplyBackground}>
        Apply Background
      </button>
    </div>
  );
};

export default CustomizeBackground;
