"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function AuthButton() {
  function handleClick() {
    signOut();
  }

  return (
    <div>
      <Button onClick={handleClick} variant={"primary"} className="w-full">
        Keluar
      </Button>
    </div>
  );
}
