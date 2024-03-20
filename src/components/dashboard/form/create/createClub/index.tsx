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
import { Label } from "~/components/ui/label";

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
        className="flex flex-col items-center justify-center gap-5"
        onSubmit={handleOnSubmit}
      >
        <Label className="text-4xl font-bold">Create Club</Label>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Club Name" {...field} />
              </FormControl>
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
                <Input placeholder="Club Description" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Create Club</Button>
      </form>
    </Form>
  );
};

export default CreateClubForm;
