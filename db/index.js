const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/friends-list-app', {
  logging: false
});

const Friend = db.define('friend', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5
    }
})

const syncAndSeed = async() => {
    await db.sync({force: true})
    const [moe, lucy, larry] = await Promise.all([
        Friend.create({name: 'Moe', rating: 10}),
        Friend.create({name: 'Lucy', rating: 5}),
        Friend.create({name: 'Larry', rating: 1})
    ])
    const friends = await Friend.findAll()
}

module.exports = {
    db,
    Friend,
    syncAndSeed,
}