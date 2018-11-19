var controller = require("../controllers/controller");

module.exports = function(express) {
    var router = express.Router();
    router.route('/tider')
        .get(function (req, res) {
            controller.getTiderer()
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
            controller.createTid(req.body.navn,req.body.tlfNr,req.body.uge,req.body.dag,req.body.tid,req.body.tidID)
                .then(function() {
                    res.json({message: 'Tid Gemt!'});
                })
                .catch(function(err) {
                    console.error("Error: " + err);
                    if (err.stack) console.error(err.stack);
                    res.status(500).send(err);
                });
        })

    .delete(function (req,res) {
        controller.sletTid()
        res.json({message:"data slettet"})


    })
    return router;
};