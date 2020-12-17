import fs from "fs";
import applicationException from "../exceptions/applicationException";
var multer = require('multer')

function create(context) {
    /**
     * loads file - returns string
     * @param {url} file 
     */
    function reader(file) {
        try {
            return fs.readFileSync('public/sites/' + file, 'utf8');
        } catch (error) {
            if (error.code = "ENOENT") {
                throw applicationException.new(
                    applicationException.NOT_FOUND,
                    'No such file or directory: ' + error.path,
                );
            }
            return error;
        }
    }

    /**
     * Updates file
     * @param {string} newContent 
     * @param {url} file 
     */
    function updateFile(newContent, file) {
        try {
            fs.writeFileSync('public/sites/' + file, newContent, 'utf8');
            return "File has been successfully chagned";
        } catch (error) {
            if (error.code = "ENOENT") {
                throw applicationException.new(
                    applicationException.NOT_FOUND,
                    'No such file or directory: ' + error.path,
                );
            }
            return error;
        }
    }

    function uploadHtml(file) {
        const maxSize = 1 * 1000 * 1000;

        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/sites/');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        });

        var upload = multer({
            storage: storage,
            limits: {
                fileSize: maxSize
            }
        });

        return upload.single(file);
    }

    return {
        updateFile,
        reader,
        uploadHtml,
    }
}

export default {
    create,
}