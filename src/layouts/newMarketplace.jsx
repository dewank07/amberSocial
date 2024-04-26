"use client";

import React from "react";
import Sidebar from "@/components/main/Sidebar";
import Post from "@/components/main/Post";

const ProductSearchCard = ({
  productName,
  amount,
  description,
  sellerImage,
  sellerName,
  location,
  productImage,
}) => {
  return (
    <div style={styles.searchCard}>
      <div style={styles.sellerInfo}>
        <img src={sellerImage} alt='Seller' style={styles.sellerImage} />
        <div style={styles.sellerDetails}>
          <p style={styles.sellerName}>{sellerName}</p>
          <p style={styles.sellerLocation}>{location}</p>
        </div>
      </div>
      <img src={productImage} alt='Product' style={styles.productImage} />
      <div style={styles.cardContent}>
        <h3>{productName}</h3>
        <p>
          <strong>Amount:</strong> {amount}
        </p>
        <p>
          <strong>Description:</strong> {description}
        </p>
      </div>
    </div>
  );
};

const NewMarketplace = () => {
  const handleSellProduct = () => {
    console.log("Selling a product");
  };

  const handleLookForProduct = () => {
    console.log("Looking for a product");
  };
  const handleSearchProduct = () => {
    console.log("Searching for a product");
  };

  const products = [
    {
      productName: "Chair",
      amount: "$50",
      description: "Comfortable chair for home or office use.",
      sellerImage:
        "https://cdn.pixabay.com/photo/2016/12/09/09/52/girl-1894125_1280.jpg",
      location: "San Jose, USA",
      productImage:
        "https://cdn.pixabay.com/photo/2020/11/09/17/07/chair-5727263_1280.jpg",
      sellerName: "Bhuvan",
    },
    {
      productName: "Bed",
      amount: "$200",
      description: "Queen-sized bed with a sturdy wooden frame.",
      sellerImage:
        "https://cdn.pixabay.com/photo/2016/12/09/09/52/girl-1894125_1280.jpg",
      location: "San Jose, USA",
      productImage:
        "https://cdn.pixabay.com/photo/2016/11/19/13/06/bed-1839183_1280.jpg",
      sellerName: "Yuvraj",
    },
    {
      productName: "Sofa",
      amount: "$150",
      description:
        "Modern sofa with adjustable recliner and built-in cup holders.",
      sellerImage:
        "https://cdn.pixabay.com/photo/2016/12/09/09/52/girl-1894125_1280.jpg",
      location: "Chicago, USA",
      productImage:
        "https://cdn.pixabay.com/photo/2018/01/20/09/42/sofa-3094153_1280.jpg",
      sellerName: "Omkar",
    },
    {
      productName: "Iphone",
      amount: "$350",
      description:
        "Iphone 15 , in latest condition, bought 3 months ago only .",
      sellerImage:
        "https://cdn.pixabay.com/photo/2016/12/09/09/52/girl-1894125_1280.jpg",
      location: "Boston, USA",
      productImage:
        "https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_1280.jpg",
      sellerName: "Dewank",
    },
    {
      productName: "Laptop",
      amount: "$450",
      description: "Mac Book for the Devloper in you , in great condition",
      sellerImage:
        "https://cdn.pixabay.com/photo/2016/12/09/09/52/girl-1894125_1280.jpg",
      location: "London, UK",
      productImage:
        "https://cdn.pixabay.com/photo/2016/11/18/21/37/laptop-1836990_1280.jpg",
      sellerName: "Sameer",
    },
    {
      productName: "Chair",
      amount: "$100",
      description: "COmfortable chair for your back and movie entertainment",
      sellerImage:
        "https://cdn.pixabay.com/photo/2016/12/09/09/52/girl-1894125_1280.jpg",
      location: "Lucknow, IN",
      productImage:
        "https://cdn.pixabay.com/photo/2016/11/21/12/59/couch-1845270_1280.jpg",
      sellerName: "Ram",
    },
    {
      productName: "Bed",
      amount: "$150",
      description: "King size bed for you and your family",
      sellerImage:
        "https://cdn.pixabay.com/photo/2016/12/09/09/52/girl-1894125_1280.jpg",
      location: "London, UK",
      productImage:
        "https://cdn.pixabay.com/photo/2020/10/11/16/07/bedroom-5646321_1280.jpg",
      sellerName: "Laxman",
    },
    {
      productName: "Sofa",
      amount: "$150",
      description:
        "Modern sofa with adjustable recliner and built-in cup holders.",
      sellerImage:
        "https://cdn.pixabay.com/photo/2016/12/09/09/52/girl-1894125_1280.jpg",
      location: "Mumbai, IN",
      productImage:
        "https://cdn.pixabay.com/photo/2016/04/03/01/24/be-1303912_1280.jpg",
      sellerName: "Bharat",
    },
    {
        productName: "Wardrobe",
        amount: "$250",
        description:
          "New wardrobe , in a very good condition.",
        sellerImage:
          "https://cdn.pixabay.com/photo/2016/12/09/09/52/girl-1894125_1280.jpg",
        location: "Delhi, IN",
        productImage:
          "https://cdn.pixabay.com/photo/2023/12/20/13/30/wardrobe-8459898_1280.jpg",
        sellerName: "Shyam",
      },

    // Add more products as needed
  ];

  return (
    <div className='mainContainer'>
      <Sidebar />
      <div style={styles.mainContent}>
        <div style={styles.buttonContainer}>
          <button onClick={handleSellProduct} style={styles.button} className='bg-primary'>
            Sell a Product
          </button>
        </div>

        <div style={styles.productSection}>
          <h3 style={styles.productSectionHeading}>
            Commonly Searched Products
          </h3>
          <div style={styles.productGrid}>
            <div style={styles.productItem}>
              <a href='/chair'>
                <img
                  src='https://cdn.pixabay.com/photo/2020/11/09/17/07/chair-5727263_1280.jpg'
                  alt='Chair'
                  style={styles.productImage}
                />
              </a>
              <p style={styles.productName}>Chair</p>
            </div>
            <div style={styles.productItem}>
              <a href='/bed'>
                <img
                  src='https://cdn.pixabay.com/photo/2020/11/24/11/36/bedroom-5772286_1280.jpg'
                  alt='Bed'
                  style={styles.productImage}
                />
              </a>
              <p style={styles.productName}>Bed</p>
            </div>
            <div style={styles.productItem}>
              <a href='/sofa'>
                <img
                  src='https://cdn.pixabay.com/photo/2017/08/02/01/01/living-room-2569325_1280.jpg'
                  alt='Sofa'
                  style={styles.productImage}
                />
              </a>
              <p style={styles.productName}>Sofa</p>
            </div>
            <div style={styles.productItem}>
              <a href='/electronics'>
                <img
                  src='https://cdn.pixabay.com/photo/2016/11/29/06/18/apple-1867762_1280.jpg'
                  alt='Electronics'
                  style={styles.productImage}
                />
              </a>
              <p style={styles.productName}>Electronics</p>
            </div>
            <div style={styles.productItem}>
              <a href='/appliances'>
                <img
                  src='https://cdn.pixabay.com/photo/2015/09/20/14/09/kitchen-948363_1280.jpg'
                  alt='Home Appliances'
                  style={styles.productImage}
                />
              </a>
              <p style={styles.productName}>Appliances</p>
            </div>
            <div style={styles.productItem}>
              <a href='/wardrobe'>
                <img
                  src='https://cdn.pixabay.com/photo/2021/02/02/16/19/wardrobe-5974515_1280.jpg'
                  alt='Wardrobe'
                  style={styles.productImage}
                />
              </a>
              <p style={styles.productName}>Wardrobe</p>
            </div>
          </div>
        </div>
        <div style={styles.productSearch}>
          <h3 style={styles.productSectionHeading}>Available Products</h3>
          <div style={styles.productGrid2}>
            {products.map((product, index) => (
              <ProductSearchCard
                key={index}
                productName={product.productName}
                amount={product.amount}
                description={product.description}
                sellerImage={product.sellerImage}
                sellerName={product.sellerName}
                location={product.location}
                productImage={product.productImage} // Add productImage property to your products
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    margin: "0 auto",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
  },
  heading: {
    color: "red",
    marginBottom: "20px",
    textAlign: "center", // Align heading in the center
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  button: {
    color: "white",
    padding: "15px 30px",
    borderRadius: "30px",
    border: "none",
    marginRight: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "darkred",
  },
  productSection: {
    marginTop: "40px",
    textAlign: "center", // Align product section in the center
  },
  productSectionHeading: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gridGap: "20px",
  },
  productGrid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridGap: "20px",
  },
  productItem: {
    textAlign: "center",
    transition: "transform 0.3s ease",
    position: "relative", // Set position to relative
  },
  productImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "10px",
    transition: "transform 0.3s ease",
  },
  productName: {
    fontSize: "14px",
    position: "absolute", // Set position to absolute
    bottom: "10px", // Position the text at the bottom
    left: "50%", // Center the text horizontally
    transform: "translateX(-50%)", // Center the text horizontally
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Add background color with opacity
    padding: "5px 10px", // Add padding to the text
    borderRadius: "5px", // Add border radius to the text
  },
  searchCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    // alignItems: 'center',
    marginBottom: "20px",
  },
  productDetails: {
    flex: "1", // Allow the details to expand
  },
  sellerInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  searchResultsContainer: {
    maxHeight: "300px", // Set maximum height for scrollable area
    overflowY: "auto", // Enable vertical scrolling
    padding: "0 20px", // Add padding to the container
  },
  sellerImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  sellerDetails: {
    display: "flex",
    flexDirection: "column",
  },
  sellerName: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  sellerLocation: {
    fontSize: "14px",
    color: "#666",
  },
  cardContent: {
    fontSize: "14px",
  },
};

styles.productItem[":hover"] = {
  transform: "scale(1.1)",
};
styles.productImage[":hover"] = {
  transform: "scale(1.1)",
};

export default NewMarketplace;
