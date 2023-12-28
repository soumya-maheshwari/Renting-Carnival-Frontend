import React, { useState } from 'react';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    photos: ['', '', '', '', '', ''],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handlePhotoChange = (e, index) => {
    const newPhotos = [...product.photos];
    newPhotos[index] = e.target.value;
    setProduct((prevProduct) => ({ ...prevProduct, photos: newPhotos }));
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const newPhotos = [...product.photos];
        newPhotos[index] = reader.result;
        setProduct((prevProduct) => ({ ...prevProduct, photos: newPhotos }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted:', product);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Add Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Product Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="form-input mt-1 block w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="form-textarea mt-1 block w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-600">
              Price:
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="form-input mt-1 block w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-600">
              Stock:
            </label>
            <input
              type="text"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              className="form-input mt-1 block w-full"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="photos" className="block text-sm font-medium text-gray-600">
            Photos (Upload or provide URLs):
          </label>
          {product.photos.map((photo, index) => (
            <div key={index} className="mt-2">
              <input
                type="text"
                value={photo}
                onChange={(e) => handlePhotoChange(e, index)}
                placeholder={`Image URL ${index + 1}`}
                className="form-input mt-1 block w-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)}
                className="mt-2"
              />
            </div>
          ))}
        </div>

        <button type="submit" className="btn-primary w-full p-4 border rounded-lg hover:bg-primary hover:text-white">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;