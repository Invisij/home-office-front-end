import EventEmitter from 'events';

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0);

export default _emitter;
