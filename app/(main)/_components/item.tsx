"use cleint";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";

import {
	ChevronDownIcon,
	ChevronRightIcon,
	LucideIcon,
	MoreHorizontal,
	Plus,
	Trash,
} from "lucide-react";
import { toast } from "sonner";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";

interface ItemProps {
	id?: Id<"documents">;
	documentIcon?: string;
	active?: boolean;
	expanded?: boolean;
	isSearch?: boolean;
	level?: number;
	onExpand?: () => void;

	label: string;
	onClick?: () => void;
	icon: LucideIcon;
}

export const Item = ({
	label,
	onClick,
	icon: Icon,
	id,
	documentIcon,
	active,
	expanded,
	isSearch,
	level = 0,
	onExpand,
}: ItemProps) => {
	const router = useRouter();

	const create = useMutation(api.documents.create);
	const archive = useMutation(api.documents.archive);

	const { user } = useUser();

	const ChevronIcon: LucideIcon = expanded ? ChevronDownIcon : ChevronRightIcon;

	const handleExpand = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.stopPropagation();
		onExpand?.();
	};

	const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();

		if (!id) return;
		const promise = archive({ id });

		toast.promise(promise, {
			loading: "Moving to trash...",
			success: "Note moved to trash!",
			error: "Failed to archive",
		});
	};

	const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (!id) return;

		event.stopPropagation();
		const promise = create({ title: "Untitled", parentDocument: id }).then(
			(documentId) => {
				if (!expanded) onExpand?.();
				//router.push(`/documents/${documentId}`);
			}
		);

		toast.promise(promise, {
			loading: "Creating a new note...",
			success: "New note created!",
			error: "Failed to create new note",
		});
	};

	return (
		<div
			onClick={onClick}
			role="button"
			style={{
				paddingLeft: `${(level + 1) * 12}px`,
			}}
			className={cn(
				`group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5
                flex items-center text-muted-foreground font-medium`,
				active && "bg-primary/5 text-primary"
			)}
		>
			{!!id && (
				<div
					role="button"
					className="h-full rounded-sm hover:bg-neutral-300
                  dark:bg-neutral-600"
					onClick={handleExpand}
				>
					<ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
				</div>
			)}
			{documentIcon ? (
				<div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
			) : (
				<Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
			)}
			<span className="truncate">{label}</span>
			{isSearch && (
				<kbd
					className="ml-auto pointer-events-none inline-flex
                h-5 select-none items-center gap-1 rounded border bg-muted px-1.5
                font-mono text-[12px] font-medium text-muted-foreground"
				>
					<span className="text-lg">⌘</span>K
				</kbd>
			)}
			{!!id && (
				<div className="ml-auto flex items-center gap-x-2">
					<DropdownMenu>
						<DropdownMenuTrigger
							onClick={(e) => {
								e.stopPropagation();
							}}
							asChild
						>
							<div
								role="button"
								className="ml-auto opacity-0 group-hover:opacity-100
                                h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
							>
								<MoreHorizontal className="h-4 w-4 text-muted-foreground" />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							onClick={onArchive}
							className="w-60"
							align="start"
							side="right"
							forceMount
						>
							<DropdownMenuItem onClick={() => {}}>
								<Trash className="w-4 h-4 mr-2" />
								Delete
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<div className="text-xs text-muted-foreground p-2">
								Last edited by: {user?.username}
							</div>
						</DropdownMenuContent>
					</DropdownMenu>

					<div
						role="button"
						onClick={onCreate}
						className="opacity-0 group-hover:opacity-100 ml-auto
                    h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
					>
						<Plus className="h-4 w-4 text-muted-foreground" />
					</div>
				</div>
			)}
		</div>
	);
};

Item.skeleton = function ItemSkeleton({ level }: { level?: number }) {
	return (
		<div
			className="gap-x-2 flex py-[3px]"
			style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
		>
			<Skeleton className="h-4 w-4" />
			<Skeleton className="h-4 w-[30%]" />
		</div>
	);
};
