module.exports=(sequelize, Sequelize)=>{
    const comment= sequelize.define("Comment", {
id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    autoNull:false,
    primaryKey:true
},
posts_id:{
    type: Sequelize.INTEGER,
    autoNull:false,
    foreignKey:true
},
Comments:{
    type: Sequelize.STRING
}
})
return comment;
}