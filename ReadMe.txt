Asset Import Script
This script automates the process of importing image assets from the ./assets directory into a target 
JavaScript file located in the ./components directory. The primary purpose is to generate import statements 
for each image and append them to the beginning of a specified import file.

Usage
Place your image assets in the ./assets directory. Supported image formats include .jpg, .jpeg, .png, .gif, 
and .svg.

Modify the script if necessary to customize the import file location. By default, the script appends import
 statements to ./components/Test.js. You can change the importIntoFile variable to specify a different file.

Run the script using Node.js:
node script.js

Image Naming Convention
The script follows these rules when generating import variable names from image file names:

Removes hyphens (-) and replaces them with underscores (_).
If the image file name starts with a number, it prepends img_ to ensure a valid variable name.

Example
Suppose you have the following image files in the ./assets directory:

image1.jpg
2nd-image.png
3rd-image.png
The script will generate import statements like this:


import image1 from "../assets/image1.jpg";
import img_2nd_image from "../assets/2nd-image.png";
import img_3rd_image from "../assets/3rd-image.png";


These import statements will be appended to the specified import file.

Customization
You can customize the script further to suit your specific needs. For example, you can change the list of
supported image formats or adjust the import file path.