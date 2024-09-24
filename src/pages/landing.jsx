import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import Autoplay from "embla-carousel-autoplay";
import Banner from "../assets/banner.jpeg";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import faqs from "../data/faq.json";
import { useUser } from "@clerk/clerk-react"; // Assuming you're using Clerk for authentication

const LandingPage = () => {
  const { user } = useUser();
  const role = user?.unsafeMetadata?.role; // Assuming role is stored in unsafeMetadata

  return (
    <main className="mt-[3.5rem] flex flex-col gap-10 sm:gap-20 p-5 pl-2 max-w-7xl mx-auto">
      {/* Header Section */}
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job{" "}
          <b>
            and get <span>Hired!</span>{" "}
          </b>
        </h1>
        <p className="gradient-title sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>

      {/* Buttons Section */}
      <div className="p-5 pl-2 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {/* Show "Find Jobs" button to everyone */}
          <Link to="/jobs">
            <Button variant="blue" size="xl">
              Find Jobs
            </Button>
          </Link>

          {/* Show "Post a Job" button to users who are not candidates */}
          {role !== "candidate" && (
            <Link to="/post-job">
              <Button variant="red" size="xl">
                Post a Job
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Carousel Section */}
      <Carousel
        plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
        loop={true}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Banner Section */}
      <img
        src={Banner}
        className="w-full flex flex-col sm:flex-row items-center p-5 pl-2 max-w-7xl mx-auto"
      />

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post Jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      {/* Accordion Section */}
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default LandingPage;
  