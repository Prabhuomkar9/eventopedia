import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import SignOut from "~/components/auth/signOutBtn";
import NotFound from "./404";
import { api } from "~/utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { toast } from "sonner";
import { type z } from "zod";
import { updateMeSchema } from "~/server/schema/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";

const Profile: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();
  const { data: user, refetch: refetchMe } = api.user.getMe.useQuery();

  const updateMe = api.user.updateMe.useMutation({
    onSuccess: async (user) => {
      await refetchMe();
      setIsOpen(false);
      toast.dismiss();
      toast.success(`Updated ${user.name}'s profile successfully`);
    },
    onError: ({ message }) => {
      toast.dismiss();
      toast.error(message);
    },
  });

  const updateMeForm = useForm<z.infer<typeof updateMeSchema>>({
    resolver: zodResolver(updateMeSchema),
    defaultValues: {
      bio: user?.bio ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      usn: user?.usn ?? "",
    },
  });

  const handleOnSubmit = (data: z.infer<typeof updateMeSchema>) => {
    toast.loading(`Updating ${user?.name}'s Profile`);
    updateMe.mutate({
      bio: data.bio,
      branchId: data.branchId,
      clubId: data.clubId,
      phoneNumber: data.phoneNumber,
      usn: data.usn,
    });
  };

  if (!session || !user) return <NotFound />;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <Card>
        <CardHeader className="items-center">
          <CardTitle className="text-3xl">{user.name}</CardTitle>
          <CardDescription>{user.usn}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2">
          <div>Bio</div>
          <div>{user.bio ?? "-"}</div>
          <div>Branch</div>
          <div>{user.branch?.name ?? "-"}</div>
          <div>Role</div>
          <div>{user.role}</div>
          <div>Email</div>
          <div>{user.email}</div>
          <div>Phone Number</div>
          <div>{user.phoneNumber ?? "-"}</div>
          <div>Joined on:</div>
          <div>{user.joinedOn.toUTCString()}</div>
          <div>Updated at:</div>
          <div>{user.updatedAt.toUTCString()}</div>
        </CardContent>
      </Card>
      <div className="flex flex-row items-center justify-center gap-3">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Update</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Profile</DialogTitle>
            </DialogHeader>
            <Form {...updateMeForm}>
              <form
                className="flex flex-col items-center justify-center gap-5"
                onSubmit={updateMeForm.handleSubmit(handleOnSubmit)}
              >
                <FormField
                  control={updateMeForm.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input placeholder="Bio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateMeForm.control}
                  name="usn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>USN</FormLabel>
                      <FormControl>
                        <Input placeholder="USN" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateMeForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={10} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                            <InputOTPSlot index={6} />
                            <InputOTPSlot index={7} />
                            <InputOTPSlot index={8} />
                            <InputOTPSlot index={9} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Update</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <SignOut />
      </div>
    </div>
  );
};

export default Profile;
