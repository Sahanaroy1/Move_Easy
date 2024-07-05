const mongoose = require('mongoose');
const User = require('../models/User');

// Connect to MongoDB


async function createUsers() {
  try {
    // Create a user
    const user = await User.create({
      username: 'Robert Smith',
      email: 'robert.smith@example.com',
      password: 'password1',
      type: 'AGENT'
    });

    console.log('User created:', user);

    // Return the _id of the created user
    return user._id;
  } catch (error) {
    console.error('Error creating user:', error);
  }  
    // Disconnect from MongoDB
  }


// Export the function to use in other files
module.exports = createUsers;
