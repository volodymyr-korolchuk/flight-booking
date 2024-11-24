"use client";

// components/RegisterForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Validation schema with Zod
const schema = z.object({
  lastName: z.string().min(1, "First name is required"),
  firstName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("https://localhost:7071/api/account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      // Check if the response is not ok (status code not in 200-299 range)
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        setErrorMessage(errorData.detail || "Registration failed. Please try again.");
        return;
      }
  
      const responseData = await response.json();
      alert(`Welcome, ${responseData.name}! Registration successful.`);
      router.push('auth');
      location.reload();
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error("Error during registration:", error);
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="firstName" className="block text-darkSeaGreen text-sm leading-4 mb-2">
            First Name
          </label>
          <Input id="firstName" variant="text" {...register("firstName")} className="w-full" />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="flex-1">
          <label htmlFor="lastName" className="block text-darkSeaGreen text-sm leading-4 mb-2">
            Last Name
          </label>
          <Input id="lastName" variant="text" {...register("lastName")} className="w-full" />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>
      

      <div>
        <label htmlFor="email" className="block text-darkSeaGreen text-sm leading-4 mb-2">
          Email
        </label>
        <Input id="email" type="email" variant="text" {...register("email")} className="w-full" />
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

      <Button type="submit" variant="primary" className="w-full">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
