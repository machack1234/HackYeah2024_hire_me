import { FeatureItem, NavItem, TestimonialItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    id: 1,
    label: "Product",
    href: "",
  },
  {
    id: 2,
    label: "Pricing",
    href: "",
  },
];

export const NAV_ITEMS_DASHBOARD: NavItem[] = [
  {
    id: 1,
    label: "Home",
    href: "/dashboard",
  },
  {
    id: 2,
    label: "Courses",
    href: "/dashboard/courses",
  },

];

export const NAV_ITEMS_CTA: NavItem[] = [
  {
    id: 1,
    label: "Log in",
    href: "/sign-in",
  },
  {
    id: 2,
    label: "Get-started",
    href: "/get-started",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    content: `“Thanks to this app, I finally found a learning path that fits my goals. The personalized lessons and flexible pace made it easy to switch careers while balancing my busy schedule!”`,
    author: "Ellie Bird",
    avatar: "/images/testimonials/1.png",
  },
  {
    id: 2,
    content: `“I loved how the app tailored the lessons to my needs. It was like having a personal mentor guiding me every step of the way. I wouldn't have been able to make such a big transition without it!”`,
    author: "John Bean",
    avatar: "/images/testimonials/2.png",
  },
  {
    id: 3,
    content: `“This platform made my career change smooth and stress-free. The personalized courses fit perfectly into my schedule, and I finally feel confident in my new field!`,
    author: "Terry Rocket",
    avatar: "/images/testimonials/1.png",
  },
];

export const FEATURES: FeatureItem[] = [
  {
    id: 1,
    title: "Personalized assessment",
    desc: "Start by answering a few quick questions about your current skills, career goals, and learning preferences. Our AI-powered system will analyze your responses to understand where you are and where you want to go.",
  },
  {
    id: 2,
    title: "Tailored learning plan",
    desc: "Based on your assessment, the app will generate a personalized learning plan with courses and resources that fit your goals and skill level. ",
  },
  {
    id: 3,
    title: "Progress tracking ",
    desc: "Follow the plan at your own pace, track your progress, and complete practical tasks. You'll receive ongoing guidance, new course recommendations, and insights to help you unlock new opportunities in your chosen field.",
  },
];

export const COURSES = [
  {
    id: 1,
    title: "UX Design Foundations",
    desc: "Objective: Introduce basic concepts and tools of UX/UI design.",
    lessons: [
      {
        id: 1,
        title: "Getting started with UX Design",
        desc: "Discover the basics, such as key principles and methodologies.",
        estimated_time: 60,
        isDone: true,
      },
      {
        id: 2,
        title: "Devices and layouts",
        desc: "Discover how to design for various devices.",
        estimated_time: 80,
        isDone: false,
      },
      {
        id: 3,
        title: "User research",
        desc: "Discover the methodologies of user research.",
        estimated_time: 60,
        isDone: false,
      },
    ],
  },
];
