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
        k = this.generateKey(k);

        let ov = super.get(k);
        super.set(k, nv);
        this.emitter.emit(k /*event name*/, {phase: 'UPDATE', nv, ov});
        if (ov === void 0)
            this.emitter.emit('new', k, nv); /*no event update for that*/
        this.emitter.emit('update', k, nv, ov);
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

    let(k) {
        const {struct} = this;
        let gk = this.generateKey(k);
        if (struct && !this.has(gk)) {
            const s = typeof struct == 'function' ? struct(k) :
                struct.constructor ? new struct.constructor(struct) :
                    struct

            this.set(k, s)
        }
        return super.get(gk);
    }
}

