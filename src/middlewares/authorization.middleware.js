export const authorize = (...roles) => {

    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({message:'Authentication Required !!'})
        }

        if (!roles.includes(req.user.role)) {
            
            return res.status(200).json({message:`Access denied. Requires one of the following roles: ${roles.join(', ')}.`})
        }
        
        next();
    };
};


