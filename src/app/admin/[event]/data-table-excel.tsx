"use client";

import { DataTable, DataTableProps } from '@/components/data-table';
import GradientButton from '@/components/ui/button/bg-gradient';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useRef, useState } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';

export default function DataTableExcel<TData, TValue>({ title, columns, data, datas }: DataTableProps<TData, TValue> & { title: string, datas: { institutionType: 'ITB' | 'NON_ITB' | 'UMUM' }[] }) {

  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: title,
    sheet: "List",
  });

  const [val, setVal] = useState<'table' | 'recap'>('table')

  return (
    <>
      <div className="mb-2 flex justify-between text-white">
        <GradientButton variant='outline' onClick={onDownload}>Download Excel</GradientButton>
        <Select value={val} onValueChange={(value) => { setVal(value as 'table' | 'recap') }}>
          <SelectTrigger className='w-44 text-white border-white'>
            <SelectValue className='placeholder:text-white w-44' placeholder="Select Format" />
          </SelectTrigger>
          <SelectContent className='text-white bg-white/10 backdrop-blur-sm text-sm'>
            <SelectItem value="table">Tabel</SelectItem>
            <SelectItem value="recap">Recap</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {val === 'recap' &&
        <div className="space-y-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Total Registrant</TableCell>
                <TableCell>{data.length}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ITB Registrant</TableCell>
                <TableCell>{datas.filter((v) => v.institutionType === 'ITB').length}</TableCell>
              </TableRow>
                <TableRow>
                <TableCell>NON-ITB Registrant</TableCell>
                <TableCell>{datas.filter((v) => v.institutionType === 'NON_ITB').length}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>UMUM Registrant</TableCell>
                <TableCell>{datas.filter((v) => v.institutionType === 'UMUM').length}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </div>
      }
      {val === 'table' &&
        <DataTable columns={columns} data={data} ref={tableRef} />
      }    </>
  )
}