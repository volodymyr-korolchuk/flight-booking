import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import React from "react";

const Auth = () => {
  return (
    <div className="grid grid-cols-2 gap-6 p-10 items-center justify-center h-full">
      <Tabs
        className="flex w-full flex-col justify-around"
        defaultValue="sign-up"
      >
        <TabsList className="grid grid-cols-2 bg-transparent pb-12">
          <TabsTrigger
            className="relative overflow-visible !bg-transparent py-2 !shadow-none before:absolute before:h-2 before:w-2 before:rounded-full before:bg-darkSeaGreen before:opacity-0 before:transition-all [&[data-state='active']]:before:w-8 [&[data-state='active']]:before:-translate-y-6 [&[data-state='active']]:before:opacity-100 [&[data-state='active']]:before:content-['']"
            value="sign-up"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            className="relative overflow-visible !bg-transparent py-2 !shadow-none before:absolute before:h-2 before:w-2 before:rounded-full before:bg-darkSeaGreen before:opacity-0 before:transition-all [&[data-state='active']]:before:w-8 [&[data-state='active']]:before:-translate-y-6 [&[data-state='active']]:before:opacity-100 [&[data-state='active']]:before:content-['']"
            value="sign-in"
          >
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sign-up">
          <LoginForm />
        </TabsContent>
        <TabsContent value="sign-in">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
