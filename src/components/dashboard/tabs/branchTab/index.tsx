import React, { type FunctionComponent, useState } from "react";
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
import { Input } from "~/components/ui/input";
import { createBranchSchema } from "~/server/schema/branch";
import { api } from "~/utils/api";
import BranchTable from "../../tables/branchTable";
import { type Role } from "@prisma/client";

interface Props {
  role: Role;
}

const BranchTab: FunctionComponent<Props> = ({ role }) => {
  const [open, setOpen] = useState<boolean>(false);

  const createBranch = api.branch.createBranch.useMutation({
    onSuccess: ({ name }) => {
      setOpen(false);
      toast.dismiss();
      toast.success(`Added branch ${name} successfully`);
    },
    onError: ({ message }) => {
      toast.dismiss();
      toast.error(message);
    },
  });

  const createBranchForm = useForm<z.infer<typeof createBranchSchema>>({
    resolver: zodResolver(createBranchSchema),
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

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex flex-row items-center justify-center gap-10">
        <Dialog open={open} onOpenChange={setOpen}>
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
      </div>
      <BranchTable />
    </div>
  );
};

export default BranchTab;
