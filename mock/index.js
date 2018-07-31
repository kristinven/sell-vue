import Mock from 'mockjs'
import data from '../data.json'

Mock.mock('/goods', {
    type: 0,
    msg: '成功',
    data: data.goods
})
Mock.mock('/seller', {
    type: 0,
    msg: '成功',
    data: data.seller
})
Mock.mock('/ratings', {
    type: 0,
    msg: '成功',
    data: data.ratings
})