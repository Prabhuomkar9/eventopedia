import React, { type FunctionComponent } from "react";
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
import { createEventSchema } from "~/server/schema/event";
import { api } from "~/utils/api";
import EventTable from "../../tables/eventTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { type Role } from "@prisma/client";

interface Props {
  role: Role;
}

const EventTab: FunctionComponent<Props> = ({ role }) => {
  const formSchema = createEventSchema;

  const createEvent = api.event.createEvent.useMutation({
    onSuccess: () => {
      toast.dismiss();
      toast.success("Added Event");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Adding Event Failed");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleOnSubmit = (data: z.infer<typeof formSchema>) => {
    toast.loading("Adding Event");
    createEvent.mutate({
      name: data.name,
      description: data.description,
      clubId: data.clubId,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex flex-row items-center justify-center gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Create Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
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
                        <Input placeholder="Event Name" {...field} />
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
                        <Input placeholder="Event Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clubId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Club ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Club ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Create Event</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <EventTable />
    </div>
  );
};

export default EventTab;
