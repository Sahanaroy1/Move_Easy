
// seedProperties.js
const mongoose = require('mongoose');
const Property = require('../models/Property');
const createUsers = require('./createUsers');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Move-Easy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedProperties() {
  try {
    // Call createUsers to get the user _id
    const userId = await createUsers();

    // Use the userId to seed the properties
    const properties = [
      {
        bedrooms: 7,
        description: "This well presented and modern two bedroom flat is situated within a superb development, boasting a stunning reception room with doors to a balcony and a fully fitted kitchen.",
        address: "Renaissance, Lewisham, SE13 6QN",
        propertyType: "Detached",
        price: 2900000,
        postcode: "SE13 6QN",
        city: "London",
        propertyUrl: "/property-for-sale/property-59309477.html",
        contactUrl: "/property-for-sale/contactBranch.html?propertyId=59309477",
        propertyTitle: "2 bedroom flat for sale",
        images: [
          "https://media.rightmove.co.uk/194k/193271/148012472/193271_33098828_IMG_00_0000.jpeg",
          "https://media.rightmove.co.uk/194k/193271/148012472/193271_33098828_IMG_01_0000.jpeg",
          "https://media.rightmove.co.uk/194k/193271/148012472/193271_33098828_IMG_04_0000.jpeg",
          "https://media.rightmove.co.uk/194k/193271/148012472/193271_33098828_IMG_67_0000.jpeg"
        ],
        latitude: 51.4708,
        longitude: -0.0186,
        agent: userId // Use the userId obtained from createUsers
      },
      {
        "bedrooms": 3,
        "description": "Situated moments from the River Thames in Old Chelsea, this contemporary three bedroom apartment (117sqm) has just undergone an extensive refurbishment and is now presented in exceptional condition and is beautifully interior designed throughout.",
        "address": "CHEYNE WALK, CHELSEA, SW3 1AA",
        "propertyType": "Semi-Detached",
        "price": 1950000,
        "postcode": "SW3 1AA",
        "city": "London",
        "propertyUrl": "/property-for-sale/property-73864112.html",
        "contactUrl": "/property-for-sale/contactBranch.html?propertyId=73864112",
        "propertyTitle": "3 bedroom flat for sale",
        "images": ["https://media.rightmove.co.uk/52k/51639/86906247/51639_100393025741_IMG_00_0000.jpeg","https://media.rightmove.co.uk/52k/51639/86906247/51639_100393025741_IMG_03_0000.jpeg","https://media.rightmove.co.uk/52k/51639/86906247/51639_100393025741_IMG_06_0000.jpeg","https://media.rightmove.co.uk/52k/51639/86906247/51639_100393025741_IMG_02_0000.jpeg"],
        "latitude": 51.4985,
        "longitude": -0.1768,
      "agent": userId
    
    
      },
      {
        "bedrooms": 5,
        "description": "ABC Estates are pleased to present this 3 bedroom semi detached house For Sale. Located in a popular cul-de-sac close to Sunny Hill Park. The property comprises 2 double and 1 single bedrooms, a large through lounge/diner, fully fitted kitchen, utility room, bathroom with separate WC and shower room...",
        "address": "Chatsworth Close, London, NW10 7QP",
        "propertyType": "Semi-Detached",
        "price": 749950,
        "postcode": "NW10 7QP",
        "city": "London",
        "propertyUrl": "/property-for-sale/property-56463883.html",
        "contactUrl": "/property-for-sale/contactBranch.html?propertyId=56463883",
        "propertyTitle": "3 bedroom semi-detached house for sale",
        "images": ["https://media.rightmove.co.uk/101k/100816/142339853/100816_936_IMG_00_0000.jpeg","https://media.rightmove.co.uk/101k/100816/142339853/100816_936_IMG_35_0008.jpeg","https://media.rightmove.co.uk/101k/100816/142339853/100816_936_IMG_20_0011.jpeg","https://media.rightmove.co.uk/101k/100816/142339853/100816_936_IMG_31_0005.jpeg"],
        "latitude": 51.5408,
        "longitude": -0.2018,
          "agent": userId
    
      },
      {
        "bedrooms": 3,
        "description": "A BRIGHT and SPACIOUS TWO BEDROOM apartment with an OPEN PLAN LIVING/DINING area. The PERFECT space for ENTERTAINING. The MASTER BEDROOM boasts an ENSUITE and UNDERFLOOR HEATING throughout the apartment for the cold days",
        "address": "Eastfields Avenue, London, SW18 1LP",
        "propertyType": "Semi-Detached",
        "price": 755000,
        "postcode": "SW18 1LP",
        "city": "London",
        "propertyUrl": "/property-for-sale/property-61144421.html",
        "contactUrl": "/property-for-sale/contactBranch.html?propertyId=61144421",
        "propertyTitle": "2 bedroom apartment for sale",
        "images": ["https://media.rightmove.co.uk/32k/31385/146507276/31385_JSS170379_IMG_00_0000.jpeg","https://media.rightmove.co.uk/32k/31385/146507276/31385_JSS170379_IMG_06_0000.jpeg","https://media.rightmove.co.uk/32k/31385/146507276/31385_JSS170379_IMG_04_0000.jpeg","https://media.rightmove.co.uk/32k/31385/146507276/31385_JSS170379_IMG_13_0000.jpeg"],
        "latitude": 51.4878,
        "longitude": -0.0000,
          "agent": userId
    
    
      },
      {
        "bedrooms": 4,
        "description": "A stunning one bedroom apartment on the 28th floor offering 575 Sq. Ft of living space with views directly facing Canary Wharf.",
        "address": "The Madison, Marsh Wall, London, E14",
        "propertyType": "Detached",
        "price": 730000,
        "postcode": "E14",
        "city": "London",
        "propertyUrl": "/property-for-sale/property-45877821.html",
        "contactUrl": "/property-for-sale/contactBranch.html?propertyId=45877821",
        "propertyTitle": "1 bedroom apartment for sale",
        "images": ["https://media.rightmove.co.uk/8k/7304/145529087/7304_32948997_IMG_01_0000.jpeg","https://media.rightmove.co.uk/8k/7304/145529087/7304_32948997_IMG_03_0000.jpeg","https://media.rightmove.co.uk/8k/7304/145529087/7304_32948997_IMG_05_0000.jpeg","https://media.rightmove.co.uk/8k/7304/145529087/7304_32948997_IMG_14_0000.jpeg"],
        "latitude": 51.5078,
        "longitude": -0.0000,
         "agent": userId
    
    
      },
      {
        "bedrooms": 4,
        "description": "A stunning two bedroom apartment on the 31st floor offering 814 Sq. Ft of living space with views towards Millwall Dock and the O2 Arena and River Thames.",
        "address": "The Madison, Marsh Wall, London, E14",
        "propertyType": "Detached",
        "price": 987000,
        "postcode": "E14",
        "city": "London",
        "propertyUrl": "/property-for-sale/property-45877824.html",
        "contactUrl": "/property-for-sale/contactBranch.html?propertyId=45877824",
        "propertyTitle": "2 bedroom apartment for sale",
        "images": ["https://media.rightmove.co.uk/238k/237944/149696744/237944_THV_THV_LFSYCL_913_1042337567_IMG_00_0000.jpeg","https://media.rightmove.co.uk/238k/237944/149696744/237944_THV_THV_LFSYCL_913_1042337567_IMG_02_0000.jpeg","https://media.rightmove.co.uk/238k/237944/149696744/237944_THV_THV_LFSYCL_913_1042337567_IMG_05_0000.jpeg","https://media.rightmove.co.uk/238k/237944/149696744/237944_THV_THV_LFSYCL_913_1042337567_IMG_14_0000.jpeg","https://media.rightmove.co.uk/238k/237944/149696744/237944_THV_THV_LFSYCL_913_1042337567_IMG_17_0000.jpeg"],
        "latitude": 51.5078,
        "longitude": -0.00000,
         "agent": userId
    
    
      },
      {
        "bedrooms": 3,
        "description": "A BRIGHT and SPACIOUS THREE BEDROOM apartment with an OPEN PLAN LIVING/DINING area. The PERFECT space for ENTERTAINING and spending time with family and friends. The MASTER BEDROOM boasts an ENSUITE and UNDERFLOOR HEATING throughout the apartment for the cold days.",
        "address": "Eastfields Avenue, London, SW18 1LP",
        "propertyType": "Semi-Detached",
        "price": 870000,
        "postcode": "SW18 1LP",
        "city": "London",
        "propertyUrl": "/property-for-sale/property-644090009.html",
        "contactUrl": "/property-for-sale/contactBranch.html?propertyId=644090009",
        "propertyTitle": "3 bedroom apartment for sale",
        "images": ["https://media.rightmove.co.uk/271k/270707/147748586/270707_BBE-34329276_IMG_00_0000.jpeg","https://media.rightmove.co.uk/271k/270707/147748586/270707_BBE-34329276_IMG_01_0000.jpeg","https://media.rightmove.co.uk/271k/270707/147748586/270707_BBE-34329276_IMG_03_0000.jpeg","https://media.rightmove.co.uk/271k/270707/147748586/270707_BBE-34329276_IMG_21_0000.jpeg","https://media.rightmove.co.uk/271k/270707/147748586/270707_BBE-34329276_IMG_23_0000.jpeg"],
        "latitude": 51.4878,
        "longitude": -0.00000,
         "agent": userId
    
    
      }
      // Add more properties as needed
    ];

    // Insert properties into MongoDB
    const insertedProperties = await Property.insertMany(properties);
    console.log('Properties inserted:', insertedProperties);
  } catch (error) {
    console.error('Error seeding properties:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
}

// Call the function to seed properties when this file is executed
seedProperties();