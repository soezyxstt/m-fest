"use client";

import { CompetitionName } from '@prisma/client';
import { ColumnDef } from "@tanstack/react-table";
import WrapperImage from './image';
import { CheckForm } from './form';
// import { DataTableColumnHeader } from '@/components/column-header';

export type Registration = {
  team: string;
  competition: CompetitionName;
  payment: string;
  isVerified: boolean;
  createdAt: string;
};
export const registrationColumn: ColumnDef<Registration>[] = [
  {
    accessorKey: 'team', header: "Team"
  },
  { accessorKey: 'competition', header: 'Competition' },
  {
    accessorKey: 'payment', header: "Payment", cell: ({ row }) => <WrapperImage
      src={row.getValue("payment")} />
  },
  {
    accessorKey: 'isVerified', header: "IsVerified",
    cell: ({ row }) => <CheckForm
      checked={row.getValue("isVerified")} id={row.id} />
  },
  {
    accessorKey: 'createdAt', header: "CreatedAt"
  },
]

export type team = {
  name: string;
  competition: CompetitionName;
  institution: string;
  leader: string;
  members: number;
}

export const teamColumn: ColumnDef<Registration>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'institution', header: 'Institution' },
  { accessorKey: 'isRegistered', header: 'IsRegistered' },
  { accessorKey: 'leader', header: 'Leader' },
  { accessorKey: 'members', header: 'Members' },
]

export type Account = {
  email: string;
  name: string;
  semester: string;
  team: string;
}

export const accountColumn: ColumnDef<Registration>[] = [
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'semester', header: 'Semester' },
  { accessorKey: 'team', header: 'Team' },
]