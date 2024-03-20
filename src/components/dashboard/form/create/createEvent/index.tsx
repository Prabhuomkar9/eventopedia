// import React from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "~/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "~/components/ui/form";
// import { Input } from "~/components/ui/input";
// import { createEventSchema } from "~/server/schema/event";
// import { api } from "~/utils/api";
// import { Label } from "~/components/ui/label";
// import { Calendar } from "~/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "~/components/ui/popover";
// import { CalendarIcon } from "lucide-react";
// import { format } from "date-fns";

// const CreateEventForm = () => {
//   const formSchema = createEventSchema;
//   const createEvent = api.event.createEvent.useMutation({
//     onSuccess: () => {
//       toast.dismiss();
//       toast.success("Added Event");
//     },
//     onError: () => {
//       toast.dismiss();
//       toast.error("Adding Event Failed");
//     },
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//   });

//   const handleOnSubmit = (data: z.infer<typeof formSchema>) => {
//     console.log("I am runnning");
//     toast.loading("Adding Event");
//     createEvent.mutate({
//       name: form.getValues("name"),
//       description: form.getValues("description"),
//       // startDateTime: form.getValues("startDateTime"),
//       // endDateTime: form.getValues("endDateTime"),
//       // clubId: form.getValues("clubId"),
//     });
//   };

//   return (
//     <Form {...form}>
//       <form
//         className="flex flex-col items-center justify-center gap-5"
//         onSubmit={(e) => {
//           e.preventDefault();
//           // console.log(form.getValues("startDateTime"));
//           form.handleSubmit(handleOnSubmit);
//         }}
//       >
//         <Label className="text-4xl font-bold">Create Event</Label>
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Event Name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <Input placeholder="Event Description" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {/* <FormField
//           control={form.control}
//           name="startDateTime"
//           render={({ field }) => (
//             <FormItem className="flex flex-col">
//               <FormLabel>Event Start Date</FormLabel>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       variant={"outline"}
//                       // TODO: remove the hardcoded width
//                       className={`w-[240px] ${!field.value && "text-muted-foreground"}`}
//                     >
//                       {field.value
//                         ? format(field.value, "PPP")
//                         : "Event Start Date"}
//                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={field.value}
//                     onSelect={field.onChange}
//                     disabled={(date) => date < new Date()}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="endDateTime"
//           render={({ field }) => (
//             <FormItem className="flex flex-col">
//               <FormLabel>Event End Date</FormLabel>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       variant={"outline"}
//                       // TODO: remove the hardcoded width
//                       className={`w-[240px] ${!field.value && "text-muted-foreground"}`}
//                     >
//                       {field.value
//                         ? format(field.value, "PPP")
//                         : "Event Start Date"}
//                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={field.value}
//                     onSelect={field.onChange}
//                     disabled={(date) =>
//                       date < new Date() ||
//                       date < form.getValues("startDateTime")
//                     }
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//               <FormMessage />
//             </FormItem>
//           )}
//         /> */}
//         <Button type="submit">Create Event</Button>
//       </form>
//     </Form>
//   );
// };

// export default CreateEventForm;

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
import { createEventSchema } from "~/server/schema/event";
import { api } from "~/utils/api";
import { Label } from "~/components/ui/label";

const CreateEventForm = () => {
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
      name: form.getValues("name"),
      description: form.getValues("description"),
      // clubId: "cltzwqdff0001r1zm7p7hsjor",
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center justify-center gap-5"
        onSubmit={form.handleSubmit(handleOnSubmit)}
      >
        <Label className="text-4xl font-bold">Create Event</Label>
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
  );
};

export default CreateEventForm;
