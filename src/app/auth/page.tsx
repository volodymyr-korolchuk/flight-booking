"use client"

import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("sign-up"); // Default to login tab

  // Determine the active tab based on the URL hash
  useEffect(() => {
    if (window.location.hash === "#register") {
      setActiveTab("sign-in"); // Switch to registration tab
    } else {
      setActiveTab("sign-up"); // Default to login tab
    }
  }, []);

  const onTabValueChange = (value: string) => {
    setActiveTab(value);
    if(value === "sign-in") {
      window.history.replaceState(null, "", "/auth#register");
    } else {
      window.history.replaceState(null, "", "/auth");
    }
  };

  return (
    <div className="mx-auto flex h-screen max-w-[600px] px-10 pb-10 pt-40 items-start">
      <Tabs
        className="flex w-full flex-col justify-around"
        defaultValue="sign-up"
        value={activeTab}
        onValueChange={onTabValueChange}
      >
        <TabsList className="grid grid-cols-2 bg-transparent pb-8">
          <TabsTrigger
            className="
                relative overflow-visible !bg-transparent py-2 !shadow-none 
                before:absolute before:left-1/2 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full 
                before:bg-darkSeaGreen before:opacity-0 before:transition-all 
                [&[data-state='active']]:before:w-8 
                [&[data-state='active']]:before:-translate-y-6 
                [&[data-state='active']]:before:opacity-100 
                [&[data-state='active']]:before:content-['']
              "
            value="sign-up"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            className="
                relative overflow-visible !bg-transparent py-2 !shadow-none 
                before:absolute before:left-1/2 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full 
                before:bg-darkSeaGreen before:opacity-0 before:transition-all 
                [&[data-state='active']]:before:w-8 
                [&[data-state='active']]:before:-translate-y-6 
                [&[data-state='active']]:before:opacity-100 
                [&[data-state='active']]:before:content-['']
              "
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
