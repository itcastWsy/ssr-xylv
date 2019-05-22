
/**
 *
 * @apiDefine RkNotFoundException
 *
 * @apiError RkNotFoundException 找不到相关数据
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "error": {
 *           "statusCode": 400,
 *           "error": "Bad Request",
 *           "message" ""
 *       }
 *     }
 *
 */


/**
* 
* @api {get}  /  接口统一说明
* @apiGroup A
*
* @apiExample  接口统一说明
* 接口地址： http://localhost:1337
*
* 分页查询条件： 
* {
*    _start: 默认0,
*    _limit: 获取条数
*    _sort: 排序
* }
* 
* 访问需要登录授权接口：
* 需要添加头信息Authorization
* {
*    Authorization： Bearer [token]
* }
*/


/**
* 
* @api {post} /accounts/login 登录
* @apiName Login
* @apiGroup ACCOUNT
*
* @apiParam {String} username 手机号码
* @apiParam {String} password 密码
* 
* @apiSuccess {String} jwt token
* @apiSuccess {Object} user 用户信息
* 
* @apiSuccessExample 成功响应：
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU0NTIwMDAzLCJleHAiOjE1NTcxMTIwMDN9.qiTS5nyRPz14X4wfcmy7pen6edXpimL5iBbTHY5K-8o",
    "user": {
        "id": 1,
        "username": "13312882474",
        "email": null,
        "role": 2,
        "nickname": "my",
        "created_at": 1553587751614,
        "updated_at": 1553587751627
    }
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {post} /accounts/register 注册
* @apiName Register
* @apiGroup ACCOUNT
*
* @apiHeader {string} Content-Type application/x-www-form-urlencoded
*
* @apiParam {String} username 手机号码
* @apiParam {String} nickname 昵称
* @apiParam {String} captcha  手机验证码
* @apiParam {String} password 密码
* 
* @apiSuccess {String} jwt token
* @apiSuccess {Object} user 用户信息
* 
* @apiSuccessExample 成功响应：
{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTU0NTIwODMwLCJleHAiOjE1NTcxMTI4MzB9.w2LbX41OFG4VJArlGq4BJBVFdjRzb2v5Z_uhsb4oPhA",
    "user": {
        "id": 6,
        "username": "13312882472",
        "email": null,
        "role": {
            "id": 2,
            "name": "Authenticated",
            "description": "Default role given to authenticated user.",
            "type": "authenticated"
        },
        "nickname": "my",
        "created_at": 1554520830711,
        "updated_at": 1554520830723,
        "comments": []
    }
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {post} /captchas 手机验证码
* @apiName getCaptchas
* @apiGroup ACCOUNT
*
* @apiHeader {string} Content-Type application/x-www-form-urlencoded
*
* @apiParam {String} tel 手机号码
* 
* @apiSuccessExample 成功响应：
{
    status: 0,
    message: "success"
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /scenics/banners 查找城市
* @apiName get index banners
* @apiGroup Index
* 
* @apiSuccessExample 成功响应：
{
    data: [{
        url: "", // 图片链接
        desc: "", // 图片描述
    }],
    total: 100
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /cities 查找城市
* @apiName getCities
* @apiGroup Address
*
*
* @apiParam {String} name 城市名称
* 
* @apiSuccessExample 成功响应：
{
    data: [{
        ...,
        scenics: [] // 景点，展示在酒店的搜索的区域位置
    }],
    total: 100
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /province/search? 查找省份下的城市
* @apiName getProvince
* @apiGroup Address
*
*
* @apiParam {Number} id 省份id
* 
* @apiSuccessExample 成功响应：
{
    data: {},
    total: 100
}
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {get} /hotels 酒店详情
* @apiName Hotels
* @apiGroup HOTEL
*
* @apiParam {Number} id             酒店id(酒店详情)
* @apiParam {Number} city 			城市id
* @apiParam {Number} scenic         景点id
* @apiParam {String} name_contains 	名字模糊查询
* @apiParam {Number} hotellevel     酒店星级
* @apiParam {Number} hoteltype      酒店类型
* @apiParam {Number} hotelbrand     酒店品牌
* @apiParam {Number} hotelasset     酒店设施
* @apiParam {String} _sort  		排序
* @apiParam {Number} _limit  		条数
* @apiParam {Number} _start         开始数据（分页）
*
* @apiSuccess {Object} data 酒店信息
* 
* @apiExample 请求例子
* 	127.0.0.1:1337/hotels?city=197&country=2046&name_contains=香格&_limit=1&_start=0
* 
* @apiSuccessExample 成功响应：
{
    "data": {
        "hotels": [
            {
                "id": 2,
                "name": "香格里拉",
                "enName": "xiang ge li la",
                "isHot": null,
                "score": 3.5,
                "location": {},
                "summary": "香格里拉大酒店",
                "enterTime": "2019-04-02 00:00:00",
                "leftTime": "2019-04-03 00:00:00",
                "buildTime": "2019-04-03 00:00:00",
                "lastBuildTime": "2019-04-03 00:00:00",
                "roomCount": 50,
                "province": {
                    "id": 18,
                    "name": "广东省",
                    "code": "440000000000",
                    "parentCode": "",
                    "level": "1",
                    "created_at": "2019-04-02 08:49:44",
                    "updated_at": "2019-04-02 08:49:44"
                },
                "city": {
                    "id": 197,
                    "name": "广州市",
                    "code": "440100000000",
                    "parentCode": "440000000000",
                    "level": "2",
                    "created_at": "2019-04-02 08:18:16",
                    "updated_at": "2019-04-02 08:18:16"
                },
                "hotellevel": {
                    "id": 5,
                    "level": 5,
                    "name": "5星",
                    "created_at": 1554366186264,
                    "updated_at": 1554366186277
                },
                "hoteltype": {
                    "id": 2,
                    "name": "高端酒店",
                    "created_at": 1554263122400,
                    "updated_at": 1554263122417
                },
                "hotelbrand": {
                    "id": 2,
                    "name": "香格里拉",
                    "cities": [
                        "广州",
                        "大理",
                        "上海",
                        "昆明"
                    ],
                    "created_at": 1554261173669,
                    "updated_at": 1554261258768
                },
                "price": 500,
                "country": {
                    "id": 2046,
                    "name": "天河区",
                    "code": "440106000000",
                    "parentCode": "440100000000",
                    "level": "3",
                    "created_at": "2019-04-06 01:32:49",
                    "updated_at": "2019-04-06 01:32:49"
                },
                "created_at": 1554261979396,
                "updated_at": 1554514601624,
                "pics": [
                    {
                        "id": 1,
                        "name": "xianggelila.jpg",
                        "hash": "d841a1a0e05440388d13b23cddaaf8d6",
                        "sha256": "OUpRah3GWvpIZBSgAnUm4LspRFW1-kypP2YK4lnHZpA",
                        "ext": ".jpg",
                        "mime": "image/jpeg",
                        "size": "33.59",
                        "url": "/uploads/d841a1a0e05440388d13b23cddaaf8d6.jpg",
                        "provider": "local",
                        "public_id": null,
                        "created_at": 1554369718286,
                        "updated_at": 1554369718310
                    }
                ],
                "comments": [
                    {
                        "id": 1,
                        "account": 1,
                        "content": "酒店环境很好",
                        "like": null,
                        "likeIds": [],
                        "score": 4.5,
                        "hotel": 2,
                        "created_at": 1554368708175,
                        "updated_at": 1554368708201
                    }
                ],
                "hotelassets": [
                    {
                        "id": 1,
                        "name": "wifi",
                        "type": "房间设施",
                        "hotels": 2,
                        "created_at": 1554264873390,
                        "updated_at": 1554514601655
                    },
                    {
                        "id": 2,
                        "name": "热水壶",
                        "type": "房间设施",
                        "hotels": 2,
                        "created_at": 1554366902573,
                        "updated_at": 1554514601636
                    },
                    {
                        "id": 3,
                        "name": "吹风机",
                        "type": "房间设施",
                        "hotels": 2,
                        "created_at": 1554366910595,
                        "updated_at": 1554514601664
                    },
                    {
                        "id": 4,
                        "name": "外币兑换服务",
                        "type": "酒店服务",
                        "hotels": 2,
                        "created_at": 1554367127462,
                        "updated_at": 1554514601663
                    },
                    {
                        "id": 5,
                        "name": "洗衣服务",
                        "type": "酒店服务",
                        "hotels": 2,
                        "created_at": 1554367145794,
                        "updated_at": 1554514601680
                    },
                    {
                        "id": 6,
                        "name": "电梯",
                        "type": "主要设施",
                        "hotels": 2,
                        "created_at": 1554367166516,
                        "updated_at": 1554514601674
                    }
                ],
                "products": [
                    {
                        "name": "携程",
                        "price": "50040.52"
                    },
                    {
                        "name": "艺龙",
                        "price": "5008.55"
                    },
                    {
                        "name": "Hotels.com",
                        "price": "50059.90"
                    }
                ]
            }
        ]
    }
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /hotels/options 酒店选项
* @apiName Hotel Options
* @apiGroup HOTEL
*
* 
* 
* @apiSuccessExample 成功响应：
{
    data: {
        "levels": [],
        "types": [],
        "assets": [],
        "brands": []
    }
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /hotels/comments 获取酒店评论
* @apiName Get Hotel Comments
* @apiGroup COMMENT
*
* @apiParam {Number} hotel          酒店id
* @apiParam {String} _sort          排序
* @apiParam {Number} _limit         条数
* @apiParam {Number} _start         开始数据（分页）
* 
* @apiSuccessExample 成功响应：
{
    "data": [
        {
            "id": 1,
            "account": 1,
            "content": "酒店环境很好",
            "like": 1,
            "likeIds": [],
            "score": 4.5,
            "hotel": 2,
            "created_at": 1554368708175,
            "updated_at": 1554705888282
        }
    ],
    "total": 1
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /hotels/comments 获取酒店评论
* @apiName Get Hotel Comments
* @apiGroup COMMENT
*
* @apiParam {Number} hotel          酒店id
* @apiParam {String} _sort          排序
* @apiParam {Number} _limit         条数
* @apiParam {Number} _start         开始数据（分页）
* 
* @apiSuccessExample 成功响应：
{
    "data": [
        {
            "id": 1,
            "account": 1,
            "content": "酒店环境很好",
            "like": 1,
            "likeIds": [],
            "score": 4.5,
            "hotel": 2,
            "created_at": 1554368708175,
            "updated_at": 1554705888282
        }
    ],
    "total": 1
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /comments/like 评论点赞
* @apiName Hotel Comments Like
* @apiGroup COMMENT
*
* @apiHeader {String} Authorization token
* @apiHeaderExample token请求头
{
    Authorization： Bearer [token]
}
*
* @apiParam {Number} id             评论id
* 
* @apiSuccessExample 成功响应：
{
    id: 1
}
*
* @apiUse RkNotFoundException
*/



/**
* 
* @api {post} /comments 提交评论
* @apiName Set Hotel Comments
* @apiGroup COMMENT
*
* @apiHeader {string} Content-Type application/json
* @apiHeader {String} Authorization token
* @apiHeaderExample token请求头
{
    Authorization： Bearer [token]
}
*
* @apiParam {String} content 评论内容
* @apiParam {Object} score   评分对象
* @apiParam {Float} score.location   位置评分
* @apiParam {Float} score.service    服务评分
* @apiParam {Float} score.fancility  设施评分
* @apiParam {Float} score.all        总体评分
* @apiParam {Array}  pics             图片
*
* @apiParam {Number} hotel            酒店id / 
* @apiParam {Number} post             评论id
*
* @apiParam {Number} follow           回复id
* 
* @apiSuccessExample 成功响应：
{
    "status": 0,
    "message": ""
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /upload 文件上传
* @apiName upload
* @apiGroup UPLOAD
*
* @apiHeader {String} Authorization token
* @apiHeaderExample token请求头
{
    Authorization： [token]
}
*
* @apiParam {files} files       评论id
*
* @apiExample 请求例子
<form>
  <!-- Can be multiple files -->
  <input type="file" name="files">
  <input type="submit" value="Submit">
</form>

<script type="text/javascript">
  const formElement = document.querySelector('form');

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const request = new XMLHttpRequest();

    request.open('POST', 'http://127.0.0.1:1337/upload');

    request.send(new FormData(formElement));
  });
</script>
* 
* @apiSuccessExample 成功响应：
[
    {
        created_at: 1554780485209,
        ext: ".jpeg",
        hash: "a067aac50f3c4224bfb060f7c81dc54c",
        id: 3,
        mime: "image/jpeg",
        name: "wKgBZ1laE5GAH0GWAAGFZyv3znE68.jpeg",
        provider: "local",
        public_id: null,
        related: [],
        sha256: "xn-vndROmvVAbUIqrahe0zAizgAn2S1cEKcA6_ubcKE",
        size: "99.96",
        updated_at: 1554780485233,
        url: "/uploads/a067aac50f3c4224bfb060f7c81dc54c.jpeg"
    }
]
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {get} /airs/city 获取机票城市
* @apiName getAirsCity
* @apiGroup AIR
*
* @apiParam {String} departCity       出发城市
*
* @apiSuccessExample 成功响应：
{
  data:;
  status: 0
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /airs/city_sort 获取城市简称
* @apiName getCitySort
* @apiGroup AIR
*
* @apiParam {String} name  出发城市
*
* @apiSuccessExample 成功响应：
{
  data: "";
  status: 0
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /airs 获取机票
* @apiName getAirs
* @apiGroup AIR
*
* @apiParam {String} departCity       出发城市
* @apiParam {String} departCode       出发城市代码
* @apiParam {String} destCity         目标城市
* @apiParam {String} destCode         目标城市代码
* @apiParam {String} departDate       日期 2019-05-01
*
* 
* @apiSuccessExample 成功响应：
{
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
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {get} /airs/:id 选择机票
* @apiName airs
* @apiGroup AIR
*
* @apiParam {number} /:id             机票id
* @apiParam {String} seat_xid         座位id
*
* 
* @apiSuccessExample 成功响应：
{
    "id": 2,
    "org_city_name": "广州",
    "dst_city_name": "上海",
    "airline_name": "国航",
    ...
}
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {post} /airorders 提交机票订单
* @apiName air orders
* @apiGroup AIR
*
* @apiParam {Array}    users<Object{username,id}>             用户列表
* @apiParam {Array}    insurances<Number>       保险id
* @apiParam {String}               contactName        联系人名字
* @apiParam {String}               contactPhone       联系人电话
* @apiParam {Boolean}              invoice            是否需要发票 
* @apiParam {String}               seat_xid           座位id
* @apiParam {Number}               air                航班id  
* 
* @apiSuccessExample 成功响应：
{
    "status": 0,
    "message": "订单提交成功"
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {post} /airorders/pay 微信付款
* @apiName air pay
* @apiGroup AIR
*
* @apiParam {Number}               amount            订单金额 
* @apiParam {String}               order_no          订单编号
* 
* @apiSuccessExample 成功响应：
{
    "order_id": "BD20190530120001",                     // 订单编号
    "code_url": "weixin://wxpay/bizpayurl?pr=5benFv3",  // 支付二维码链接
    "outTrade_no": "BD20190530120001",                  // 订单编号(带字母)
    "nonce_str": "mk8FGAmn3DhJjSCedQdtGRbfbGwt8n6A"
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {post} /airorders/checkpay 查询付款状态
* @apiName air pay
* @apiGroup AIR
*
* @apiParam {Number}               nonce_str             支付接口返回的订单金额  
* @apiParam {String}               out_trade_no          订单编号
* 
* @apiSuccessExample 成功响应：
{
{
    "trade_state": "NOTPAY",
    "statusTxt": "订单未支付"
}
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {get} /posts 文章列表
* @apiName get posts
* @apiGroup POSTS
*
* @apiParam {Number}       city        城市id | 城市名称
* 
* @apiSuccessExample 成功响应：
{
    "data": {},
    "total": 0
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /posts/cities 城市菜单列表
* @apiName get posts cities
* @apiGroup POSTS
* 
* @apiSuccessExample 成功响应：
{
    "data": [
        type: ""        // 主题类型
        children: []    // 城市列表 
    ],
    "total": 0
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /posts 文章详情
* @apiName get posts detail
* @apiGroup POSTS
*
* @apiParam {Number}       id             文章id
* @apiSuccessExample 成功响应：
{
    ...文章详情
}
*
* @apiUse RkNotFoundException
*/



/**
* 
* @api {post} /posts 新增文章
* @apiName Add posts
* @apiGroup POSTS
*
* @apiHeader {String} Authorization token
* @apiHeaderExample token请求头
{
    Authorization： Bearer [token]
}
*
* @apiParam {Text}         content            文章内容
* @apiParam {String}       title              文章标题
* @apiParam {Number}       city               城市id | 城市名称
* 
* @apiSuccessExample 成功响应：
{
    "status": 0,
    "message": "文章新增成功",
    "data": {}
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /postkinds 获取文章分类
* @apiName Get post types
* @apiGroup POSTS
* 
* @apiSuccessExample 成功响应：
{
 []
}
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {get} /posts/like 文章点赞
* @apiName Posts Like
* @apiGroup POSTS
*
* @apiHeader {String} Authorization token
* @apiHeaderExample token请求头
{
    Authorization： Bearer [token]
}
*
* @apiParam {Number} id             评论id
* 
* @apiSuccessExample 成功响应：
{
    id: 1
}
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {get} /posts/comments 获取文章评论
* @apiName Get Post Comments
* @apiGroup POSTS
*
* @apiParam {Number} post           文章id
* @apiParam {String} _sort          排序
* @apiParam {Number} _limit         条数
* @apiParam {Number} _start         开始数据（分页）
* 
* @apiSuccessExample 成功响应：
{
    "data": [
        {
            "id": 1,
            ...
        }
    ],
    "total": 1
}
*
* @apiUse RkNotFoundException
*/


/**
* 
* @api {get} /posts/star  收藏文章
* @apiName Star Posts
* @apiGroup POSTS
*
* @apiHeader {String} Authorization token
* @apiHeaderExample token请求头
{
    Authorization： Bearer [token]
}
*
* @apiParam {Number} id       文章id
* 
* @apiSuccessExample 成功响应：
{
    "status": 0,
    "message": "收藏成功"
}
*
* @apiUse RkNotFoundException
*/

/**
* 
* @api {get} /posts/recommend  推荐文章
* @apiName Get Recommend Post 
* @apiGroup POSTS
*
*
* @apiParam {Number} id       文章id
* 
* @apiSuccessExample 成功响应：
{
    "status": 0,
    "message": "收藏成功"
}
*
* @apiUse RkNotFoundException
*/