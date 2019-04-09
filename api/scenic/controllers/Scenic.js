'use strict';

/**
 * Scenic.js controller
 *
 * @description: A set of functions called "actions" for managing `Scenic`.
 */

module.exports = {

  /**
   * Retrieve scenic records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.scenic.search(ctx.query);
    } else {
      return strapi.services.scenic.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a scenic record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.scenic.fetch(ctx.params);
  },

  /**
   * Count scenic records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.scenic.count(ctx.query);
  },

  /**
   * Create a/an scenic record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.scenic.add(ctx.request.body);
  },

  /**
   * Update a/an scenic record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.scenic.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an scenic record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.scenic.remove(ctx.params);
  }
};
