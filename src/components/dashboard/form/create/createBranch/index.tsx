import React, { type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { createBranchSchema } from "~/server/schema/branch";
import { api } from "~/utils/api";

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
    defaultValues: {
      name: "",
      shortName: "",
      description: "",
      location: "",
    },
  });

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        className="flex flex-row items-center justify-center gap-5"
        onSubmit={handleOnSubmit}
      >
        <FormField
          control={form.control}
          name="name"
          render={() => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Branch Name" {...form} />
              </FormControl>
              <FormDescription>Description</FormDescription>
              <FormMessage>Message</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={() => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Branch Description" {...form} />
              </FormControl>
              <FormDescription>Description</FormDescription>
              <FormMessage>Message</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortName"
          render={() => (
            <FormItem>
              <FormLabel>Short Name</FormLabel>
              <FormControl>
                <Input placeholder="Short Name" {...form} />
              </FormControl>
              <FormDescription>Description</FormDescription>
              <FormMessage>Message</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={() => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...form} />
              </FormControl>
              <FormDescription>Description</FormDescription>
              <FormMessage>Message</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Create Branch</Button>
      </form>
    </Form>
  );
};

export default CreateBranchForm;
