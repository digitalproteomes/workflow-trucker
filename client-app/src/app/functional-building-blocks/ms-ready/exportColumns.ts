import { Header } from '../../common';
import { MSReadySample } from '../../types';

export class ExportColumns {
    public static all: Header<MSReadySample>[] = [
        { label: 'Id', key: MSReadySample.nameof('id') },
        { label: 'Name', key: MSReadySample.nameof('name') },
        { label: 'Peptide #', key: MSReadySample.nameof('peptideNo') },
        { label: 'Processing person', key: MSReadySample.nameof('processingPerson') },
        { label: 'Quality', key: MSReadySample.nameof('quality') },
    ];

    public static nameInfo: Header<MSReadySample>[] = [
        { label: 'Id', key: MSReadySample.nameof('id') },
        { label: 'Name', key: MSReadySample.nameof('name') },
    ];
}
