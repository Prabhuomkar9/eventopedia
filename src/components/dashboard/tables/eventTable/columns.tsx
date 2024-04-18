"use client";

import React from "react";
import { type Club, type Event, type User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import Action from "./action";

const columns: ColumnDef<
  Event & {
    club: Club;
    organisers: User[];
  }
>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "eventState",
    header: "Event State",
    cell: ({ row }) => <div>{row.original.eventState}</div>,
  },
  {
    id: "club",
    header: "Club",
    cell: ({ row }) => <div>{row.original.club.name}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <Action row={row} />;
    },
  },
];

export default columns;
