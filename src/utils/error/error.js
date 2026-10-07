

export const globalErrorHandling =  (error, req, res, next) => {

    if(process.env.MOOD === 'SHOW_STACK'){
        
        return res.status(error.cause || 500).json({
            status: error.cause,
            message: error.message || 'Internal server error',
            stack: error.stack
        })
    }

    return res.status(error.cause || 500).json({
        status: error.cause,
        message: error.message || 'Internal server error'
    })

    }