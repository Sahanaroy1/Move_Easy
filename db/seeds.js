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

}
];

seed.run({
  tableName: 'properties',
  data: propertiesData,
  columns: propertiesTable,
});