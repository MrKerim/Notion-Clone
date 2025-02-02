"use client";

import { ChevronsLeftRight } from "lucide-react";

import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sign } from "crypto";

export const UserItem = () => {
	const { user } = useUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div
					role="button"
					className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
				>
					<div className="gap-x-2 flex items-center max-w-[150px]">
						<Avatar className="h-6 w-6">
							<AvatarImage src={user?.imageUrl} />
						</Avatar>
						<span className="text-start font-semibold line-clamp-1">
							{user?.username}'s Lotion
						</span>
					</div>
					<ChevronsLeftRight className="h-4 w-4 ml-2 text-muted-foreground rotate-90" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-80"
				align="start"
				forceMount
				alignOffset={11}
			>
				<div className="flex flex-col space-y-4 p-2">
					<p className="text-xs font-semibold leading-none text-muted-foreground">
						{user?.emailAddresses[0]?.emailAddress
							? user?.emailAddresses[0]?.emailAddress
							: "No email registered"}
					</p>
					<div className="flex gap-x-2 items-center mr-2">
						<div className="rounded-md bg-secondary p-1">
							<Avatar className="h-8 w-8">
								<AvatarImage src={user?.imageUrl} />
							</Avatar>
						</div>
						<div className="space-y-1">
							<p className="line-clamp-1 font-semibold text-sm">
								{user?.username}'s Lotion
							</p>
						</div>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					asChild
					className="w-full cursor-pointer text-muted-foreground"
				>
					<SignOutButton>Log out</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
