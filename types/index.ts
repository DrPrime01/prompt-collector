export interface ProfileProps {
	name: string | null;
	desc: string;
	data: PromptProps[];
	handleEdit?: (post: PromptProps) => void;
	handleDelete?: (post: PromptProps) => void;
}

export interface PropmtCardProps {
	post: PromptProps;
	handleTagClick?: (tag: string) => void;
	handleEdit: () => void;
	handleDelete: () => void;
}

export interface PromptProps {
	_id: string;
	creator: CreatorProps;
	prompt: string;
	tag: string;
}

export interface CreatorProps {
	_id: string;
	email: string;
	username: string;
	image: string;
}
