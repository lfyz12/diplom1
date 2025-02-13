const jwt = require('jsonwebtoken');

module.exports = (roles = []) => (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"
        if (!token) {
            return res.status(401).json({ error: 'Нет доступа' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Если роли переданы в middleware и у пользователя нет доступа
        if (roles.length && !roles.includes(decoded.role)) {
            return res.status(403).json({ error: 'Недостаточно прав' });
        }

        next();
    } catch (e) {
        return res.status(401).json({ error: 'Неверный токен' });
    }
};
