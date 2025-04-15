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
        "We help F&B brands drive growth with data-driven marketing strategies",
      features: [
        {
          title: "Implement full-funnel CLM strategies",
          description:
            "to ensure enhanced engagement across discovery, ordering, and loyalty stages",
          image: "/components/fnb/fnb1.1.webp",
        },
        {
          title: "Get tailored communication and offers",
          description:
            "using advanced data segmentation based on dining preferences, ordering habits, & preferred platforms",
          image: "/components/fnb/fnb1.2.webp",
        },
        {
          title: "Dominate the Food & Beverage industry",
          description:
            "with strategic benchmarking and insights on menu promotions, delivery strategies, & loyalty programs",
          image: "/components/fnb/fnb1.3.webp",
        },
        {
          title: "Boost repeat orders via funnel optimisation",
          description:
            "by refining customer touch-points & ensuring a personalised dining experience",
          image: "/components/fnb/fnb1.4.webp",
        },
      ],
    },
    {
      id: 1,
      title: "MarTech audits and optimisation",
      subtitle: "We streamline tech to enhance customer engagement and loyalty",
      features: [
        {
          title: "Conduct a MarTech audit to identify",
          description:
            "inefficiencies in your marketing tools, ensuring optimal performance and maximising ROI",
          image: "/components/fnb/fnb2.1.webp",
        },
        {
          title: "Streamline ordering and elevate delivery",
          description:
            "by getting tailored tool recommendations helping you achieve your business goals",
          image: "/components/fnb/fnb2.2.webp",
        },
        {
          title: "Migrate seamlessly to advanced tools",
          description:
            "with phased plans that support scalable marketing and data analysis",
          image: "/components/fnb/fnb2.3.webp",
        },
        {
          title: "Drive repeat purchase with better decisions",
          description:
            "and get a unified dashboard that integrates data from POS systems, online orders, and loyalty programs",
          image: "/components/fnb/fnb2.4.webp",
        },
      ],
    },
    {
      id: 2,
      title: "End-to-end campaign management",
      subtitle:
        "We help you optimise campaigns to attract, engage, and retain customers",
      features: [
        {
          title: "Run and refine targeted campaigns",
          description:
            "by leveraging real-time analytics to increase order volumes and increase CLTV",
          image: "/components/fnb/fnb3.1.webp",
        },
        {
          title: "Enhance ad relevance and drive sign-ups",
          description:
            "with advanced testing methods like multi-variate testing, content testing, & user flow testing",
          image: "/components/fnb/fnb3.2.webp",
        },
        {
          title: "Maximise customer engagement and ROI",
          description:
            "through dynamic campaigns tailored to dining habits and trends",
          image: "/components/fnb/fnb3.3.webp",
        },
        {
          title: "Develop SOPs",
          description:
            "to ensure scalable, consistent food and beverage campaigns with smooth coordination across teams",
          image: "/components/fnb/fnb3.4.webp",
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
