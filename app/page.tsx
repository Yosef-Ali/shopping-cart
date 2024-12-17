import { getProducts } from '@/lib/products'
import { Header } from '@/components/header'
import { Cart } from '@/components/cart'
import { ProductCard } from '@/components/product-card'

export default async function Page() {
  const products = await getProducts()

  return (
    <>
      <Header />
      <main className="container py-6">
        {products.length === 0 ? (
          <p className="text-center text-lg">No products available at the moment.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {products.map((product) => (
              <div key={product.id} className="aspect-square">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </main>
      <Cart />
    </>
  )
}

