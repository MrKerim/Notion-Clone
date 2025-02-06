"use client";

import { useSettings } from "@/hooks/use-settings";
import { Dialog, DialogHeader, DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { ModeToggle } from "../mode-toggle";

export const SettingsModal = () => {
	const settings = useSettings();

	return (
		<Dialog onOpenChange={settings.onClose} open={settings.isOpen}>
			<DialogContent>
				<DialogHeader className="pb-3 border-b">
					<h2>My Settings</h2>
				</DialogHeader>
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-1">
						<Label>Appearance</Label>
						<span className="text-[0.8rem] text-muted-foreground">
							Customize how Lotion looks on your device
						</span>
					</div>
					<ModeToggle />
				</div>
			</DialogContent>
		</Dialog>
	);
};
