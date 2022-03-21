const errorHandlerMiddleware = (err, req, res, next) => {
	
	return res
		.status(500)
		.json({ err: err.err,
			msg: err.msg
		});
};

export default errorHandlerMiddleware;
