import React, { FormEvent } from "react";
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
import { createClubSchema } from "~/server/schema/club";
import { api } from "~/utils/api";

const CreateClubForm = () => {
  const formSchema = createClubSchema;
  const createClub = api.club.createClub.useMutation({
    onSuccess: () => {
      toast.dismiss();
      toast.success("Added Club");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Adding Club Failed");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Adding Club");
    createClub.mutate({
      name: form.getValues("name"),
      description: form.getValues("description"),
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
                <Input placeholder="Club Name" {...form} />
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
                <Input placeholder="Club Description" {...form} />
              </FormControl>
              <FormDescription>Description</FormDescription>
              <FormMessage>Message</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Create Club</Button>
      </form>
    </Form>
  );
};

export default CreateClubForm;
