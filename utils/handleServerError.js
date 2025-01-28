export const handleError = (res, error) => {
    res.status(500).json({ success: false, message: `Bad request: ${error.message}` });
  };