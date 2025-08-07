interface EmptyProps {
	msg: string;
}

export default function Empty({ msg }: EmptyProps) {
	return (
		<div className="gap-6 flex flex-col items-center">
			<img src="/img/icon_book.svg" alt={msg} width={80} height={80} />
			<p className="text-text-secondary">{msg}</p>
		</div>
	);
}
