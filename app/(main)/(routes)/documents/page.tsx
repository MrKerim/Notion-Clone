"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentsPage = () => {
	const { user } = useUser();
	const create = useMutation(api.documents.create);

	const onCreate = async () => {
		const promise = create({ title: "Untitled" });
		toast.promise(promise, {
			loading: "Creating a new note...",
			success: "New note created!",
			error: "Failed to create new note",
		});
	};

	return (
		<div className="h-screen flex flex-col items-center justify-center space-y-4">
			<Image
				width="300"
				height="300"
				alt="New document"
				src="new_document.svg"
			/>
			<h2 className="text-lg font-semibold">
				Welcome to {user?.username}'s Lotion
			</h2>
			<Button onClick={onCreate}>
				<PlusCircleIcon className="h-4 w-4 mr-2" />
				Create a note
			</Button>
		</div>
	);
};

export default DocumentsPage;
