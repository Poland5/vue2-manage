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
 * 所有用户注册量
 */
export const getUserCount = () => fetch('/v1/users/count');

/**
 * 获取用户列表
 */
export const getUserList = data => fetch('/v1/users/list', data)

/**
 * 食物数量
 */
export const getFoodCount = data => fetch('/shopping/v2/foods/count',data);

/**
 * 食物列表
 */
export const getFoodList = data => fetch('/shopping/v2/foods', data);

/**
 * 获取商铺详细信息
 */
export const getRestaurantDetail = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id)