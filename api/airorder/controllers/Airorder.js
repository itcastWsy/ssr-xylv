'use strict';

/**
 * Airorder.js controller
 *
 * @description: A set of functions called "actions" for managing `Airorder`.
 */

module.exports = {

  /**
   * Retrieve airorder records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.airorder.search(ctx.query);
    } else {
      return strapi.services.airorder.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a airorder record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.airorder.fetch(ctx.params);
  },

  /**
   * Count airorder records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.airorder.count(ctx.query);
  },

  /**
   * Create a/an airorder record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.airorder.add(ctx.request.body);
  },

  /**
   * Update a/an airorder record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.airorder.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an airorder record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.airorder.remove(ctx.params);
  }
};
