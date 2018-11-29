
export default (req, res, next) => {
    if(req.user.isAdmin){
        return res.json({ status: 403, error: "Access forbidden" })
    }

    next();
}