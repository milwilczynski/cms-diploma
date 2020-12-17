import utility from "./../utility/utility.container";
const cheerio = require('cheerio');
import models, {
  sequelize
} from '../models/index';
import {
  ValidationError,
  Op
} from "sequelize";

function create(context) {
    /**
     ** .Example - takes class from html file
     ** #Example - takes id from html file
     ** Example - takes selector from html file
     * @param {string} dom 
     * @param {url} file 
     */
    async function getHtmlContent(dom, file) {
        try {
            const data = await utility().getFileUtility().reader(file);
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
    async function updateHtmlContent(dom, newContent, file) {
        try {
            const data = await utility().getFileUtility().reader(file);
            const $ = cheerio.load(data);
            $(dom).empty();
            $(dom).append(newContent);
            const result = await utility().getFileUtility().updateFile($.html(), file)
            return result;
        } catch (error) {
            return error;
        }
    }

    /**
     * adds site to database
     * @param {*} request 
     */
    async function addSite(request) {
        const transaction = await sequelize.transaction();
        try {
            const site = await models.site.create({
                roleId: 1,
                name: request.file.filename,
                url: request.file.path
            }, {
                transaction
            });
            await transaction.commit()
            return "Success";
        } catch (error) {
            await transaction.rollback();
            return error;
        }
    }

    return {
        updateHtmlContent,
        getHtmlContent,
        addSite
    };
}

export default {
    create,
};