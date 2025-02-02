"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
	const { isAuthenticated, isLoading } = useConvexAuth();
	return (
		<div className="max-w-3xl space-y-4">
			<h1 className="text-3xl sm:text-4xl  md:text-5xl font-bold">
				No need to switch monitors, all you have is here. Welcome to{" "}
				<span className="underline">Lotion</span>
			</h1>
			<h3 className="text-base sm:text-xl md:text-2xl font-medium">
				Lotion is the place where you take all your work
				<br />
				and manage from one unified workspace
			</h3>

			{isLoading && (
				<div className="w-full items-center justify-center flex ">
					<Spinner size="lg" />
				</div>
			)}
			{isAuthenticated && !isLoading && (
				<Button asChild>
					<Link href="/documents">
						Enter Lotion
						<ChevronRight className="h-4 w-4 " />
					</Link>
				</Button>
			)}
			{!isAuthenticated && !isLoading && (
				<SignInButton mode="modal">
					<Button>
						Get Lotion Free
						<ChevronRight className="h-4 w-4 " />
					</Button>
				</SignInButton>
			)}
		</div>
	);
};
