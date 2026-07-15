"use client";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Input,
  Button,
  Label,
  Form,
  Select,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectPopover,
  ListBox,
  ListBoxItem,
} from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { uplodeImage } from "../../../utils/imageUplode";
import { redirect, useRouter } from "next/navigation";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router=useRouter()

  const onSubmit = async (data) => {
    // console.log(data.image,"data here");
    const imageFile=data.image[0]
    const imageUrl=await uplodeImage(imageFile);
    const { data: signupData, error } = await authClient.signUp.email({
      
      name:data.name,
      email:data.email,
      image:imageUrl,
      password:data.password,
      role:data.role
    });
    if(error){
      toast.error(error.message)
    }
    else{
      router.push("/")
    }
  };

  return (
    <Card className="w-full mx-auto my-5 max-w-lg border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4">
      <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
        <Logo />
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent">
          Create an Account
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Join Ticketo to book premium events or host your own organization.
        </p>
      </CardHeader>
      <CardBody className="gap-4">
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <label htmlFor="name">Full Name</label>
          <Input
            {...register("name", { required: "Name is Required" })}
            id="name"
            placeholder="John Doe"
            startContent={<FaUser className="text-slate-400 text-sm" />}
            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
          />
          {errors.name && <p className="text-red-400">{errors.name.message}</p>}
          <label htmlFor="email">Email Address</label>
          <Input
            {...register("email", { required: "email is Required" })}
            id="email"
            placeholder="john@example.com"
            type="email"
            startContent={<FaEnvelope className="text-slate-400 text-sm" />}
            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
          />
          {errors.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}
          <label htmlFor="image">Profile Image URL</label>
          <Input
            {...register("image", { required: "image is Required" })}
            id="image"
            type="file"
            accept="image/*"
            placeholder="https://example.com/avatar.jpg"
            startContent={<FaImage className="text-slate-400 text-sm" />}
            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
          />
          {errors.image && (
            <p className="text-red-400">{errors.image.message}</p>
          )}

          <label htmlFor="password">Password</label>
          <Input
            {...register("password", {
              required: "password is Required",
              maxLength: 12,
              minLength: 6,
            })}
            id="password"
            placeholder="••••••••"
            type="password"
            startContent={<FaLock className="text-slate-400 text-sm" />}
            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
          />
          {errors.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="role"
              className="text-sm font-semibold text-slate-300"
            >
              Select Role
            </label>
            <select
              id="role"
              {...register("role", { required: "Role is required" })}
              className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-2 rounded-3xl"
            >
              <option value="attendee">Attendee</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
            radius="lg"
          >
            Create Account
          </Button>
        </Form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-white/5" />
          <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">
            Or Sign Up With
          </span>
          <div className="flex-grow border-t border-white/5" />
        </div>

        <Button
          variant="bordered"
          className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-11"
          radius="lg"
          startContent={<FaGoogle className="text-pink-500" />}
        >
          Google OAuth
        </Button>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-pink-500 hover:text-pink-400 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
