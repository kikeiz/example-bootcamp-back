const express = require("express");
const router = require("./routes/routes");
const port = 80;
const app = express();
const cookieParser = require('cookie-parser');
const multer = require("multer")
const fs = require('fs');
require('dotenv').config();

// Middlewares: 
app.use(cookieParser());
app.use(express.json());
app.use("/", router);

// Configuración del destino de las imagenes. Ordenado en carpetas por id del usuario.
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      fs.mkdir(`./Images/`, (err) => {
        if (err) { console.error(err);
        } else { console.log('Carpeta creada con éxito'); }
      });
      const destination = `./Images/`
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });
  app.post("/upload", upload.single("file"), (req, res) => {
    // usa req.file.filename para obtener el nombre del archivo subido y devolverlo para insertar la url en la bd de imagenes.
    res.json({
      status: true,
      path: req.file.filename
    });
  });

app.use('/Images', express.static('Images'));
  
app.listen(port, () => console.log(`Server ON: ${port}`));

module.exports = app;