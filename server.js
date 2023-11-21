const fs = require("fs");
const path = require("path");
const findRemoveSync = require("find-remove");
const fetch = require("node-fetch");
const compressing = require("compressing");

// Link
const baseURL =
  "https://random-data-api.com/api/cannabis/random_cannabis?size=1&is_json=true";

// Name Folder
const directoryLinkForBackup = "link";
const folderDirectory = "./file";
const removeFile = 28;
const timeBackup = 60000;
// 60000 milliseconds = 1 minute
// 600000 milliseconds = 10 minutes
// 3600000 milliseconds = 60 minutes

// Check for directory
console.log(
  "--- Checking for directory " +
    path.join(folderDirectory, directoryLinkForBackup)
);

// Fetch
async function fetchLinkForBackup() {
  /// start backup file
  console.log("Backup Link running ...");
  fs.exists(path.join(folderDirectory, directoryLinkForBackup), (exists) => {
    if (exists) {
      setInterval(async function () {
        await fetch(baseURL)
          .then((response) => response.text())
          .then(async (data) => {
            // custom name file
            let place = "link";
            let dateTime = new Date();
            let dd = String(dateTime.getDate()).padStart(2, "0");
            let mm = String(dateTime.getMonth() + 1).padStart(2, "0"); //January is 0!
            let yyyy = dateTime.getFullYear();
            let h = String(dateTime.getHours()).padStart(2, "0");
            let mins = String(dateTime.getMinutes()).padStart(2, "0");
            let sec = String(dateTime.getSeconds()).padStart(2, "0");
            let removeDate_dd = dd;
            let filename =
              "/" + "DMY" + dd + mm + yyyy + "-" + "HMS" + h + mins + sec;

            // Create File
            try {
              fs.writeFileSync(
                path.join("./file", directoryLinkForBackup) +
                  filename +
                  "-" +
                  place +
                  ".xml",
                data
              );
              let success = filename + "-" + place + ".xml";
              console.log("Success : " + success);
            } catch {
              console.log(`Error writing file ${place}`);
            }

            //remove and zip
            if (removeDate_dd == removeFile) {
              await compressing.zip.compressDir(
                `${folderDirectory}/${place}`,
                `${folderDirectory}/compress/${place}/${
                  "DMY" +
                  dd +
                  mm +
                  yyyy +
                  "-" +
                  "HMS" +
                  h +
                  mins +
                  sec +
                  "-" +
                  place
                }.zip`
              );
              //
              try {
                findRemoveSync(path.join("./file", directoryLinkForBackup), {
                  extensions: ".xml",
                });
                console.log(`Remove ${removeFile} days success !!!`);
              } catch {
                console.log(`Error remove ${removeFile} days`);
              }
            }
          });
      }, timeBackup);
    } else {
      console.log(`Backup ${place} Error folder not created !!!"`);
    }
  });
}

async function fetch_all() {
  await fetchLinkForBackup();
}
fetch_all();
