import { MSRunNew } from '../../../types';
import { TypeMapConverter } from '../../../common';

export class MSRunNewTypeMap extends TypeMapConverter<MSRunNew> {
    public constructor() {
        super();

        this.keyMap.set('filename', MSRunNew.nameof('name'));
        this.keyMap.set('samplename', MSRunNew.nameof('msReadySampleName'));
        this.keyMap.set('instrumentmethod', MSRunNew.nameof('instrumentMethod'));
        this.keyMap.set('comment', MSRunNew.nameof('description'));
    }

    public convert(data: any): MSRunNew {
        let converted: MSRunNew = new MSRunNew();

        converted = this.assignValuesTo(converted, data);

        converted.instrumentId = '';
        converted.runMode = 'Unknown';

        return converted;
    }
}
