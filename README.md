# Jomashop Product Scraper 🛍️

![Node.js](https://img.shields.io/badge/Node.js-18.x-green) 
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-brightgreen) 
![Web Scraping](https://img.shields.io/badge/Web--Scraping-blue)

A professional-grade Node.js solution for scraping and storing product data from [Jomashop.com](https://www.jomashop.com) with MongoDB integration.

---

## Features ✨

- **Pagination Support**: Automatically handles multi-page categories  
- **Rich Product Data**: Extracts pricing, images, descriptions, and metadata  
- **Anti-Detection Mechanisms**: Randomized delays & user-agent rotation  
- **Data Integrity**: MongoDB schema validation and duplicate prevention  
- **Error Resilience**: Comprehensive error handling and retry logic  

---

## Installation 💻

```bash
git clone https://github.com/NomanSiddiqui0000/JomaShop-API-Based-Data-Extraction-Pipeline
cd JomaShop Data Extraction Using API
npm install
```

---

## Configuration ⚙️

Start MongoDB locally:

```bash
mongod --dbpath=./data/db
```

Modify MongoDB connection in `dbsetup.js` if needed:

```javascript
await mongoose.connect('mongodb://127.0.0.1:27017/jomashop');
```

---

## Usage 🚀

```bash
node index.js
```

---

## Core Components 🧩

| File                         | Description                                           |
|------------------------------|-------------------------------------------------------|
| `index.js`                   | Main orchestration script                             |
| `dbsetup.js`                 | MongoDB connection & schema definitions               |
| `getSingleProductDetail.js`  | Extracts detailed product information                 |
| `getSingleCatProductList.js` | Handles category pagination and product lists         |
| `delay.js`                   | Request throttling utilities                          |

---

## Data Model 📊

```javascript
{
  id: Number,
  name: String,
  brandName: String,
  urlKey: String, // Unique identifier
  stockStatus: String,
  pricing: {
    regularPrice: { value: Number, currency: String },
    finalPrice: { value: Number, currency: String },
    retailPrice: { value: Number, currency: String }
  },
  productImages: [String],
  description: {
    short: String,
    complete: String
  },
  metaData: {
    metaTitle: String,
    metaKeywords: [String],
    metaDescription: String
  }
}
```

---

## Dependencies 📦

```json
{
  "axios": "^1.7.9",
  "mongoose": "^8.9.6"
}
```

---

## Best Practices 🔐

- ⏳ Random delays between 500–2000ms (enable in `index.js`)  
- 🔄 User-agent rotation for request diversity  
- 🛡️ Respects website’s `robots.txt` guidelines  
- 🚦 Rate limiting to prevent server overload  

---

## Disclaimer ⚠️

This project demonstrates web scraping concepts for **educational purposes only**. Always:

- ✅ Verify website terms of service  
- ✅ Use official APIs when available  
- ✅ Respect copyright and data  
- ✅ Limit request frequency to reasonable levels  

---

## License 📜

**MIT License**

---

For optimal results, ensure:

1. A valid `package.json` with listed dependencies  
2. MongoDB is running locally (or update the connection string)  
3. Your repo follows the structure described above  
