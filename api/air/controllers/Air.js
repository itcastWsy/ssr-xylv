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
    const delay = 2000 * 60;
    let flightRes = [];

    const _airs = await strapi.services.air.fetchAll({
      org_city_name: departCity,
      dst_city_name: destCity
    });
    const air = _airs.toJSON();

    if(air && air.length ){
      flightRes = air.map(v => {
        return {
          ...v,
          arr_date: departDate,
          dep_date: departDate,
          arr_datetime: departDate + " " +v.arr_datetime.split(" ")[1],
          dep_datetime: departDate + " " +v.dep_datetime.split(" ")[1]
        }
      });
    }else{
      // 防止第三方接口挂掉
      try{
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

        for(var i = 0; i < flights.length; i ++){
          const {arrTime, correctness, depTime, dst_city_code, flight_share, fuel_tax_audlet, fuel_tax_child, meal, org_city_code, ota_id, plane_type, stop_num, ...flight} = flights[i];

          const _newFlight = await strapi.services.air.add({...flight});
          const newFlight = _newFlight.toJSON();

          flightRes.push(newFlight);
        }
      }catch(err){
        // 第三方接口问题
      }
      
    }

    const airport = [...new Set(flightRes.map(v => {
      return v.org_airport_name;
    }))];
    const company = [...new Set(flightRes.map(v => {
      return v.airline_name;
    }))]

    return {
      info: {
        departCity,
        destCity,
        departDate
      },
      flights: flightRes,
      total: flightRes.length,
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

    const _air = await strapi.services.air.fetch(ctx.params);

    if(!_air){
      return ctx.badRequest(null, '当前机票信息已过期');
    }

    const air = _air.toJSON();
    const {seat_xid} = ctx.query;

    const seatInfo = air.seat_infos.filter(v => {
      return v.seat_xid === seat_xid;
    })[0];

    const _insurances = await strapi.models.airinsurance.fetchAll();
    const insurances = _insurances.toJSON();

    return {
      ...air,
      seat_infos: seatInfo,
      insurances
    };
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
