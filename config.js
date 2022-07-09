module.exports = {
    roblosecurity: '', // Without roblosecurity, it will throw Too Many Requests error but you can increase the interval
    interval: 600, // Interval in milliseconds (600 recommended)
    port: process.env.PORT || 8080, // Port to listen on
}
