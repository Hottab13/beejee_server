const multer = require('multer');

//const storage = multer.memoryStorage()
//const upload = multer({ storage: storage })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
const upload = multer({ storage: storage });
//const upload = multer({ dest: 'uploads/' })

module.exports = upload;