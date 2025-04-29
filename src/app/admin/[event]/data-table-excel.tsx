"use client";

import { DataTable, DataTableProps } from '@/components/data-table';
import GradientButton from '@/components/ui/button/bg-gradient';
import React, { useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';

export default function DataTableExcel<TData, TValue>({ title, columns, data }: DataTableProps<TData, TValue> & { title: string }) {

  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: title,
    sheet: "List",
  });

  return (
    <>
      <GradientButton variant='outline' containerClassName='mb-2' onClick={onDownload}>Download Excel</GradientButton>
      <DataTable columns={columns} data={data} ref={tableRef} />
    </>
  )
}