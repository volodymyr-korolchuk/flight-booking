"use client"

// components/LoginForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// Validation schema with Zod
const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password is required"),
});

type FormData = z.infer<typeof schema>;

const onSubmit = async (data: FormData) => {
    //
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block">Email</label>
        <Input id="email" type="email" {...register("email")} className="w-full" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block">Password</label>
        <Input id="password" type="password" {...register("password")} className="w-full" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full">Login</Button>
    </form>
  );
};

export default LoginForm;
