import React, { type FunctionComponent, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Check, ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { api } from "~/utils/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { type Event, type Club, type User } from "@prisma/client";
import { type Row } from "@tanstack/react-table";

interface Props {
  row: Row<Event & { club: Club; organisers: User[] }>;
}

const Action: FunctionComponent<Props> = ({ row }) => {
  const event = row.original;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

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

  const { data: users } = api.user.getAllUsers.useQuery();

  return (
    <Dialog>
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
          <DropdownMenuItem>
            <DialogTrigger>Add Organiser</DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add organiser to {event.name}</DialogTitle>
          <DialogDescription>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? users?.find((user) => user.name === value)?.name
                    : "Select framework..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {users?.map((user) => (
                      <CommandItem
                        key={user.id}
                        value={user.name!}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === user.name ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {user.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Action;
