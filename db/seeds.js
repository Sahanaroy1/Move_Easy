const { Pool } = require('pg');
const PgSeed = require('pg-seed');

const pool = new Pool({});

const seed = new PgSeed({
  pool,
  schema: 'public',
  pluralizeTableNames: false,
});

const propertiesTable = {
  id: { type: 'serial', increment: true },
  bedrooms: 'integer',
  summary: 'text',
  displayAddress: 'text',
  propertyType: 'text',
  price: 'numeric',
  branchName: 'text',
  propertyUrl: 'text',
  contactUrl: 'text',
  propertyTitle: 'text',
  mainImage: 'text',
};

const propertiesData = [
  {
    id: 73864112,
    bedrooms: 3,
    summary: "Situated moments from the River Thames in Old Chelsea, this contemporary three bedroom apartment (117sqm) has just undergone an extensive refurbishment and is now presented in exceptional condition and is beautifully interior designed throughout.",
    displayAddress: "CHEYNE WALK, CHELSEA, SW3",
    propertyType: "Flat",
    price: 1950000,
    branchName: "M2 Property, London",
    propertyUrl: "/property-for-sale/property-73864112.html",
    contactUrl: "/property-for-sale/contactBranch.html?propertyId=73864112",
    propertyTitle: "3 bedroom flat for sale",
    mainImage: "https://media.rightmove.co.uk/dir/crop/10:9-16:9/34k/33998/73864112/33998_542689_IMG_01_0001_max_476x317.jpg",
  },
  {
    id: 59309477,
    bedrooms: 2,
    summary: "This well presented and modern two bedroom flat is situated within a superb development, boasting a stunning reception room with doors to a balcony and a fully fitted kitchen.",
    displayAddress: "Renaissance, Lewisham, SE13",
    propertyType: "Flat",
    price: 599950,
    branchName: "Foxtons, Blackheath",
    propertyUrl: "/property-for-sale/property-59309477.html",
    contactUrl: "/property-for-sale/contactBranch.html?propertyId=59309477",
    propertyTitle: "2 bedroom flat for sale",
    mainImage: "https://media.rightmove.co.uk/dir/crop/10:9-16:9/76k/75148/59309477/75148_981263_IMG_17_0000_max_476x317.jpg",
  },
  {
    id: 56463883,
    bedrooms: 3,
    summary: "ABC Estates are pleased to present this 3 bedroom semi detached house For Sale. Located in a popular cul-de-sac close to Sunny Hill Park. The property comprises 2 double and 1 single bedrooms, a large through lounge/diner, fully fitted kitchen, utility room, bathroom with separate WC and shower room...",
    displayAddress: "Chatsworth Close, London",
    propertyType: "Semi-Detached",
    price: 749950,
    branchName: "ABC Estates London Limited, Hendon",
    propertyUrl: "/property-for-sale/property-56463883.html",
    contactUrl: "/property-for-sale/contactBranch.html?propertyId=56463883",
    propertyTitle: "3 bedroom semi-detached house for sale",
    mainImage: "https://media.rightmove.co.uk/dir/crop/10:9-16:9/78k/77804/56463883/77804_4199681_IMG_01_0000_max_476x317.jpg"
  },
  {
    id: 61144421,
    bedrooms: 2,
    summary: "A BRIGHT and SPACIOUS TWO BEDROOM apartment with an OPEN PLAN LIVING/DINING area. The PERFECT space for ENTERTAINING. The MASTER BEDROOM boasts an ENSUITE and UNDERFLOOR HEATING throughout the apartment for the cold days",
    displayAddress: "Eastfields Avenue,\r\nLondon,\r\nSW18 1LP",
    propertyType: "Apartment",
    price: 755000,
    branchName: "Frasers Property",
    propertyUrl: "/property-for-sale/property-611444421.html",
    contactUrl: "/property-for-sale/contactBranch.html?propertyId=611444421",
    propertyTitle: "2 bedroom apartment for sale",
    mainImage: "https://media.rightmove.co.uk/dir/crop/10:9-16:9/98k/97688/611444421/97688_5C_507B_IMG_15_0000_max_476x317.jpg"
  },
  {
    id: 45877821,
    bedrooms: 1,
    summary: "A stunning one bedroom apartment on the 28th floor offering 575 Sq. Ft of living space with views directly facing Canary Wharf.",
    displayAddress: "The Madison, Marsh Wall, London, E14",
    propertyType: "Apartment",
    price: 730000,
    branchName: "JLL, Stratford",
    propertyUrl: "/property-for-sale/property-45877821.html",
    contactUrl: "/property-for-sale/contactBranch.html?propertyId=45877821",
    propertyTitle: "1 bedroom apartment for sale",
    mainImage: "https://media.rightmove.co.uk/dir/crop/10:9-16:9/151k/150773/45877821/150773_CTS160276_IMG_14_0001_max_476x317.jpg"
  },
  {
    id: 45877824,
    bedrooms: 2,
    summary: "A stunning two bedroom apartment on the 31st floor offering 814 Sq. Ft of living space with views towards Millwall Dock and the O2 Arena and River Thames.",
    displayAddress: "The Madison, Marsh Wall, London, E14",
    propertyType: "Apartment",
    price: 987000,
    branchName: "JLL, Stratford",
    propertyUrl: "/property-for-sale/property-45877824.html",
    contactUrl: "/property-for-sale/contactBranch.html?propertyId=45877824",
    propertyTitle: "2 bedroom apartment for sale",
    mainImage: "https://media.rightmove.co.uk/dir/crop/10:9-16:9/151k/150773/45877824/150773_CTS160277_IMG_13_0001_max_476x317.jpg"
  },
  {
    id: 64409009,
    bedrooms: 3,
    summary: "A BRIGHT and SPACIOUS THREE BEDROOM apartment with an OPEN PLAN LIVING/DINING area. The PERFECT space for ENTERTAINING and spending time with family and friends. The MASTER BEDROOM boasts an ENSUITE and UNDERFLOOR HEATING throughout the apartment for the cold days.",
    displayAddress: "Eastfields Avenue,\r\nLondon,\r\nSW18 1LP",
    propertyType: "Apartment",
    price: 1400000,
    branchName: "Frasers Property",
    propertyUrl: "/property-for-sale/property-64409009.html",
    contactUrl: "/property-for-sale/contactBranch.html?propertyId=64409009",
    propertyTitle: "3 bedroom apartment for sale",
    mainImage: "https://media.rightmove.co.uk/dir/crop/10:9-16:9/98k/97688/64409009/97688_5C_1102_IMG_09_0000_max_476x317.jpg"
  },
  {
    id: 46943880,
    bedrooms: 5,
    summary: "A stunning detached five bedroom freehold house which is currently divided into two flats and has a great opportunity for further expansion in the loft or back (STPP). Great location and fantastic opportunity to make this property an amazing home or investment property.",
    displayAddress: "Denbigh Road, London, W5",
    propertyType: "Terraced",
    price: 1300000,
    branchName: "Dendrow Ltd , London",
    propertyUrl: "/property-for-sale/property-46943880.html",
    contactUrl: "/property-for-sale/contactBranch.html?propertyId=46943880",
    propertyTitle: "5 bedroom terraced house for sale",
    mainImage: "https://media.rightmove.co.uk/dir/crop/10:9-16:9/81k/80830/46943880/80830_2346858_IMG_01_0004_max_476x317.jpg"
},
];

seed.run({
  tableName: 'properties',
  data: propertiesData,
  columns: propertiesTable,
});