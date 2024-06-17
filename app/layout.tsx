import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Promptopedia",
	description: "Discover & share AI Prompts",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="main">
					<div className="gradient" />
				</div>
				<main>
					<Navbar />
					{children}
				</main>
			</body>
		</html>
	);
}
