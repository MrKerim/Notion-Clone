import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export const Footer = () => {
	return (
		<div className="flex dark:bg-[#1f1f1f] items-center w-full p-2 bg-background z-50">
			<Logo />
			<div
				className="md:ml-auto w-full items-center justify-between
            md:justify-end flex gap-x-2 text-muted-foreground"
			>
				<Button size="sm" variant="ghost">
					Privacy Poicy
				</Button>
				<Button size="sm" variant="ghost">
					Terms & Conditions
				</Button>
			</div>
		</div>
	);
};
