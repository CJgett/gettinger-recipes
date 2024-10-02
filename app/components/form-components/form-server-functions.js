"use server"
import fs from 'fs'
import path from "path"

export async function uploadFileAndGetURL(file, recipeName) {
  if (file.name === 'undefined') {
    return '';
  }
  let indexOfLastPeriod = file.name.lastIndexOf('.');
  let fileName = recipeName + file.name.substring(indexOfLastPeriod);
  let fileToUpload = new File([file], fileName , {type: file.type});
  const arrayBuffer = await fileToUpload.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  console.log("file details in uploadFile function");
  console.log(fileToUpload);
  console.log(recipeName);
  //TODO File path - check to see if this changes with deploy!
  let filePath = 'public/recipe_pics' + '/' + fileName;
  console.log(filePath);

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  await fs.writeFile(filePath, buffer, (err) => {
    if (err) throw err;
    console.log('file saved!');
  });

  return '/recipe_pics/' + fileName;
}
