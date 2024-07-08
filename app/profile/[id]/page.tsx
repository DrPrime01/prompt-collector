"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";

import Profile from "@/components/Profile";
import { PromptProps } from "@/types";

export default function UserProfile() {
	const searchParams = useSearchParams();
	const params = useParams<{id: string;}>();
	const username = searchParams.get("name");
	const [posts, setPosts] = useState<PromptProps[]>([]);

	useEffect(() => {
		async function fetchPosts() {
			const res = await fetch(`/api/users/${params.id}/posts`);
			const data = await res.json();
			setPosts(data);
		}

		if (params.id) fetchPosts();
	}, [params.id]);

	return (
		<Profile
			name={username}
			desc={`Welcome to ${username} personalised profile`}
			data={posts}
		/>
	);
}
