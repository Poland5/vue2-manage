import fetch from '@/config/fetch'

/**
 * 登陆
 */
export const login = data => fetch('/admin/login', data, 'POST')

/**
 * 获取登陆信息
 */
export const getAdminInfo = () => fetch('/admin/info');

/**
 * 退出
 */
export const signout = () => fetch('/admin/singout');

/**
 * 某天用户注册量
 */
export const userCount = date => fetch('/statis/user/' + date + '/count');

/**
 * 某天订单量
 */
export const orderCount = date => fetch('/statis/order/' + date + '/count');

/**
 * 获取某天管理员注册量
 */
export const adminCount = date => fetch('/statis/admin/' + date + '/count');

/**
 * 获取所有订单数量
 */
export const getOrderCount = () => fetch('/bos/orders/count');

/**
 * 所有用户注册量
 */
export const getUserCount = () => fetch('/v1/users/count');

/**
 * 获取管理员数量
 */
export const getAdminCount = () => fetch('/admin/count');

/**
 * 获取用户列表
 */
export const getUserList = data => fetch('/v1/users/list', data)

/**
 * 食品数量
 */
export const getFoodCount = data => fetch('/shopping/v2/foods/count',data);

/**
 * 食品列表
 */
export const getFoodList = data => fetch('/shopping/v2/foods', data);

/**
 * 获取商铺详细信息
 */
export const getRestaurantDetail = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id);

/**
 * 获取食品列表
 */
export const getMenu = data => fetch('/shopping/v2/menu/', data);

/**
 * 获取食物列表详情
 */
export const getMenuById = category_id => fetch('/shopping/v2/menu/' + category_id);

/**
 * 更新食品
 */
export const updateFoods = data => fetch('/shopping/v2/updatefood', data, 'POST');

/**
 * 获取城市经纬度
 */
export const guessCity = () => fetch('/v1/cities', {type:'guess'});

/**
 * 获取商铺列表
 */
export const getShopList = data => fetch('/shopping/restaurants', data);

/**
 * 删除商铺
 */
export const deleteRestaurant = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id);

/**
 * 获取所有商铺分类列表
 */
export const getCategory = () => fetch('/shopping/v2/restaurant/category');

/**
 * 更新商铺信息
 */
export const updateShop = data => fetch('/shopping/updateshop', data, 'POST');

/**
 * 搜索地址
 */
export const queryCity = (city_id, address) => fetch('/v1/pois',{
  city_id:city_id,
  keyword:address, 
  type:'search'
});

/**
 * 获取店铺食品种类
 */
export const getCategoryList = restaurant_id => fetch('/shopping/getcategory/' + restaurant_id);