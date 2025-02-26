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
  id: string;
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
    cell: ({ row }) => {
      const ori = row.original;
      return <CheckForm checked={ori.isVerified} id={ori.id} />
    }
  },
  {
    accessorKey: 'createdAt', header: "CreatedAt"
  },
]

export type team = {
  name: string;
  competition: CompetitionName | undefined;
  institution: string;
  leader: string;
  members: number;
}

export const teamColumn: ColumnDef<team>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'institution', header: 'Institution' },
  { accessorKey: 'competition', header: 'Competition' },
  { accessorKey: 'leader', header: 'Leader' },
  { accessorKey: 'members', header: 'Members' },
]

export type Account = {
  email: string;
  name: string;
  semester: number;
  // team: string | undefined;
  ktm: string | null;
  pdDikti: string | null;
  twibbon: string | null;
  id: string;
}

export const accountColumn: ColumnDef<Account>[] = [
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'semester', header: 'Semester' },
  // { accessorKey: 'team', header: 'Team' },
  {
    accessorKey: 'ktm', header: 'KTM', cell: ({ row }) => <WrapperImage
      src={row.getValue("ktm")}
      key={row.original.id + "ktm"}
    />
  },
  {
    accessorKey: 'pdDikti', header: 'Profile', cell: ({ row }) => <WrapperImage
      src={row.getValue("profile")}
      key={row.original.id + "profile"}
    />
  },
  {
    accessorKey: 'twibbon', header: 'Twibbon', cell: ({ row }) => <WrapperImage
      src={row.getValue("twibbon")}
      key={row.original.id + "twibbon"}
    />
  }
]