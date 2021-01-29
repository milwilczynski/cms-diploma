import models, { sequelize } from '../models/index';

import applicationMessage from '../resources/applicationMessage';
import applicationException from '../exceptions/applicationException';

function create(context) {
  async function getConfig() {
    try {
      const config = await models.settings.findAll();

      return config;
    } catch (error) {
      return error;
    }
  }

  async function updateHeader(body) {
    try {
      const config = await models.settings.findAll();
      if (config.length > 0) {
        const updated = await config[0].update({
          isHeader: body.isHeader,
        });
      }
      return config;
    } catch (error) {
      return error;
    }
  }

  async function updateLayout(body) {
    try {
      const config = await models.settings.findAll();
      if (config.length > 0) {
        const updated = await config[0].update({
          layout: body.layout,
        });
      }
      return config;
    } catch (error) {
      return error;
    }
  }

  async function updateColors(body) {
    try {
      const config = await models.settings.findAll();
      if (config.length > 0) {
        const updated = await config[0].update({
          headerColor: body.headerColor,
          menuColor: body.menuColor,
          bodyColor: body.bodyColor,
          navbarColor: body.navbarColor,
        });
      }
      return config;
    } catch (error) {
      return error;
    }
  }

  async function addOrUpdate(body) {
    try {
      const config = await models.settings.findAll();

      if (config.length > 0) {
        config[0].update({
          isHeader: body.isHeader,
          headerColor: body.headerColor,
          menuColor: body.menuColor,
          bodyColor: body.bodyColor,
          navbarColor: body.navbarColor,
          layout: body.layout,
        });
      } else {
        const newConfig = await models.settings.create({
          isHeader: body.isHeader,
          headerColor: body.headerColor,
          menuColor: body.menuColor,
          bodyColor: body.bodyColor,
          navbarColor: body.navbarColor,
          layout: body.layout,
        });
        return newConfig;
      }
      return config;
    } catch (error) {
      return error;
    }
  }
  return {
    getConfig,
    addOrUpdate,
    updateHeader,
    updateLayout,
    updateColors,
  };
}

export default {
  create,
};
