import fs from "fs"
import path from "path"

/**
 * Take all the files from ./assets/
 * Then import them in ./components/{select name}.js
 * like this :
 * import image1 from "../assets/image1.jpeg" -- import name from "../assets/name.{extenstion}"
 */

// Define the directory where the import file will be located
const componentsDir = "./components"

// Specify the target import file and its full path
const importIntoFile = path.join(componentsDir, "Test.js")

// Read the contents of the './assets' directory
fs.readdir("./assets", (err, files) => {
  // Check for and handle errors during directory reading
  if (err) {
    console.error(err)
    return // Exit the function if there's an error
  }

  // Filter the list of files to include only image files
  const imageFiles = files.filter((file) => {
    // Determine the file's extension and convert it to lowercase
    const extname = path.extname(file).toLowerCase()
    console.log(extname)
    // Check if the extension matches known image formats
    return [".jpg", ".jpeg", ".png", ".gif", ".svg"].includes(extname)
  })

  // Generate import statements for each image file
  const importStatements = imageFiles.map((file) => {
    // Extract the base name of the file without the extension
    const componentName = path.basename(file, path.extname(file))

    // Replace hyphens with underscores
    let sanitizedComponentName = componentName.replace(/-/g, "_")

    // Check if the componentName starts with a number
    if (!isNaN(sanitizedComponentName[0])) {
      sanitizedComponentName = `img_${sanitizedComponentName}`
    }

    // Create an import statement for this asset
    return `import ${sanitizedComponentName} from "../assets/${file}";\n`
  })

  // Combine all import statements into a single string
  const combinedImports = importStatements.join("")

  // Read the existing content of the import file
  fs.readFile(importIntoFile, "utf-8", (err, existingContent) => {
    if (err) {
      console.error(`Error reading ${importIntoFile}: ${err}`)
      return // Exit the function if there's an error reading the file
    }

    // Combine the new import statements with the existing content
    const updatedContent = combinedImports + existingContent

    // Write the updated content back to the import file
    fs.writeFile(importIntoFile, updatedContent, (err) => {
      if (err) {
        console.error(`Error writing to ${importIntoFile}: ${err}`)
      } else {
        console.log(`Imported all assets into ${importIntoFile}`)
      }
    })
  })
})
