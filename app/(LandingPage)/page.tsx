import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";

const LandingPage = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<div
				className="flex flex-col items-center flex-1 px-6 pb-10
             justify-center md:justify-start text-center gap-y-8"
			>
				<Heading />
				<Heroes />
			</div>
			<Footer />
		</div>
	);
};

export default LandingPage;
