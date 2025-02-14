"use client";

import { useState } from "react";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";

export const TrahsBox = () => {
	const router = useRouter();
	const params = useParams();
	const documents = useQuery(api.documents.getTrash);
	const restore = useMutation(api.documents.restore);
	const remove = useMutation(api.documents.remove);

	const [search, setSearch] = useState("");

	const filteredDocuments = documents?.filter((doc) => {
		return doc.title.toLowerCase().includes(search.toLowerCase());
	});

	const onClick = (documentId: String) => {
		router.push(`/documents/${documentId}`);
	};

	const onRestore = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		documentId: Id<"documents">
	) => {
		event.stopPropagation();
		const promise = restore({ id: documentId });

		toast.promise(promise, {
			loading: "Restoring document...",
			success: "Document restored",
			error: "Failed to restore document",
		});
	};

	const onRemove = (documentId: Id<"documents">) => {
		const promise = remove({ id: documentId });

		toast.promise(promise, {
			loading: "Removing document...",
			success: "Document removed",
			error: "Failed to remove document",
		});

		if (params.id === documentId) {
			router.push("/documents");
		}
	};

	if (documents === undefined) {
		return (
			<div className="h-full flex items-center justify-center p-4">
				<Spinner size="lg" />
			</div>
		);
	}

	return (
		<div className="text-sm">
			<div className="flex items-center gap-x-1 p-2">
				<Search className="h-4 w-4" />
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
					placeholder="Filter by tittle.."
				/>
			</div>
			<div className="mt-2 px-1 pb-1">
				<p
					className="hidden last:block text-sm
                text-center test text-muted-foreground pb-2 "
				>
					No documents found
				</p>
				{filteredDocuments?.map((document) => {
					return (
						<div
							key={document._id}
							role="button"
							onClick={() => onClick(document._id)}
							className="text-sm rounded-sm hover:bg-primary/5 w-full
                            flex items-center justify-between"
						>
							<span className="truncate pl-2">{document.title}</span>
							<div className="flex items-center">
								<div
									role="button"
									className="rounded-sm p-2 hover:bg-neutral-200"
									onClick={(e) => onRestore(e, document._id)}
								>
									<Undo className="h-4 w-4 text-muted-foreground" />
								</div>
								<ConfirmModal
									onConfirm={() => {
										onRemove(document._id);
									}}
								>
									<div
										role="button"
										className="rounded-sm p-2 hover:bg-neutral-200"
									>
										<Trash className="h-4 w-4 text-muted-foreground" />
									</div>
								</ConfirmModal>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
