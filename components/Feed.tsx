"use client";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import { PromptProps, PropmtCardListProps } from "@/types";

export default function Feed() {
	const [posts, setPosts] = useState<PromptProps[]>([]);
	const [filteredPosts, setFilteredPosts] = useState<PromptProps[]>([]);
	const [value, setValue] = useState("");

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch("/api/prompt");
			const data = await res.json();
			setPosts(data);
			setFilteredPosts(data);
		};

		fetchPosts();
	}, []);

	useEffect(() => {
		const searchedPosts = posts.filter(
			(post) =>
				post.prompt.toLowerCase().includes(value.toLowerCase()) ||
				post.tag.toLowerCase().includes(value.toLowerCase()) ||
				post.creator.username.toLowerCase().includes(value.toLowerCase())
		);
		setFilteredPosts(searchedPosts);
	}, [posts, value]);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					required
					className="search_input peer"
				/>
			</form>

			<PromptCardList
				data={filteredPosts}
				handleTagClick={(tag) => setValue(tag)}
			/>
		</section>
	);
}

function PromptCardList({ data, handleTagClick }: PropmtCardListProps) {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={() => handleTagClick && handleTagClick(post.tag)}
				/>
			))}
		</div>
	);
}
