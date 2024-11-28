"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Validation schema with Zod
const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password is required"),
});

type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FormData, setError: (msg: string) => void) => {
    try {
      const response = await fetch("https://localhost:7071/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        // Handle non-200 responses
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        return;
      }
  
      const responseData = await response.json();
      // Example of storing the token locally
      localStorage.setItem("authToken", responseData.token);
      toast(`Welcome, ${responseData.email}`);
      router.push("/search");
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, setErrorMessage))}
      className="space-y-4"
    >
      <div>
        <label htmlFor="email" className="block text-darkSeaGreen text-sm leading-4 mb-2">
          Email
        </label>
        <Input
          id="email"
          type="email"
          variant="text"
          {...register("email")}
          className="w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-darkSeaGreen text-sm leading-4 mb-2">
          Password
        </label>
        <Input
          id="password"
          type="password"
          variant="text"
          {...register("password")}
          className="w-full"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <Button type="submit" className="w-full cc-btn cc-btn--glow">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
