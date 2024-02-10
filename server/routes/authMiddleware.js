// Middleware to check if the user is authenticated
function userAuthentication(req, res, next) {
    if (req.session.user === undefined) {
        res.redirect('/index.html');
    } else {
        next();
    }
}

// Middleware to check if the user has admin privileges
function adminAuthentication(req, res, next) {
    if (req.session.sysadmin) {
        // sysadmin exists, proceed to route
        next();
    } else {
        res.redirect('/index.html');
    }
}

export default {
    userAuthentication,
    adminAuthentication
};
