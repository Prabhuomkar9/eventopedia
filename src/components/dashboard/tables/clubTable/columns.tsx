"use client";

import { type Club } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<Club>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "presidentId",
    header: "President ID",
  },
];

export default columns;
