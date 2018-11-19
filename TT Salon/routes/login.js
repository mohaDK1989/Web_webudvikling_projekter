var controller = require("../controllers/controller");

module.exports = function(express) {
    var router = express.Router();
    router.route('/login')
        .get(function (req, res) {
            controller.getLogins()
                .then(function(val) {
                    res.json(val);
                })
                .catch(function(err) {
                    console.error("Error: " + err);
                    if (err.stack) console.error(err.stack);
                    res.status(500).send(err);
                });
        })
        .post(function (req, res) {
            controller.createLogin(req.body.username, req.body.password)
                .then(function() {
                    res.json({message: 'Login saved!'});
                })
                .catch(function(err) {
                    console.error("Error: " + err);
                    if (err.stack) console.error(err.stack);
                    res.status(500).send(err);
                });
        })
.delete(function (req,res) {
        controller.sletLogin()
        res.json({message:"login slettet"})


    })
    return router;
};