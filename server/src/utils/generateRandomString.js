const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    return Array(length)
        .fill(chars)
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join('')
}

export default generateRandomString