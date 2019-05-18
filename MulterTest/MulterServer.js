const express = require('express');
const multer = require('multer');
const path = require("path");
const fs = require("fs");
const PORT = 3000;
const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/', upload.single('file-to-upload'), (req, res) => {
  // res.redirect('/');
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, "./uploads/" + req.file.originalname);
  console.log(req.file.originalname);
  if( (path.extname(req.file.originalname).toLowerCase() === ".png") ||
    (path.extname(req.file.originalname).toLowerCase() === ".jpeg")  )
  {
    fs.rename(tempPath, targetPath, err => {
      if (err) return handleError(err, res);

      res
        .status(200)
        .contentType("text/plain")
        .end("File uploaded!");
    });
  } else {
    fs.unlink(tempPath, err => {
      if (err) return handleError(err, res);

      res
        .status(403)
        .contentType("text/plain")
        .end("Only .png or jpeg files are allowed!");
    });
  }
}
);




// app.listen(3000);

app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
  
