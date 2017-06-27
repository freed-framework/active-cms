/**
 * @file util.js
 * @author denglingbo
 *
 */

class Utils {

    /**
     * 获取 guid
     * refer to http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
     */
    static guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export default Utils;
