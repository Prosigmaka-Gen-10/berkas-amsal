import { useEffect, useState } from 'react'

const productsFromAPi = [
	{
		name: 'Sepatu Bola',
		price: 500000
	},
	{
		name: 'Bola Sepak',
		price: 200000
	},
	{
		name: 'Raket Badminton',
		price: 400000
	},
    {
		name: 'Baju Bola',
		price: 300000
	},
	{
		name: 'Kaos Kaki Bola',
		price: 30000
	},

    
]

export default function LifeCycleFunction () {
	const [products, setProducts] = useState([])
	const [carts, setCarts] = useState([])
	const [totalPrice, setTotalPrice] = useState(0)

	function tambahkanKeKeranjang (produkYangAkanDitambahkan) {
		const keranjangSekarang = [...carts]
		keranjangSekarang.push(produkYangAkanDitambahkan)
		setCarts(keranjangSekarang)
	}

	function hapusKeranjang (indexYgAkanDihapus) {
		const keranjangSekarang = [...carts]
		keranjangSekarang.splice(indexYgAkanDihapus, 1)
		setCarts(keranjangSekarang)
	}

	useEffect(() => {
		setProducts(productsFromAPi)
	}, [])

	useEffect(() => {
		let countTotalPrice = 0

		for (const cart of carts) {
			countTotalPrice = countTotalPrice + cart.price
		}

		setTotalPrice(countTotalPrice)
	}, [carts])

	return <>
		<p>total harga: {totalPrice}</p>

		<h4>Daftar Produk:</h4>
		<ul>
			{products.map(product =>
				<li>
					{product.name} | Rp. {product.price}

					<button onClick={() => tambahkanKeKeranjang(product)}>
						+ keranjang
					</button>
				</li>
			)}
		</ul>

		<h4>Daftar Keranjang:</h4>
		<ul>
			{carts.map((cart, indexCart) =>
				<li>
					{indexCart} . {cart.name} | Rp. {cart.price}

					<button onClick={() => hapusKeranjang(indexCart)}>
						- hapus
					</button>
				</li>
			)}
		</ul>
	</>
}