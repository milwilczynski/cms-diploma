import utility from './../utility/utility.container';
const cheerio = require('cheerio');
import models, { sequelize } from '../models/index';
import { ValidationError, Op } from 'sequelize';
import applicationMessage from '../resources/applicationMessage';
import applicationException from '../exceptions/applicationException';
import { response } from 'express';

function create(context) {
  /**
   ** .Example - takes class from html file
   ** #Example - takes id from html file
   ** Example - takes selector from html file
   * @param {string} dom
   * @param {url} file
   */
  async function getHtmlContent(dom, url) {
    try {
      const site = await models.site.findOne({
        where: {
          url: url,
        },
      });
      if (site == null) {
        throw applicationException.new(
          applicationException.NOT_FOUND,
          'Provied file not found',
        );
      }
      const data = await utility().getFileUtility().reader(site.url);
      const $ = cheerio.load(data);
      const html = $(dom).html();
      if (!html) {
        throw applicationException.new(
          applicationException.NOT_FOUND,
          'Provied DOM selector does not exist',
        );
      }
      const template = {
        html: html,
      };
      return template;
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
  async function updateHtmlContent(dom, newContent, url) {
    try {
      const site = await models.site.findOne({
        where: {
          url: url,
        },
      });
      if (site == null) {
        throw applicationException.new(
          applicationException.NOT_FOUND,
          'Provied file not found',
        );
      }
      const data = await utility().getFileUtility().reader(site.url);
      const $ = cheerio.load(data);
      $(dom).empty();
      $(dom).append(newContent);
      const result = await utility()
        .getFileUtility()
        .updateFile($.html(), site.url);
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
      await models.site.create(
        {
          roleId: 1,
          name: request.file.filename,
          url: request.file.path,
          title: request.body.title,
        },
        {
          transaction,
        },
      );
      await transaction.commit();
      return applicationMessage.new(
        applicationMessage.CREATED,
        'Page has been added',
      );
    } catch (error) {
      await transaction.rollback();
      return error;
    }
  }

  /**
   * deletes site from server and db
   * @param {*} request
   */
  async function deleteSite(id) {
    try {
      const site = await models.site.findOne({
        where: {
          id: id,
        },
      });
      if (site == null) {
        throw applicationException.new(
          applicationException.NOT_FOUND,
          'Page not found',
        );
      }
      if (await site.destroy()) {
        const data = await utility()
          .getFileUtility()
          .deleteHtml(site.url);
        if (!data) {
          return data;
        }
      }
      return 'Page has been deleted';
    } catch (error) {
      return error;
    }
  }

  async function changeNavigation(id) {
    try {
      const site = await models.site.findOne({
        where: {
          id: id,
        },
      });
      if (site == null) {
        throw applicationException.new(
          applicationException.NOT_FOUND,
          'Page not found',
        );
      }
      await site.update({
        inNav: !site.inNav,
      });
      return applicationMessage.new(
        applicationMessage.OK,
        'Page has been edited',
      );
    } catch (error) {
      return error;
    }
  }

  async function getAllSites() {
    try {
      return models.site.findAll({
        order: [['inNav', 'DESC']],
      });
    } catch (error) {
      return error;
    }
  }

  async function getMainPage() {
    try {
      const site = await models.site.findOne({
        where: {
          name: 'index.html',
        },
        include: [
          {
            model: models.post,
            attributes: ['title', 'createdAt', 'updatedAt'],
            order: [['updatedAt', 'DESC']],
            limit: 1,
            include: [
              {
                model: models.user,
                attributes: ['login'],
              },
              {
                model: models.comment,
                order: [['updatedAt', 'DESC']],
                limit: 1,
                attributes: [
                  'nickname',
                  'title',
                  'createdAt',
                  'updatedAt',
                ],
              },
            ],
          },
        ],
        attributes: ['title', 'url', 'createdAt', 'updatedAt'],
      });
      const amount = await models.site.count();
      return { site: site, amount: amount };
    } catch (error) {
      return error;
    }
  }

  return {
    updateHtmlContent,
    getHtmlContent,
    getMainPage,
    changeNavigation,
    addSite,
    deleteSite,
    getAllSites,
  };
}

export default {
  create,
};
