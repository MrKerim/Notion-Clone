import Image from "next/image";

export const Heroes = () => {
	return (
		<div className="max-w-5xl">
			<div className="flex gap-20 items-center">
				<div
					className="relative w-[250px] h-[250px]
                sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px]"
				>
					<Image
						className="object-cover"
						src="./heroes1.svg"
						fill
						alt="meeting image"
					/>
				</div>
				<div className="hidden md:block relative h-[300px] w-[380px]">
					<Image
						className="object-cover"
						fill
						src="./heroes2.svg"
						alt="meeting image"
					/>
				</div>
			</div>
		</div>
	);
};
