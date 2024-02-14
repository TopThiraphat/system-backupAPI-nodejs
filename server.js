
// ---> CRUD file
const fs = require("fs");
const path = require("path");

// ---> fetch url
const fetch = require("node-fetch");

// ---> folder main
const backup_file_json = "./backup_file_json"
const compressingFile = "./compressing"


// ---> compressing
const compressing = require("compressing");

// ---> set up setInterval time / delete / compressing
const removeFile = 14;
const timeBackup = 18000;
// 18000 milliseconds = 0.30 minute
// 60000 milliseconds = 1 minute
// 600000 milliseconds = 10 minutes
// 3600000 milliseconds = 60 minutes

// ---> set up data
const place = {
  information: {
    place_1: {
      name: "data",
      link_json: "https://csrng.net/csrng/csrng.php?min=0&max=10",
    },
  }
}

// ---> fetch link
async function fetchPlace1() {

  // ---> start backup file
  console.log(`### ---> Backup ${place.information.place_1.name} running ...`);
  setInterval(async function () {

    let dateTime = new Date();
    let dd = String(dateTime.getDate()).padStart(2, "0");
    let mm = String(dateTime.getMonth() + 1).padStart(2, "0"); // ---> January is 0!
    let yyyy = dateTime.getFullYear();
    let h = String(dateTime.getHours()).padStart(2, "0");
    let mins = String(dateTime.getMinutes()).padStart(2, "0");
    let sec = String(dateTime.getSeconds()).padStart(2, "0");

    let removeDate_dd = dd;
    let filenameCreateDate = dd + "-" + mm + "-" + yyyy;
    let filenameCreateTime = h + "-" + mins;

    let pathFilenameDateFolder = `${backup_file_json}/${filenameCreateDate}`
    let pathFilenameTimeFolder = `${backup_file_json}/${filenameCreateDate}/${filenameCreateTime}`

    try {
      // ---> check folder date
      fs.readdirSync(path.join(pathFilenameDateFolder))
      try {
        // ---> check folder time / create folder
        fs.readdirSync(path.join(pathFilenameTimeFolder))
        await manageFilePlace1(filenameCreateDate, filenameCreateTime)
      } catch (error) {
        // ---> check folder time / create folder
        if (removeDate_dd !== removeFile) {
          fs.mkdirSync(path.join(pathFilenameTimeFolder));
          await manageFilePlace1(filenameCreateDate, filenameCreateTime)
        }
      }
    } catch (error) {
      // ---> Check folder date
      if (removeDate_dd !== removeFile) {
        fs.mkdirSync(path.join(pathFilenameDateFolder));
      }
      try {
        // ---> Check folder time
        fs.readdirSync(path.join(pathFilenameTimeFolder))
        await manageFilePlace1(filenameCreateDate, filenameCreateTime)
      } catch (error) {
        if (removeDate_dd !== removeFile) {
          fs.mkdirSync(path.join(pathFilenameTimeFolder));
          await manageFilePlace1(filenameCreateDate, filenameCreateTime)
        }
      }
    }
  }, timeBackup);
};

// ---> manage file
async function manageFilePlace1(filenameCreateDate, filenameCreateTime) {

  // ---> write file and remove
  await fetch(place.information.place_1.link_json)
    .then((response) => response.text())
    .then(async (data) => {

      // ---> set date for create file and create folder
      let dateTime = new Date();
      let dd = String(dateTime.getDate()).padStart(2, "0");
      let mm = String(dateTime.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = dateTime.getFullYear();
      let h = String(dateTime.getHours()).padStart(2, "0");
      let mins = String(dateTime.getMinutes()).padStart(2, "0");
      let sec = String(dateTime.getSeconds()).padStart(2, "0");

      let removeDate_dd = parseInt(dd);
      let filename = "DMY" + dd + mm + yyyy + "-" + "HMS" + h + mins + sec;
      let pathFilenameTimeFolder = `${backup_file_json}/${filenameCreateDate}/${filenameCreateTime}`

      // ---> remove file
      console.log(removeDate_dd)
      console.log(removeFile)


      if (removeDate_dd === removeFile) {
        try {

          if (fs.existsSync(`${backup_file_json}`)) {
            await compressing.zip.compressDir(
              `${backup_file_json}`,
              `./${compressingFile}/${filename}.zip`
            );
          }

          const folders = fs.readdirSync(path.join(backup_file_json));
          for await (let folder of folders) {
            fs.rmSync(path.join(`${backup_file_json}/${folder}`), { recursive: true });
          }

          console.log(`### ---> Remove ${removeFile} days success place ${place.information.place_1.name}.`);
          console.log(`### ---> Remove file and folder success.`);
        } catch (error) {
          console.log(`### ---> Error remove ${removeFile} days place ${place.information.place_1.name}. !!!`);
          console.log(`### ---> ${JSON.stringify(error)}`)
        }
      } else {
        // ---> write file
        try {
          fs.writeFileSync(
            path.join(pathFilenameTimeFolder) +
            "/" + filename +
            "-" +
            place.information.place_1.name +
            ".json",
            data);
          let success = "/" + filename + "-" + place.information.place_1.name + ".json";

          console.log("### ---> Success : " + success);
        } catch (error) {
          console.log(`### ---> Error writing file and folder ${place.information.place_1.name}. !!!`);
          console.log(`### ---> ${JSON.stringify(error)}`)
        }
      }
    });
}

// ---> fetch all
function fetch_all() {
  const checkBackupFileJson = fs.existsSync(path.join(`${backup_file_json}`))
  const checkCompressingFile = fs.existsSync(path.join(`${compressingFile}`))
  try {
    console.log('### ---> Checking Folder ... ');

    // ---> check folder main
    if (checkBackupFileJson === false && checkCompressingFile === false) {
      // ---> create folder main
      fs.mkdirSync(path.join(backup_file_json));
      fs.mkdirSync(path.join(compressingFile));
      console.log(`### ---> Folder ${backup_file_json} created.`);
    } else {
      console.log(`### ---> Folder ${backup_file_json} already exists.`);
    }

    // ---> fetch
    fetchPlace1();

  } catch (error) {
    console.log(`### ---> Error create folder ${place.information.place_1.name}. !!!`);
    console.log(`### ---> ${JSON.stringify(error)}`)

    // ---> fetch
    fetchPlace1();
  }
}

fetch_all();
