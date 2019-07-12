class Calc {
    static convertBytes(bytes) {
        return bytes < 1024000000 ? `${Math.round(bytes / 1024 / 1024)} MB` : `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
    };
    static convertMBytes(mbytes) {
        return mbytes < 1024 ? `${mbytes} MB` : `${(mbytes/ 1024).toFixed(1)} GB`;
    };
}
module.exports = Calc;