import { EventEmitter } from 'events';

import { SmsProvider } from '../../providers/sms/sms';

class ReedSwitch extends EventEmitter {
    constructor(private sms: SmsProvider) {
        super();
        this.on('opened', () => {
            this.process();
        })
    }
    process() {
        this.sms.sendTextTextMsg(0922719061, 'Intruder!');        
        this.emit('done', { openedOn: new Date() })
    }
}
