const { getSingleProductDetail } = require('./getSingleProductDetail');
const { getSingleCatProductList } = require('./getSingleCatProductList');
const { connectDB, Product, closeDB } = require('./dbsetup');
const { randomDelay, delay } = require('./delay'); // Use in Case of Requirement because it slow down the data extraction process

// Main Function
async function main() {
  try {
    await connectDB();

    const catID = 17587;
    const startPage = 1;

    const productUrlsWPageInfo = await getSingleCatProductList(catID);
    
    for (let pagenocounter = startPage; pagenocounter <= productUrlsWPageInfo[1].total_pages; pagenocounter++) {
      console.log(`${productUrlsWPageInfo[0].length} Product Found on Page No ${pagenocounter} out of ${productUrlsWPageInfo[1].total_pages}`);
      
      if (!productUrlsWPageInfo[0].length) {
        console.log('No Product Found in this Department...!');
        return;
      }

      const catProductList = await getSingleCatProductList(catID, pagenocounter);
      console.log(catProductList);

      for (const urlKey of catProductList[0]) {
        try {
          const productData = await getSingleProductDetail(urlKey);

          const newProduct = new Product(productData);
          await newProduct.save();
          console.log(`Saved: ${urlKey}`);

          // Optional: Add Some Random Delay (e.g., 1-3 seconds)
          // await randomDelay(500, 2000); 

        } catch (err) {
          if (err.code === 11000 && err.keyPattern?.urlKey) {
            console.log(`Skipped: ${urlKey} (Already exists)`); // Custom message
          } else {
            console.error(`Error processing ${urlKey}:`, err.message);
          }
          // console.error(`Error processing ${urlKey}:`, err.message);

        }
      }

    }


  } catch (mainErr) {

    console.error('Main Error:', mainErr.message);
  } finally {
    // Step 4: Close the DataBase COnnection
    await closeDB();
  }
}

// Execute primary program through main function
main();