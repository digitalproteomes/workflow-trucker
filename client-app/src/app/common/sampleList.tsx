import React, { FunctionComponent } from 'react';
import { Table, Skeleton, Input, Space, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Sample } from '../types';
import { TableRowSelection, FilterDropdownProps } from 'antd/lib/table/interface';
import { SearchOutlined } from '@ant-design/icons';

type Props = {
    samples: Sample[] | null;
    columns: ColumnsType<Sample>;
    renderActions?: (record: Sample) => JSX.Element;
    onRowSelectionChange?: (selectedRows: Sample[]) => void;
};

type IProps<T extends object> = {
    samples: T[] | null;
    columns: ColumnsType<T>;
    renderActions?: (record: T) => JSX.Element;
    onRowSelectionChange?: (selectedRows: T[]) => void;

    rowKeySelector: (row: T) => string;
};

export function SampleList_v2<T extends object>({
    samples,
    columns,
    renderActions,
    onRowSelectionChange,
    rowKeySelector,
}: IProps<T> & { children?: React.ReactNode }): React.ReactElement {
    const onRowSelectionChangeHandler = (_selectedRowKeys: any, selectedRows: T[]) => {
        // at the moment (antd 4.3.5) the selectedRowKeys are coming in as ReactText[]
        if (onRowSelectionChange) onRowSelectionChange(selectedRows);
    };

    const rowSelection: TableRowSelection<T> = {
        onChange: onRowSelectionChangeHandler,
        selections: [Table.SELECTION_ALL],
    };

    if (samples == null) {
        return <Skeleton active />;
    }

    let columnsType: ColumnsType<T>;

    if (renderActions) {
        columnsType = [...columns, getRenderObject(renderActions)];
    } else {
        columnsType = columns;
    }

    return (
        <Table
            rowSelection={rowSelection}
            dataSource={samples}
            columns={columnsType}
            rowKey={(row) => rowKeySelector(row)}
        />
    );
}

/**
 * todo - deprecated - SampleList_v2 is generic, and may be used more easily
 */
export const SampleList: FunctionComponent<Props> = ({ samples, columns, renderActions, onRowSelectionChange }) => {
    const onRowSelectionChangeHandler = (_selectedRowKeys: any, selectedRows: Sample[]) => {
        // at the moment (antd 4.3.5) the selectedRowKeys are coming in as ReactText[]
        if (onRowSelectionChange) onRowSelectionChange(selectedRows);
    };

    const rowSelection: TableRowSelection<Sample> = {
        onChange: onRowSelectionChangeHandler,
        selections: [Table.SELECTION_ALL],
    };

    if (samples == null) {
        return <Skeleton active />;
    }

    let columnsType: ColumnsType<Sample>;

    if (renderActions) {
        columnsType = [...columns, getRenderObject(renderActions)];
    } else {
        columnsType = columns;
    }

    return <Table rowSelection={rowSelection} dataSource={samples} columns={columnsType} rowKey={(row) => row.id} />;
};

function getRenderObject<T>(renderActions: (record: T) => React.ReactNode) {
    return {
        title: 'Action',
        key: 'action',
        render: (_value: any, record: T, _index: number) => {
            return renderActions(record);
        },
    };
}

type ColumnFilterProps<T> = {
    filterIcon: (isFiltered: boolean) => React.ReactNode;
    filterDropdown: (filterProps: FilterDropdownProps) => React.ReactNode;
    onFilter: (value: string | number | boolean, record: T) => boolean;
    render: (text: string) => JSX.Element; // todo - this signature is not present in the official interface. Not sure why it works (if it works)
};

export function getAllFilterProps<T>(column: keyof T): ColumnFilterProps<T> {
    return {
        filterIcon: getFilterIcon,
        filterDropdown: (filterProps: FilterDropdownProps) => getFilterDropdown<T>(column, filterProps),
        onFilter: (value: string | number | boolean, record: T) => {
            return onFilter<T>(value, column, record);
        },
        render: renderFilteredColumnEntry,
    };
}

function getFilterDropdown<T>(column: keyof T, filterProps: FilterDropdownProps) {
    return (
        <div style={{ padding: 8 }}>
            <Input
                placeholder={`Search ${column}`}
                value={filterProps.selectedKeys[0]}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
                onChange={(e) => filterProps.setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => {
                    filterProps.confirm();
                }}
            ></Input>
            <Space />
            <Button
                type="primary"
                onClick={() => {
                    filterProps.confirm();
                }}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
                Search
            </Button>
            <Button
                size="small"
                style={{ width: 90 }}
                onClick={() => {
                    filterProps.clearFilters && filterProps.clearFilters();
                    // this.handleReset(clearFilters)
                }}
            >
                Reset
            </Button>
        </div>
    );
}

function getFilterIcon(isFiltered: boolean) {
    return (
        <SearchOutlined
            style={{
                // color: isFiltered ? '#1890ff' : undefined,
                color: isFiltered ? '#18ff18' : undefined,
            }}
        />
    );
}

function onFilter<T>(value: string | number | boolean, column: keyof T, record: T): boolean {
    if (!record[column]) return false;

    const entry: string = ((record[column] as unknown) as string).toLowerCase();
    const searchTerm = value.toString().toLowerCase();

    return entry.includes(searchTerm);
}

function renderFilteredColumnEntry(text: string): JSX.Element {
    // todo - here we should take from the state the search term and highlight in the word
    return <span>{text}</span>;
}
