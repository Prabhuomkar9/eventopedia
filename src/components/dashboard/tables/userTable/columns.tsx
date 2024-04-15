"use client";

import { type User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { toast } from "sonner";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="text-center">{row.original.role}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      const promote = api.role.promote.useMutation({
        onSuccess: (user) => {
          toast.dismiss();
          toast.success(`Successfully promoted ${user.name} to ${user.role}`);
        },
        onError: (error) => {
          toast.dismiss();
          toast.error(error.message);
        },
      });

      const demote = api.role.demote.useMutation({
        onSuccess: (user) => {
          toast.dismiss();
          toast.success(`Successfully demoted ${user.name} to ${user.role}`);
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
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy User ID
            </DropdownMenuItem>
            {user.role !== "ADMIN" && (
              <DropdownMenuItem
                onClick={() => {
                  toast.loading("Promoting user");
                  promote.mutate({ userId: user.id });
                }}
              >
                Promote
              </DropdownMenuItem>
            )}
            {user.role !== "USER" && (
              <DropdownMenuItem
                onClick={() => {
                  toast.loading("Demoting user");
                  demote.mutate({ userId: user.id });
                }}
              >
                Demote
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
