import React from 'react';
import { useState } from 'react';
import { writeUserData } from '../auth/firebaseAuth';

export default function NewProduct() {
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    price: '',
    category: '',
    description: '',
    options: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImage(imageUrl);
      uploadFile(selectedImage);
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      setIsUploading(true);
      await writeUserData(formData).then(() => {
        setSuccess('성공적으로 제품이 추가되었습니다.');
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      });
      console.log('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setIsUploading(false);
    }
  };

  function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/dhjfhgkkg/upload`;
    const fd = new FormData();
    const unsignedUploadPreset = 'ic9i0qm6';

    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload');
    fd.append('file', file);

    fetch(url, {
      method: 'POST',
      body: fd,
    })
      .then((response) => response.json())
      .then((data) => {
        const url = data.secure_url;
        const img = new Image();
        img.src = url;
        img.alt = data.public_id;
        img.className = 'max-w-full h-auto rounded-md';
        document.getElementById('preview').innerHTML = '';
        document.getElementById('preview').appendChild(img);
        setFormData({ ...formData, image: url });
      })
      .catch((error) => {
        console.error('Error uploading the file:', error);
      });
  }

  return (
    <div className="max-w-lg mx-auto my-10 text-center">
      <h1 className="text-2xl font-bold mb-6">새로운 제품 등록</h1>
      {success && <p>✅ {success}</p>}
      {image && (
        <div className="mb-4" id="preview">
          {/* preview 이미지가 여기에 추가됨 */}
          {/* <img src={image} alt="미리보기" className="max-w-full h-auto rounded-md" /> */}
        </div>
      )}
      <form action="/submit-form" method="post" onSubmit={submitData}>
        <div className="mb-4">
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            className="mt-1 p-2 border rounded-md w-full"
            onChange={handleImageChange}
          />
        </div>
        <input type="text" name="title" placeholder="title" className="mb-4 p-2 border rounded-md w-full" onChange={handleInputChange} />
        <input type="text" name="price" placeholder="price" className="mb-4 p-2 border rounded-md w-full" onChange={handleInputChange} />
        <input type="text" name="category" placeholder="category" className="mb-4 p-2 border rounded-md w-full" onChange={handleInputChange} />
        <input type="text" name="description" placeholder="description" className="mb-4 p-2 border rounded-md w-full" onChange={handleInputChange} />
        <input type="text" name="options" placeholder="options" className="mb-4 p-2 border rounded-md w-full" onChange={handleInputChange} />
        <button className="bg-brand text-white w-full p-2 rounded-md hover:bg-blue-700" type="submit" onClick={submitData} disabled={isUploading}>
          {isUploading ? '업로드중...' : '제품 등록하기'}
        </button>
      </form>
    </div>
  );
}
