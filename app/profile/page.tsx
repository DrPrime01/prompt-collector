"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";
import { PromptProps } from "@/types";

export default function MyProfile() {
	const { data: session } = useSession();
	const [posts, setPosts] = useState<PromptProps[]>([]);
	const router = useRouter();

	useEffect(() => {
		async function fetchPosts() {
			const res = await fetch(`/api/users/${session?.user?.id}/posts`);
			const data = await res.json();
			setPosts(data);
		}

		fetchPosts();
	}, [session]);

	async function handleDelete(post: PromptProps) {
		const hasConfirmed = confirm("Are you sure you want to delete this post?");

		if (hasConfirmed) {
			await fetch(`/api/prompt/${post._id.toString()}`, {
				method: "DELETE",
			});

			const filteredPosts = posts.filter((p) => p?._id !== post._id);
			setPosts(filteredPosts);
		}
	}

	async function handleEdit(post: PromptProps) {
		router.push(`/update-prompt?id=${post._id}`);
	}
	return (
		<Profile
			name="My"
			desc="Welcome to your personalised profile"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
}
