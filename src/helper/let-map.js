import EventEmitter from 'events';

export default class LetMap extends Map {
    constructor(struct, generateKey) {
        super();
        this.initStruct(struct);
        this.generateKey = generateKey || ((k) => k);
        this.emitter = new EventEmitter();
    }

    on(...args) {
        return this.emitter.on(...args)
    }

    off(...args) {
        return this.emitter.off(...args)
    }

    emit(...args) {
        this.emitter.emit(...args);
        this.emitter.emit('update', ...args);
    }

    /**
     * @param struct can be object function or primitive
     */
    initStruct(struct) {
        this.struct = struct;
    }

    set(k, nv) {
        let gk = this.generateKey(gk);
        return this.#set(gk, nv);
    }

    #set(gk, nv) {
        let ov = super.get(gk);
        super.set(gk, nv);
        this.emitter.emit(gk /*event name*/, {phase: 'UPDATE', nv, ov});
        if (ov === void 0)
            this.emitter.emit('new', gk, nv); /*no event update for that*/
        this.emitter.emit('update', gk, nv, ov);
        return nv;
    }

    delete(k) {
        k = this.generateKey(k);
        let ov = super.get(k);
        super.delete(k);
        this.emitter.emit(k /*event name*/, {phase: 'DELETE', ov});
        this.emitter.emit('delete', k, ov);
        this.emitter.emit('update', {op: 'delete', k, ov});
    }

    let(k, ...args) {
        const {struct} = this;

        let gk = this.generateKey(k, ...args);
        if (struct && !this.has(gk)) {
            const s = typeof struct == 'function' ? struct(k, ...args) : struct;
            struct.constructor ? new struct.constructor(struct) : struct
            this.#set(gk, s)
        }
        return super.get(gk);
    }
}

