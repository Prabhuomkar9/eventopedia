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
import { createEventSchema } from "~/server/schema/event";
import { api } from "~/utils/api";
import { Label } from "~/components/ui/label";
import EventTable from "../../tables/eventTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

const EventTab = () => {
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
      // clubId: "cltzwqdff0001r1zm7p7hsjor",
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

//  const [eventId, setEventId] = useState<string>("");

//  const publishEvent = api.ev ent.publishEvent.useMutation({
//    onSuccess: () => {
//      toast.dismiss();
//      toast.success("Published Event");
//    },
//    onError: (error) => {
//      console.log(error.data, error.message, error.shape);
//      toast.dismiss();
//      toast.error("Publishing Event Failed");
//    },
//  });
//  return (
//    <>
//      <CreateEventForm />
//      <h1 className="mt-10 text-4xl">Plublish Event</h1>
//      <Input
//        placeholder="Event Id"
//        onChange={(e) => setEventId(e.target.value)}
//        value={eventId}
//      />
//      <Button
//        onClick={() => {
//          toast.loading("Publishing Event");
//          publishEvent.mutate({ id: eventId });
//        }}
//      >
//        Publish
//      </Button>
//    </>
//  );
