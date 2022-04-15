export function async(obj, eventName) {
    return new Promise((res, rej) => {
        obj.addEventListener(eventName, res);
    });
}