class TimeUtil {
    static formatSec(sec) {
        if (!sec) return null
        const seconds = sec;
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const result = [];
        if (days >= 1) result.push( `${days}d`);
        if (hours >= 1) result.push(`${hours % 24}h`);
        if (minutes >= 1) result.push(`${minutes % 60}m`);
        result.push(`${seconds % 60}s`);
        return result.join(' ');
    } 
}
module.exports = TimeUtil;