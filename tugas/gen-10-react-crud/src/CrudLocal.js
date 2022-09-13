import { useEffect, useState } from 'react';
import './App.css';

const productsFromDatabase = [
	{
		id: 1,
		name: 'Sepatu Bola',
		price: 500000
	},
	{
		id: 2,
		name: 'Bola Sepak',
		price: 200000
	},
	{
		id: 3,
		name: 'Raket Badminton',
		price: 400000
	},
]

export default function CrudLocal () {
	const originalForm = {
		name: '',
		price: ''
	}

	const [products, setProducts] = useState([])
	const [formInput, setFormInput] = useState({ ...originalForm })
	const [isUpdate, setIsUpdate] = useState(false)

	function prepareUpdate(product) {
		setFormInput({ ...product })
		setIsUpdate(true)
	}

	function handleInput(event, propertyName) {
		const currentFormInput = { ...formInput }
		currentFormInput[propertyName] = event.target.value
		setFormInput(currentFormInput)
	}

	function handleSubmit(event) {
		event.preventDefault()

		if (isUpdate) {
			updateProduct()
		} else {
			createProduct()
		}

		setFormInput({ ...originalForm })
	}

	function createProduct() {
		const timestampNow = new Date().getTime()

		const payload = {
			...formInput,
			id: timestampNow
		}

		const currentProducts = [...products]
		currentProducts.push(payload)
		setProducts(currentProducts)
	}

	function updateProduct() {
		const currentProducts = [...products]
		const productIndex = currentProducts.findIndex(
			(product) => product.id === formInput.id
		)

		if (productIndex === -1) {
			alert('produk tidak ditemukan')
		}
		else {
			const payload = { ...formInput }

			currentProducts.splice(productIndex, 1, payload)
			setProducts(currentProducts)
		}

		setIsUpdate(false)
	}

	function handleDelete(productIndex) {
		const currentProducts = [...products]
		currentProducts.splice(productIndex, 1)
		setProducts(currentProducts)
	}

	function deleteAll() {
		setProducts([])
	}

	useEffect(() => {
		setProducts(productsFromDatabase)
	}, [])

	return (
		<>
			<h2>Daftar Produk:</h2>

			<button onClick={deleteAll}>
				Delete All
			</button>

			<ul>
				{products.map((product, productIndex) =>
					<li key={product.id}>
						{product.name} | Rp. {product.price}
						&nbsp;&nbsp;

						<button onClick={() => prepareUpdate(product)}>
							Update
						</button>
						&nbsp;&nbsp;

						<button onClick={() => handleDelete(productIndex)}>
							Delete
						</button>
					</li>
				)}
			</ul>

			<br /><hr /><br />
			{/* ========== form produk ============= */}

			<h2>Form Produk:</h2>

			<form onSubmit={(event) => handleSubmit(event)}>
				<label>
					Nama Produk: <br />
					<input
						type="text"
						value={formInput.name}
						onChange={(event) => handleInput(event, 'name')}
						required />
				</label>

				<br /><br />

				<label>
					Harga Produk: <br />
					<input
						type="number"
						value={formInput.price}
						onChange={(event) => handleInput(event, 'price')}
						required
						min="500" />
				</label>

				<br /><br />

				<button>
					Submit
				</button>
			</form>
		</>
	);
}