import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import { Input } from "~/components/ui/input";
import { createBranchSchema } from "~/server/schema/branch";
import { api } from "~/utils/api";
import { Label } from "~/components/ui/label";

const CreateBranchForm = () => {
  const formSchema = createBranchSchema;
  const createBranch = api.branch.createBranch.useMutation({
    onSuccess: () => {
      toast.dismiss();
      toast.success("Added Branch");
    },
    onError: (error) => {
      console.log(error.data, error.message, error.shape);
      toast.dismiss();
      toast.error("Adding Branch Failed");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleOnSubmit = (data: z.infer<typeof formSchema>) => {
    toast.loading("Adding Branch");
    createBranch.mutate({
      name: form.getValues("name"),
      shortName: form.getValues("shortName"),
      description: form.getValues("description"),
      location: form.getValues("location"),
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center justify-center gap-5"
        onSubmit={form.handleSubmit(handleOnSubmit)}
      >
        <Label className="text-4xl font-bold">Create Branch</Label>
        <FormField
          control={form.control}
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
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Branch Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
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
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Branch</Button>
      </form>
    </Form>
  );
};

export default CreateBranchForm;
