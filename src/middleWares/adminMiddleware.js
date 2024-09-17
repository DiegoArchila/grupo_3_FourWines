module.exports={
    /**
     * Validate if the user is admin
     * @param {*} req 
     * @param {*} res 
     * @param {*} next If is true will next or will redirectionate to home
     */
    validateUserAdmin: (req, res, next) => {
        if(req.session.user!=undefined && (req.session.admin!=undefined && req.session.admin===true)){
            next();
        } else {
            res.redirect("/");
        }
    }
}