// "use client"

import { Button } from "@/components/ui/button";
// import { authClient } from "@/lib/auth-client"
import { caller } from "@/trpc/server";
import { requireAuth } from "@/lib/auth-utils"
import { LogoutButton } from "./LogoutButton";

const Page = async () => {
  await requireAuth()

  const data = await caller.getUsers()

  return (
    <div className = "min-h-screen min-w-screen flex items-center justify-center"
    >
      {JSON.stringify(data,null,2)}
      {/* {
        data && ( 
          <Button onClick = {()=>authClient.signOut()}>
            LogOut
          </Button>
        )
      } */}
      Protected Server Component
      <LogoutButton/>
    </div>
  );
}

export default Page