import WrongModal from "./WrongModal";

function Wrong({ message, url }) {
	return (
		<div>
			<WrongModal/>
			<div className="text-9xl font-bold mb-8 flex justify-center">
				<img src={url} alt='Opps something went wrong :(' style={{ width: "300px", height: "300px" }} />
			</div>
			<div>
				<p>{message}</p>
			</div>
		</div>
	);
}

export default Wrong;