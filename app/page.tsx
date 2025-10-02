import { ArrowRight, CheckCircle, Target, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
	return (
		<>
			{/* Header */}
			<Header />
			{/* Hero Section */}
			<section className="max-w-7xl mx-auto px-4 py-20 text-center">
				<Badge className="mb-6 text-pretty">
					Build Better Habits, One Loop at a Time
				</Badge>
				<h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance text-foreground">
					Turn Your Goals Into Daily Habits
				</h1>
				<p className="text-xl mb-8 max-w-2xl mx-auto text-pretty text-muted-foreground">
					Track your progress with beautiful visualizations, stay motivated with
					streak counters, and build lasting habits that stick.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button asChild className=" px-8">
						<Link href="/auth/signup">
							Start Your Journey
							<ArrowRight className="ml-2 h-5 w-5" />
						</Link>
					</Button>
					<Button asChild className="px-8" variant="outline">
						<Link href="/demo">Watch Demo</Link>
					</Button>
				</div>

				{/* Dashboard preview */}
				<div className="mt-16 relative">
					<Image
						alt="Loopy Dashboard Preview"
						className="rounded-xl border border-border shadow-lg mx-auto"
						height={1080}
						priority={true}
						quality={100}
						src="/dashboard_preview.png"
						width={1800}
					/>
				</div>
			</section>

			{/* Features Section */}
			<section className="max-w-7xl mx-auto px-4 py-20" id="features">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
						Everything You Need to Succeed
					</h2>
					<p className="text-muted-foreground">
						Loopy combines powerful tracking with beautiful design to make habit
						building enjoyable and effective.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					<Card className="p-6 hover:shadow-lg transition-shadow">
						<div className="flex items-start gap-4">
							<div className="size-12 rounded-full flex items-center justify-center">
								<CheckCircle className="size-6" />
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2 text-foreground">
									Simple Tracking
								</h3>
								<p className="text-muted-foreground">
									Mark habits as complete with a single tap. Clean, intuitive
									interface that gets out of your way.
								</p>
							</div>
						</div>
					</Card>

					<Card className="p-6 hover:shadow-lg transition-shadow">
						<div className="flex items-start gap-4">
							<div className="size-12 rounded-full flex items-center justify-center">
								<TrendingUp className="size-6" />
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2 text-foreground">
									Progress Visualization
								</h3>
								<p className="text-muted-foreground">
									Beautiful charts and progress loops show your consistency over
									time. See your streaks grow.
								</p>
							</div>
						</div>
					</Card>

					<Card className="p-6 hover:shadow-lg transition-shadow">
						<div className="flex items-start gap-4">
							<div className="size-12 rounded-full flex items-center justify-center">
								<Target className="size-6" />
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2 text-foreground">
									Goal Setting
								</h3>
								<p className="text-muted-foreground">
									Set realistic targets and track your progress. Celebrate
									milestones along the way.
								</p>
							</div>
						</div>
					</Card>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="bg-muted py-20" id="how-it-works">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
							How Loopy Works
						</h2>
						<p className="text-lg max-w-2xl mx-auto text-muted-foreground">
							Building habits has never been this simple. Follow these three
							steps to transform your routine.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="size-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground text-xl font-bold">
								1
							</div>
							<h3 className="text-xl font-semibold mb-2 text-foreground">
								Create Your Habits
							</h3>
							<p className="text-pretty text-muted-foreground">
								Add the habits you want to build. Start small with 1-3 habits
								for best results.
							</p>
						</div>

						<div className="text-center">
							<div className="size-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground text-xl font-bold">
								2
							</div>
							<h3 className="text-xl font-semibold mb-2 text-foreground">
								Track Daily
							</h3>
							<p className="text-pretty text-muted-foreground">
								Check off completed habits each day. Build momentum with
								consistent daily action.
							</p>
						</div>

						<div className="text-center">
							<div className="size-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground text-xl font-bold">
								3
							</div>
							<h3 className="text-xl font-semibold mb-2 text-foreground">
								Watch Progress
							</h3>
							<p className="text-pretty text-muted-foreground">
								See your streaks grow and habits stick. Celebrate your
								consistency and success.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<Footer />
		</>
	);
}
