"use client";

import { type Branch } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<Branch>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "shortName",
    header: "Short Name",
  },
];

export default columns;
