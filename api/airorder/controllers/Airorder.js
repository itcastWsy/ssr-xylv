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
    const {insurances, seat_xid, captcha, ...props} = ctx.request.body;
    let price = 0;

    console.log(props.users)

    if(props.users && props.users.length === 0 || !props.users[0].username){
      return ctx.badRequest(null, '乘机人不能为空');
    }

    if(!props.contactName){
      return ctx.badRequest(null, '联系人姓名不能为空');
    }

    if(!props.contactPhone){
      return ctx.badRequest(null, '联系人手机不能为空');
    }

    if(!captcha){
      return ctx.badRequest(null, '手机验证码不能为空');
    }

    // match captcha
    const captchaCount = await strapi.services.captcha.count({ 
      tel: props.contactPhone, 
      code: captcha, 
      // isValid: true
    });

    if(!captchaCount){
      return ctx.badRequest(null, '验证码错误');
    }

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

      if(v.settle_price){
        price += v.settle_price * props.users.length;
      }else{
        price += v.org_settle_price * props.users.length;
      }
    })

    price += air.airport_tax_audlet * props.users.length;

    await strapi.services.airorder.add({
      ...props,
      insuranceIds: insurances,
      price,
      account: 1 // ctx.state.user.id
    });

    return {
      status: 0,
      message: "订单提交成功",
      price: price
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
