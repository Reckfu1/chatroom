import Sequelize from 'sequelize'

// 使用url连接的形式
const Chatroom=new Sequelize('mysql://root:xx@localhost/chatroom',{
    define:{
        // 取消Sequelize自动给数据表加入时间戳
        timestamps:false
    }
})

export default{
    Chatroom
}