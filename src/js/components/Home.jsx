import React, { useState, useEffect } from "react";



//create your first component
const Home = () => {
	const [user, setUser] = useState(null)
	const [input, setInput] = useState("")

	async function getData() {
		try {
			let response = await fetch("https://playground.4geeks.com/todo/users/Alexander")
			let data = await response.json()
			setUser(data)
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}
	async function postTask(event) {
		event.preventDefault()
		const newTask = {
			"label": input,
			"is_done": false,


		}
		await fetch("https://playground.4geeks.com/todo/todos/Alexander", {
			method: "POST",
			body: JSON.stringify(newTask),
			headers: { "Content-Type": "application/json" }
		})
		getData()


	}



	async function deleteTask(id) {
		await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
		})
		getData()
	}
	async function putTask(element) {
		let task = {
			"label": element.label,
			"is_done": !element.is_done
		}
		await fetch(`https://playground.4geeks.com/todo/todos/${element.id}`, {
			method: "PUT",
			body: JSON.stringify(task),
			headers: { "Content-Type": "application/json" }
		})
		getData()

	}

	useEffect(() => {
		getData()
	}, [])


	return (
		<div className="text-center">
			<h1>{user ? user.username : "cargando"}</h1>
			<form onSubmit={postTask}>
				<input
					type="text"
					onChange={(e) => setInput(e.target.value)}
					value={input}
					placeholder="Limpiar la cocina"
				/>
				<button type="submit">
					Añadir tarea
				</button>
			</form>

			{user?.todos?.map((e) => {
				return (
					<div className="task" key={e.id}>
						<span>
							{e.label}
							<div className="completoincompleto"onClick={() => putTask(e)}>
								{e.is_done ? "Completo" : "Incompleto"}
							</div>
						</span>
						<span onClick={() => deleteTask(e.id)}>x</span>
					</div>
				);
			})}

			{!user && <span>Cargando...</span>}
		</div>
	);

};

export default Home;