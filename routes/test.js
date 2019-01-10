
module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send(`I'm listening`)
    })
}
