import React from "react";
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
import { Input } from "~/components/ui/input";
import { createClubSchema } from "~/server/schema/club";
import { api } from "~/utils/api";
import ClubTable from "../../tables/clubTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

const ClubTab = () => {
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
  });

  const handleOnSubmit = (data: z.infer<typeof formSchema>) => {
    toast.loading("Adding Club");
    createClub.mutate({
      name: data.name,
      description: data.description,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex flex-row items-center justify-center gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Create Club</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Club</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                className="flex flex-col items-center justify-center gap-5"
                onSubmit={form.handleSubmit(handleOnSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Club Name" {...field} />
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
                        <Input placeholder="Club Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Create Club</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <ClubTable />
    </div>
  );
};

export default ClubTab;
