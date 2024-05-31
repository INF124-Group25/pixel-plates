#!/bin/bash

# Run npm install in the current directory
echo "Running npm install in the main directory..."
npm install

# Check if the backend directory exists
if [ -d "backend" ]; then
  # Change to the backend directory
  cd backend
  echo "Running npm install in the backend directory..."
  npm install
  # Go back to the main directory
  cd ..
else
  echo "The 'backend' directory does not exist."
fi

echo "Done."
