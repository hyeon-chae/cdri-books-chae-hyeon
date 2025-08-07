interface EmptyProps {
	msg: string;
}

export default function Empty({ msg }: EmptyProps) {
	return (
		<div className="pt-20 gap-6 flex flex-col items-center">
			<img src="/img/icon_book.svg" alt={msg} width={80} height={80} />
			<p className="text-gray-500">{msg}</p>
		</div>
	);
}
