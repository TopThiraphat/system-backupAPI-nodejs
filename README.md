# backupAPI-nodejs
- เป็นระบบ backup API จาก Link url 
- ระบบสามารถ backup API ได้ตามช่วงเวลาที่กำหนด เช่น 1 ชม. 
- เมื่อครบวันเวลาที่กำหนด ระบบจะ compressing เป็น .zip ให้อัตโนมัติ เช่น ทุกๆวันที่ 28 ของทุกเดือน
- แสดงผล output ทาง Terminal
- ประโยชน์ของระบบนี้ คือ ค่อยช่วยสำรองข้อมูล link API ทำให้สามารถย้อนดูข้อมูล link ย้อนหลังได้

## Tech Stack in Project 

- **Language**
    - JavaScript(NodeJS) 
- **Libraries** 
    - Compressing 
    - FS 
    - Node-Fetchs


## Get Started
1. install project with npm

```bash
  cd backupAPI-nodejs
  npm install 
  node server.js
```
## Screenshots

ตัวอย่าง : Backup link api

![App Screenshot](./Screenshots/2.jpg)

ตัวอย่าง : Compressing file

![App Screenshot](./Screenshots/3.jpg)

ตัวอย่าง : Output terminal

![App Screenshot](./Screenshots/1.jpg)

## Used By
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/TopThiraphat)

## Support Me
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/R5R0RDJVK)














