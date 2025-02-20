"use client"

import React from "react"
import Link from "next/link"
import { ChevronRight, CheckCircle2, Play, Pause, ArrowRight, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function LoomifyLanding() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">Loomify</span>
        </Link>
        <div className="flex items-center">
          <nav className="hidden md:flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
              Features
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
              How It Works
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
              Pricing
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <nav className="flex flex-col p-4">
            <Link
              className="py-2 text-sm font-medium hover:underline underline-offset-4"
              href="#features"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              className="py-2 text-sm font-medium hover:underline underline-offset-4"
              href="#how-it-works"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              className="py-2 text-sm font-medium hover:underline underline-offset-4"
              href="#pricing"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Button variant="ghost" className="justify-start px-0 py-2" onClick={() => setIsMenuOpen(false)}>
              Log In
            </Button>
            <Button className="mt-2" onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </Button>
          </nav>
        </div>
      )}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Record, Share, Collaborate
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Loomify makes it easy to record your screen, share your thoughts, and collaborate with your team.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button>Get Started for Free</Button>
                <Button variant="outline">
                  Watch Demo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Screen Recording</CardTitle>
                </CardHeader>
                <CardContent>Capture your entire screen, a specific window, or a selected area with ease.</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Video Messaging</CardTitle>
                </CardHeader>
                <CardContent>
                  Record yourself along with your screen to add a personal touch to your messages.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Instant Sharing</CardTitle>
                </CardHeader>
                <CardContent>
                  Share your recordings instantly with a simple link or embed them in your favorite tools.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Team Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  Organize your videos in shared workspaces and collaborate with your team effortlessly.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Viewer Insights</CardTitle>
                </CardHeader>
                <CardContent>Get detailed analytics on who watched your videos and for how long.</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                </CardHeader>
                <CardContent>
                  Seamlessly integrate with popular tools like Slack, Jira, and Google Workspace.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Transcription & Titling</CardTitle>
                </CardHeader>
                <CardContent>
                  Automatically generate accurate transcripts and smart titles for your videos using cutting-edge AI
                  technology.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3 items-start">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary p-2 text-primary-foreground">
                  <Play className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">1. Record</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Click to start recording your screen, camera, or both.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary p-2 text-primary-foreground">
                  <Pause className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">2. Stop</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Click again to stop recording. Your video is automatically saved.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary p-2 text-primary-foreground">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">3. Share</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Copy the link or use integrations to share your video instantly.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">AI-Powered Efficiency</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Loomify leverages cutting-edge AI to streamline your workflow and enhance your video content.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                    <span>Automatic, highly accurate transcriptions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                    <span>Smart video titles generated from content</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                    <span>Searchable video content</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                    <span>Improved accessibility for all users</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground opacity-20 blur-xl"></div>
                  <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">AI-Generated Transcript</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      "Welcome to Loomify! In this video, I'll show you how to use our new AI-powered features..."
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>00:00 / 02:30</span>
                      <span>98% Accuracy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Simple Pricing
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>For individuals and small teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$0</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      25 videos per month
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />5 minute max length
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      Basic editing tools
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing teams and businesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$15</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">per user / month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      Unlimited videos
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      No length restrictions
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      Advanced editing tools
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      Team workspaces
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      AI-powered transcription & titling
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Free Trial</Button>
                </CardFooter>
              </Card>
              <Card className="md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">Custom</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">contact for pricing</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      All Pro features
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      Dedicated support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      Custom integrations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      Advanced security features
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="mt-4">
                  <p className="text-gray-500 dark:text-gray-400">
                    "Loomify has revolutionized our remote team communication. It's so easy to use and saves us hours
                    every week."
                  </p>
                  <p className="mt-2 font-semibold">- Sarah J., Product Manager</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="mt-4">
                  <p className="text-gray-500 dark:text-gray-400">
                    "As a teacher, Loomify has been a game-changer for creating engaging content for my students. Highly
                    recommended!"
                  </p>
                  <p className="mt-2 font-semibold">- Mark T., Educator</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="mt-4">
                  <p className="text-gray-500 dark:text-gray-400">
                    "The integrations with our existing tools make Loomify an essential part of our workflow. It's
                    incredibly powerful."
                  </p>
                  <p className="mt-2 font-semibold">- Emily R., Software Engineer</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is there a free plan available?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a free Basic plan that includes 25 videos per month with a 5-minute maximum length per
                  video.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I use Loomify on my mobile device?</AccordionTrigger>
                <AccordionContent>
                  Currently, Loomify is available for desktop browsers. We're working on mobile apps and will release
                  them soon.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How secure are my videos?</AccordionTrigger>
                <AccordionContent>
                  We take security seriously. All videos are encrypted in transit and at rest. You have full control
                  over who can view your content.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I cancel my subscription at any time?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can cancel your subscription at any time. There are no long-term contracts, and you can
                  easily manage your subscription from your account settings.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How accurate are the AI-generated transcripts and titles?</AccordionTrigger>
                <AccordionContent>
                  Our AI-powered transcription system achieves an average accuracy of 98% for clear audio in English.
                  The smart titling feature analyzes the content of your video to suggest relevant titles. While highly
                  accurate, we always recommend a quick review to ensure perfect results, especially for technical or
                  specialized content.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Loomify. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

// import React from 'react'

// type Props = {}

// const page = (props: Props) => {
//   return (
//     <div>page</div>
//   )
// }

// export default page