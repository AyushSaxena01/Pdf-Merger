const express = require('express');
const path = require('path');
const app = express();
const multer=require("multer");
const upload=multer({dest:'uploads/'});
const {mergePdf}=require('./merge');
const port = 3000

 app.use('/static',express.static("public"));
// app.use(express.static("public"));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})
app.post('/merge', upload.array('pdfs', 3), async  (req, res, next) =>{
    console.log(req.files)
   let d=await mergePdf(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path));
      res.redirect(`http://localhost:3000/static/${d}.pdf`);

    // res.redirect(`http://localhost:3000/${d}.pdf`);


    // res.send({data:req.files})
    // req.files is array of `pdfs` files
    // req.body will contain the text fields, if there were any
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost: ${port}`)
})