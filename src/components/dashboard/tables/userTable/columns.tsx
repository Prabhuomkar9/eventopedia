"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

export default columns;
