"use client";

import { CompetitionName, EventDay, EventRegInstitution } from '@prisma/client';
import { ColumnDef } from "@tanstack/react-table";
import WrapperImage from './image';
import { CheckForm } from './form';
import CheckboxForm from './[event]/checkbox-form';
// import { DataTableColumnHeader } from '@/components/column-header';

export type Registration = {
  team: string;
  competition: CompetitionName;
  payment: string;
  isVerified: boolean;
  id: string;
  phoneNumber: string;
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
    cell: ({ row }) => {
      const ori = row.original;
      return <CheckForm checked={ori.isVerified} id={ori.id} />
    }
  },
  {
    accessorKey: 'phoneNumber', header: "Phone Number"
  },
  {
    accessorKey: 'createdAt', header: "Created At"
  }
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

export type teacher = {
  name: string;
  email: string;
  gender: string;
  phoneNumber: string;
  NUPTK: string;
  team: string;
}

export const teacherColumn: ColumnDef<teacher>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'phoneNumber', header: 'Phone Number' },
  { accessorKey: 'NUPTK', header: 'NUPTK' },
  { accessorKey: 'team', header: 'Team' },
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

export const eventColumn: ColumnDef<{ name: string, phoneNumber: string, institutionType: EventRegInstitution, nim: string | null, institutionName: string | null, followIG: string, updatedAt: Date, email: string | null, day: EventDay | null, id: string, checked: boolean }>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'checked', header: "Checked", cell: ({row}) => <CheckboxForm checked={row.getValue("checked")} id={row.original.id} /> },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'day', header: 'Day', cell: ({ row }) => typeof (row.getValue('day')) === "string" ? (row.getValue('day') as string).replace("_", " ") : "-" },
  { accessorKey: 'phoneNumber', header: () => <div className="text-nowrap">Phone Number</div> },
  { accessorKey: 'institutionType', header: 'Institution' },
  { accessorKey: 'nim', header: 'NIM', cell: ({ row }) => row.getValue("nim") ? row.getValue("nim") : "N/A" },
  { accessorKey: 'institutionName', header: 'Campus', cell: ({ row }) => row.getValue("institutionName") ? row.getValue("institutionName") : "N/A" },
  {
    accessorKey: 'followIG', header: () => <div className="text-nowrap">SS Follow IG</div>, cell: ({ row }) => <WrapperImage
      src={row.getValue("followIG")}
      key={row.original.name + "followIG"}
    />
  },
  { accessorKey: 'updatedAt', header: () => <div className="text-nowrap">Updated At</div>, cell: ({ row }) => new Date(row.getValue("updatedAt")).toLocaleDateString() }
]