"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FadeAnimation from "@/app/components/Animations/fade";
import Lenis from "lenis";

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface Section {
  id: number;
  title: string;
  subtitle: string;
  features: Feature[];
}

export default function Page() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeFeaturesMap, setActiveFeaturesMap] = useState<
    Record<number, number>
  >({});

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const sections: Section[] = [
    {
      id: 0,
      title: "Strategic Marketing Programs",
      subtitle:
        "We create strategies to drive enrollment and engagement for EdTech platforms",
      features: [
        {
          title: "Map and optimise the student's journey",
          description:
            "to ensure smooth transitions and engagement across enrollment, learning, and retention stages",
          image: "/components/edtech/edtech1.1.webp",
        },
        {
          title: "Leverage advanced data segmentation",
          description:
            "to deliver tailored course recommendations based on learner behavior, preferences, and career goals",
          image: "/components/edtech/edtech1.2.webp",
        },
        {
          title: "Monitor real-time KPIs",
          description:
            "like enrollment rate, completion, and engagement frequency to refine strategies",
          image: "/components/edtech/edtech1.3.webp",
        },
        {
          title: "Boost conversions with funnel optimisation",
          description:
            "by enhancing touchpoints like sign-ups, demo classes, and course checkout",
          image: "/components/edtech/edtech1.4.webp",
        },
      ],
    },
    {
      id: 1,
      title: "MarTech audits and optimisation",
      subtitle:
        "We optimise technology to enhance learning experiences & user retention",
      features: [
        {
          title: "Eliminate MarTech inefficiencies",
          description:
            "with meticulous audit of existing tech stack and maximise campaign ROI",
          image: "/components/edtech/edtech2.1.webp",
        },
        {
          title: "Simplify students' journeys with right tools",
          description:
            "to streamline enrollment, personalise course pathways, and optimise account management",
          image: "/components/edtech/edtech2.2.webp",
        },
        {
          title: "Seamlessly upgrade to advanced MarTech",
          description:
            "that support scalable campaigns, detailed learner behaviour analytics, and precise targeting of courses",
          image: "/components/edtech/edtech2.3.webp",
        },
        {
          title: "Leverage an integrated dashboard",
          description:
            "to consolidate tracking, insights, and performance metrics for smarter decision-making",
          image: "/components/edtech/edtech2.4.webp",
        },
      ],
    },
    {
      id: 2,
      title: "End-to-end campaign management",
      subtitle:
        "We manage campaigns to attract students and boost course enrollments",
      features: [
        {
          title: "Execute and optimise campaigns",
          description:
            "using real-time data to promote popular courses and certifications, and drive enrollments",
          image: "/components/edtech/edtech3.1.webp",
        },
        {
          title: "Boost course relevance and conversions",
          description:
            "with multivariate testing, channel optimisation, and personalised messaging to increase enrolments",
          image: "/components/edtech/edtech3.2.webp",
        },
        {
          title: "Maximise ROI with behaviour-based campaigns",
          description: "through dynamic up-selling and cross-selling",
          image: "/components/edtech/edtech3.3.webp",
        },
      ],
    },
  ];

  useEffect(() => {
    const initialMap: Record<number, number> = {};
    sections.forEach((section) => {
      initialMap[section.id] = 0; // Set all sections to first feature
    });
    setActiveFeaturesMap(initialMap);
    setActiveSection(0); // First section active by default
  }, []);

  const handleSubtitleClick = (sectionId: number) => {
    setActiveSection(sectionId);
    setActiveFeaturesMap((prev) => ({
      ...prev,
      [sectionId]: (prev[sectionId] + 1) % sections[sectionId].features.length,
    }));
  };

  const renderSectionContent = (section: Section) => {
    const isMiddleSection = section.id === 1;
    const activeFeatureIndex = activeFeaturesMap[section.id] ?? 0; // Default to 0 if undefined

    const imageComponent = (
      <motion.div
        key={`${section.id}-${activeFeatureIndex}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-[300px] w-full rounded-lg order-last md:order-none">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={
              section.features[activeFeatureIndex].image || "/placeholder.svg"
            }
            alt={section.features[activeFeatureIndex].title}
            className="object-contain"
            width={1000}
            height={640}
          />
        </div>
      </motion.div>
    );

    const featuresComponent = (
      <div className="relative">
        <div className="hidden md:block absolute left-[1] top-0 w-1 h-full bg-purple-100 rounded-t-full rounded-b-full" />
        <div className="space-y-8">
          {section.features.map((feature, index) => {
            // Show first feature as active by default when section loads
            const isActive =
              (activeSection === section.id && activeFeatureIndex === index) ||
              (index === 0 && activeFeaturesMap[section.id] === 0);

            return (
              <div
                key={index}
                className="relative pl-6 cursor-pointer group"
                onClick={() => {
                  setActiveSection(section.id);
                  setActiveFeaturesMap((prev) => ({
                    ...prev,
                    [section.id]: index,
                  }));
                }}>
                <div className="hidden md:block absolute left-0 top-0 w-1 h-full bg-transparent">
                  {isActive && (
                    <motion.div
                      layoutId={`active-indicator-${section.id}`}
                      className="absolute -left-0.5 top-0 w-2 h-full bg-[#6438C3] rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        mass: 1.2,
                        duration: 0.7,
                      }}
                    />
                  )}
                </div>

                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    layout: { type: "spring", stiffness: 200, damping: 25 },
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}>
                  <div className="text-left">
                    <h3
                      className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                        isActive
                          ? "text-[#6438C3]"
                          : "text-gray-800 group-hover:text-[#6438C3]"
                      }`}>
                      {feature.title}
                    </h3>
                    <p
                      className={`text-[#8C8C8C] ${
                        isActive ? "block" : "hidden md:block"
                      }`}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    );

    return (
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {isMiddleSection ? (
          <>
            <FadeAnimation direction="fadeUp" duration={0.8} delay={0.2}>
              <div className="order-last md:order-first">{imageComponent}</div>
            </FadeAnimation>
            <FadeAnimation direction="fadeUp" duration={0.8} delay={0.3}>
              <div className="order-first md:order-last">
                {featuresComponent}
              </div>
            </FadeAnimation>
          </>
        ) : (
          <>
            <FadeAnimation direction="fadeUp" duration={0.8} delay={0.2}>
              <div>{featuresComponent}</div>
            </FadeAnimation>
            <FadeAnimation direction="fadeUp" duration={0.8} delay={0.3}>
              <div className="order-last md:order-none">{imageComponent}</div>
            </FadeAnimation>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {sections.map((section, index) => (
        <section key={section.id} className="py-10 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <FadeAnimation
              direction="fadeUp"
              duration={0.8}
              delay={0.1 * index}>
              <div className="mb-12 text-center">
                <h2
                  className={`text-3xl font-bold mb-4 transition-colors duration-300 cursor-pointer ${
                    activeSection === section.id
                      ? "md:text-[#6438C3]"
                      : "text-gray-800 hover:text-[#6438C3]"
                  }`}
                  onClick={() => setActiveSection(section.id)}>
                  {section.title}
                </h2>
                <p
                  className="text-gray-600 max-w-2xl mx-auto cursor-pointer hover:text-[#6438C3]"
                  onClick={() => handleSubtitleClick(section.id)}>
                  {section.subtitle}
                </p>
              </div>
            </FadeAnimation>
            {renderSectionContent(section)}
          </div>
        </section>
      ))}
    </div>
  );
}
