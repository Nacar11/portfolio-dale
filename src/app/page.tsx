import { Landing } from "@/components/sections/landing";
import { Skills } from "@/components/sections/skills";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Landing />
      <Skills />
      <ExperienceTimeline />
      <Projects />
      <Achievements />
      <Contact />
    </>
  );
}
