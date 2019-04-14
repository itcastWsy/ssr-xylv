'use strict';

/**
 * Air.js controller
 *
 * @description: A set of functions called "actions" for managing `Air`.
 */

const fetch = require('node-fetch');
const querystring = require("querystring");

module.exports = {

  /**
   * Retrieve air records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {

    const {departCity, departCode, destCity, destCode, departDate} = ctx.query;

    const args = {
      "filter[departCity]": departCity,
      "filter[departCode]": departCode,
      "filter[destCity]": destCity,
      "filter[destCode]": destCode,
      "filter[departDate]": departDate
    }
    const url = `http://www.mafengwo.cn/flight/rest/flightlist/?${querystring.stringify(args)}`;

    const result = await fetch(url);
    const res = await result.json();

    if(!res.errno == 0){
      return ctx.badRequest(null, res.error);
    }

    const {flights} = res.data.ex;
    const airport = [...new Set(flights.map(v => {
      return v.org_airport_name;
    }))];
    const company = [...new Set(flights.map(v => {
      return v.airline_name;
    }))]

    return {
      info: {
        departCity,
        destCity,
        departDate
      },
      flights,
      options: {
        airport,
        flightTimes: [
          {from: 0, to: 6},
          {from: 6, to: 12},
          {from: 12, to: 13},
          {from: 13, to: 19},
          {from: 19, to: 24},
        ],
        company
      }
    }
  },

  /**
   * Retrieve a air record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.air.fetch(ctx.params);
  },

  /**
   * Count air records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.air.count(ctx.query);
  },

  /**
   * Create a/an air record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.air.add(ctx.request.body);
  },

  /**
   * Update a/an air record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.air.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an air record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.air.remove(ctx.params);
  }
};
