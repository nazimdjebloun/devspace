import React from 'react'
import ProfileSideCard from './profilesidecard'
import Link  from 'next/link';
import { Button } from '../ui/button';
import { Separator } from '@radix-ui/react-dropdown-menu';
import Singout from '../singout';
import { Menu } from "lucide-react";
import UserMenu from '../UserMenu';
import { useSession } from "@/lib/auth-client";


export default function Sidenav() {
      const { data: session, isPending, error, refetch } = useSession();
  
  return (
    <div className="flex justify-start flex-col gap-5  h-dvh">
      {session && (
        <>
          <div className="flex justify-between">
            <UserMenu />
            <Link href="/createpost" className="text-center">
              <Button> + Create post </Button>
            </Link>
          </div>
          <Separator className="h-0.5 bg-accent w-full" />
        </>
      )}
      <div>
        <ProfileSideCard />
        {/* <Separator className="mt-5 h-0.5 bg-accent w-full" /> */}
        {/* <Singout /> */}
      </div>
    </div>
  );
}
