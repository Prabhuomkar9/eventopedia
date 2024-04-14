import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Dialog,
  DialogContent,
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

import { Input } from "~/components/ui/input";
import { createBranchSchema } from "~/server/schema/branch";
import { updateBranchSchema } from "~/server/schema/branch";
import { api } from "~/utils/api";
import BranchTable from "../../tables/branchTable";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";

const BranchTab = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const { data: branches } = api.branch.getAllBranches.useQuery();

  const createBranch = api.branch.createBranch.useMutation({
    onSuccess: ({ name }) => {
      toast.dismiss();
      toast.success(`Added branch ${name} successfully`);
    },
    onError: ({ message }) => {
      toast.dismiss();
      toast.error(message);
    },
  });

  const updateBranch = api.branch.updateBranch.useMutation({
    onSuccess: ({ name }) => {
      toast.dismiss();
      toast.success(`Updated branch ${name} successfully`);
    },
    onError: ({ message }) => {
      toast.dismiss();
      toast.error(message);
    },
  });

  const createBranchForm = useForm<z.infer<typeof createBranchSchema>>({
    resolver: zodResolver(createBranchSchema),
  });

  const updateBranchForm = useForm<z.infer<typeof updateBranchSchema>>({
    resolver: zodResolver(updateBranchSchema),
  });

  const handleOnSubmitCreateBranch = (
    data: z.infer<typeof createBranchSchema>,
  ) => {
    toast.loading("Adding Branch");
    createBranch.mutate({
      name: data.name,
      shortName: data.shortName,
    });
  };

  const handleOnSubmitUpdateBranch = (
    data: z.infer<typeof updateBranchSchema>,
  ) => {
    toast.loading("Updating Branch");
    updateBranch.mutate({
      id: data.id,
      name: data.name,
      shortName: data.shortName,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex flex-row items-center justify-center gap-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Create Branch</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Branch</DialogTitle>
            </DialogHeader>
            <Form {...createBranchForm}>
              <form
                className="flex flex-col items-center justify-center gap-5"
                onSubmit={createBranchForm.handleSubmit(
                  handleOnSubmitCreateBranch,
                )}
              >
                <FormField
                  control={createBranchForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Branch Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createBranchForm.control}
                  name="shortName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Short Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Create</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Update Branch</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Branch</DialogTitle>
            </DialogHeader>
            <Form {...updateBranchForm}>
              <form
                className="flex flex-col items-center justify-center gap-5"
                onSubmit={updateBranchForm.handleSubmit(
                  handleOnSubmitUpdateBranch,
                )}
              >
                <FormField
                  control={updateBranchForm.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-[200px] justify-between"
                            >
                              {!branches
                                ? "Loading"
                                : value
                                  ? branches.find(
                                      (branch) => branch.name === value,
                                    )?.name
                                  : "Select branch..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search framework..." />
                              <CommandEmpty>No branch found</CommandEmpty>
                              <CommandGroup>
                                {!branches
                                  ? "No Results Found"
                                  : branches.map((branch) => (
                                      <CommandItem
                                        key={branch.name}
                                        value={branch.name}
                                        onSelect={(currentValue: string) => {
                                          setValue(
                                            currentValue === value
                                              ? ""
                                              : currentValue,
                                          );
                                          field.onChange(currentValue);
                                          setOpen(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            value === branch.name
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                        {branch.name}
                                      </CommandItem>
                                    ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateBranchForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Branch Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateBranchForm.control}
                  name="shortName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Short Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="self-end" type="submit">
                  Update
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog> */}
      </div>
      <BranchTable />
    </div>
  );
};

export default BranchTab;
