import express from 'express';
import path from 'path';

// đường dẫn tới file hiện tại
// const __filename = fileURLToPath(import.meta.url);
// đường dẫn thư mục src
// const __dirname = path.join(__filename, '..', '..');

const configViewEngine = (app) => {
    app.set('views', path.join("./src", 'views'));
    app.set('view engine', 'ejs');
    app.use(express.static(path.join("./src", 'public')))
    // console.log(path.join("./src", 'views'));
};

export default configViewEngine;
