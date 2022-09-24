class SiteController {
    index(req, res) {
        res.json("Hello Univer");
    }
}
module.exports = new SiteController