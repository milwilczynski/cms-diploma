import fs from "fs";
import applicationException from "../exceptions/applicationException";
const cheerio = require('cheerio');

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
     ** .Example - takes class from html file
     ** #Example - takes id from html file
     ** Example - takes selector from html file
     * @param {string} dom 
     * @param {url} file 
     */
    function getHtmlContent(dom, file) {
        try {
            const data = reader(file);
            const $ = cheerio.load(data);
            const html = $(dom).html();
            if (!html) {
                throw applicationException.new(
                    applicationException.NOT_FOUND,
                    'Provied DOM selector does not exist',
                );
            }
            const site = {
                html: html
            };
            return site;
        } catch (error) {
            return error;
        }
    }

    /**
     * Updates html content
     * @param {string} dom 
     * @param {string} newContent 
     * @param {url} file 
     */
    function updateHtmlContent(dom, newContent, file) {
        try {
            const data = reader(file);
            const $ = cheerio.load(data);
            $(dom).empty();
            $(dom).append(newContent);
            return updateFile($.html(), file)
        } catch (error) {
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
    return {
        getHtmlContent,
        updateHtmlContent
    }
}

export default {
    create,
}