"use client";

import {
	ChevronsLeft,
	MenuIcon,
	Plus,
	PlusCircle,
	Search,
	Settings,
	Trash,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { ComponentRef, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useMutation } from "convex/react";

import { cn } from "@/lib/utils";
import { UserItem } from "./user-item";
import { api } from "@/convex/_generated/api";
import { Item } from "./item";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const Navigation = () => {
	const pathname = usePathname();
	const isMobile = useMediaQuery("(max-width: 768px)");

	const create = useMutation(api.documents.create);

	const isResizingRef = useRef(false);
	const sidebarRef = useRef<ComponentRef<"aside">>(null);
	const navbarRef = useRef<ComponentRef<"div">>(null);
	const [isReseting, SetIsReseting] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(isMobile);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();

		isResizingRef.current = true;

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!isResizingRef.current) return;

		let newWidth = e.clientX;
		if (newWidth < 240) newWidth = 240;
		if (newWidth > 480) newWidth = 480;

		if (sidebarRef.current && navbarRef.current) {
			sidebarRef.current.style.width = `${newWidth}px`;
			navbarRef.current.style.left = `${newWidth}px`;
			navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
		}
	};

	const handleMouseUp = () => {
		isResizingRef.current = false;
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	};

	const resetWidth = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(false);
			SetIsReseting(true);

			sidebarRef.current.style.width = isMobile ? "100%" : "240px";
			navbarRef.current.style.width = isMobile ? "0" : "calc(100% - 240px)";
			navbarRef.current.style.left = isMobile ? "0" : "240px";

			setTimeout(() => SetIsReseting(false), 300);
		}
	};

	const collapse = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(true);
			SetIsReseting(true);

			sidebarRef.current.style.width = "0";
			navbarRef.current.style.width = "100%";
			navbarRef.current.style.left = "0";

			setTimeout(() => SetIsReseting(false), 300);
		}
	};

	const handleCreate = () => {
		const promise = create({ title: "Untitled" });
		toast.promise(promise, {
			loading: "Creating a new note...",
			success: "New note created!",
			error: "Failed to create new note",
		});
	};

	return (
		<>
			<aside
				ref={sidebarRef}
				className={cn(
					`group/sidebar h-screen bg-secondary overflow-y-auto 
            flex flex-col relative w-60 z-[99999] `,
					isReseting && "transiiton-all ease-in-out duration-300",
					isMobile && "w-0"
				)}
			>
				<div
					role="button"
					onClick={collapse}
					className={cn(
						`h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300
                dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 transition
                group-hover/sidebar:opacity-100`,
						isMobile && "opacity-100"
					)}
				>
					<ChevronsLeft className="h-6 w-6" />
				</div>

				<div>
					<UserItem />
					<Item onClick={() => {}} label="Search" icon={Search} isSearch />
					<Item onClick={() => {}} label="Settings" icon={Settings} />
					<Item onClick={handleCreate} label="New page" icon={PlusCircle} />
				</div>

				<div className="mt-4">
					<DocumentList />
					<Item label="Add a page" icon={Plus} onClick={handleCreate} />
					<Popover>
						<PopoverTrigger className="w-full mt-4">
							<Item label="Trash" icon={Trash} />
						</PopoverTrigger>
						<PopoverContent
							className="p-0 w-75"
							side={isMobile ? "bottom" : "right"}
						>
							<p>Trahs box</p>
						</PopoverContent>
					</Popover>
				</div>

				<div
					onMouseDown={handleMouseDown}
					onClick={resetWidth}
					className="opacity-0 group-hover/sidebar:opacity-100
            transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
				/>
			</aside>

			<div
				ref={navbarRef}
				className={cn(
					`
            absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]`,
					isReseting && "transition-all ease-in-out duration-300",
					isMobile && "w-full left-0"
				)}
			>
				<nav className="bg-transparent px-3 py-2 w-full">
					{isCollapsed && (
						<MenuIcon
							role="button"
							onClick={resetWidth}
							className="h-6 w-6 text-muted-foreground "
						/>
					)}
				</nav>
			</div>
		</>
	);
};

export default Navigation;
