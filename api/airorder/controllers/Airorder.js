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
    const {insurances, seat_xid, ...props} = ctx.request.body;
    let price = 0;

    if(insurances){
      for(let i = 0; i < insurances.length; i++){
        const id = insurances[i];
        const _insurance = await strapi.models.airinsurance.where({id}).fetch();
        const insurance = _insurance.toJSON();
        price += (insurance.price * props.users.length); 
      }
    }

    const _air = await strapi.models.air.where({id: props.air}).fetch();
    const air = _air.toJSON();

    air.seat_infos && air.seat_infos.forEach(v => {
      if(seat_xid !== v.seat_xid) return;

      if(v.settle_price_child){
        price += v.settle_price_child;
      }else{
        price += v.settle_price;
      }
    })

    await strapi.services.airorder.add({
      ...props,
      insuranceIds: insurances,
      price,
      account: ctx.state.user.id
    });

    return {
      status: 0,
      message: "订单提交成功"
    };
    
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
