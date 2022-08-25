// @ts-check

// console.log(import.meta.url); // 取得本檔案完整路徑
// // file:///C:/Users/asus/Documents/%E5%BE%8C%E7%AB%AF/graphql%20upload/config/UPLOAD_DIRECTORY_URL.mjs

// console.log(new URL("../uploads/", import.meta.url)); // 取得上一層的uploads完整路徑

export default new URL("../uploads/", import.meta.url);
