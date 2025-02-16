// src/controllers/pagesController.js
module.exports = {
    showPage1: (req, res) => {
        res.render('pages/page1');
    },

    showPage2: (req, res) => {
        res.render('pages/page2');
    }
};
