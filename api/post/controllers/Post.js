'use strict';

/**
 * Post.js controller
 *
 * @description: A set of functions called "actions" for managing `Post`.
 */

module.exports = {

  star: async ctx => {
    let { id: uid, starPosts } = ctx.state.user;
    const {id} = ctx.query;

    if(!starPosts) starPosts = [];

    if(!id){
      return ctx.badRequest(null, '请输入文章id');
    }

    if(starPosts.indexOf(id) > -1){
      return {
        status: 0,
        message: "已收藏"
      }
    }

    await strapi.services.account.edit({
      id: uid,
      starPosts: [...starPosts, id]
    });

    return {
      status: 0,
      message: "收藏成功"
    };
  },

  like: async ctx => {
    const { id: uid } = ctx.state.user;
    const {id} = ctx.query;

    if(!id){
      return ctx.badRequest(null, 'must be provoid post id.');
    }

    let res = await strapi.services.post.fetch({id});
    res = res.toJSON(); 

    if(!res.likeIds){
      res.likeIds = [];
    }

    if(res.likeIds.indexOf(uid) > -1){
      return ctx.badRequest(null, 'user is already like.');
    }else{
      res.likeIds.push(uid);
    }

    const like = res.like + 1;

    await strapi.services.post.edit({
      id,
      like: like,
      likeIds: res.likeIds
    });

    return {
      status: 0,
      message: "点赞成功"
    }
  },

  comments: async ctx => {
    //const data = await strapi.models.comment.where(ctx.query).fetchAll();
    // type: 2 表示查找文章的评论
    ctx.query = {...ctx.query, level_contains: 1, type: 2};

    const comments = await strapi.services.comment.fetchAll(ctx.query);
    const total = await strapi.services.comment.count(ctx.query);

    const data = comments.toJSON().map(v => {
      v.post = v.post.id;
      return v;
    });

    return {
      data,
      total
    }
  },

  /**
   * Retrieve post records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.post.search(ctx.query);
    } else {
      return strapi.services.post.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a post record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {

    const _res = await strapi.services.post.fetch(ctx.params);
    
    const res = _res.toJSON();

    return await strapi.services.post.edit({
      id: res.id,
      watch: (res.watch || 0) + 1
    }) ;
  },

  /**
   * Count post records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.post.count(ctx.query);
  },

  /**
   * Create a/an post record.
   *
   * @return {Object}
   */

  create: async (ctx) => {

    const account = ctx.state.user.id;


    const data = await strapi.services.post.add({
      ...ctx.request.body,
      account
    });

    return {
      status: 0,
      message: "新增成功",
      data
    };
  },



  /**
   * Update a/an post record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.post.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an post record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.post.remove(ctx.params);
  }
};
