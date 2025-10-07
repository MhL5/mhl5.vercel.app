import ContactMe from "@/app/(with-navigation)/_components/ContactMe";
import HeroSection from "@/app/(with-navigation)/_components/HeroSection";
import MyProjects from "@/app/(with-navigation)/_components/my-projects/MyProjects";
import { ParticlesLazy } from "@/app/(with-navigation)/_components/Particles";

export default async function Home() {
	return (
		<div className="overflow-hidden">
			<HeroSection />
			<ParticlesLazy
				className="-z-10 absolute inset-0 h-full animate-fade-in overflow-hidden"
				quantity={100}
			/>
			<MyProjects />
			<ContactMe className="mt-36 mb-30" />
		</div>
	);
}
