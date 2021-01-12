import { Header } from '../../common';
import { MsRun } from '../../types';

export class ExportColumns {
    public static all: Header<MsRun>[] = [
        { label: 'Id', key: MsRun.nameof('id') },
        { label: 'Name', key: MsRun.nameof('name') },
        { label: 'Processing person', key: MsRun.nameof('processingPerson') },
        { label: 'Instrument', key: MsRun.nameof('instrumentId') },
        { label: 'SOP', key: MsRun.nameof('sopFileName') },
    ];
}
