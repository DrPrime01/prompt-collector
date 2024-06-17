"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function Navbar() {
	const isUserLoggedIn = true;
	const [providers, setProviders] = useState(null);

	useEffect(() => {
		const setProvider = async () => {
			const res = await getProviders();
			setProviders(res);
		};

		setProvider();
	}, []);
	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex flex-center gap-2">
				<Image
					src="/assets/images/logo.svg"
					alt="logo"
					width={30}
					height={30}
					className="object-contain"
				/>
				<p className="logo_text">Promptopedia</p>
			</Link>
			{/* Desktop Navigation */}
			<div className="sm:flex hidden">
				{isUserLoggedIn ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>
						<button type="button" onClick={signOut} className="outline_btn">
							Sign Out
						</button>
						<Link href="/profile">
							<Image
								src="/assets/images/logo.svg"
								width={37}
								height={37}
								alt="profile"
								className="rounded-full object-contain"
							/>
						</Link>
					</div>
				) : (
					<></>
				)}
			</div>
		</nav>
	);
}
