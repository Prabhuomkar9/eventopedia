"use client";

import { type Club, type Event, type User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { api } from "~/utils/api";
import { toast } from "sonner";

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
    accessorKey: "eventType",
    header: "Event Type",
    cell: ({ row }) => <div>{row.original.eventType}</div>,
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
      const event = row.original;

      const publishEvent = api.event.publishEvent.useMutation({
        onSuccess: (event) => {
          toast.dismiss();
          toast.success(`Event ${event.name} published successfully`);
        },
        onError: (error) => {
          toast.dismiss();
          toast.error(error.message);
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(event.id)}
            >
              Copy Event ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(event.club.id)}
            >
              Copy Club ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toast.loading("Publishing event...");
                publishEvent.mutate({ id: event.id });
              }}
            >
              Publish Event
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
