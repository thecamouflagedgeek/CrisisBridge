import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "./ProductList.module.css";

interface Product {
  product_id: number;
  business_id?: number; // Optional, eh
  name: string;
  description: string;
  price: number;
  eco_credit_cost?: number; // Optional, kya pata, we might need it?
  stock_quantity: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [_filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, _setError] = useState<string | null>(null);
  const [_searchQuery, setSearchQuery] = useState<string>("");
  const [newProduct, setNewProduct] = useState<Omit<Product, "product_id" | "created_at" | "updated_at">>({
    name: "",
    description: "",
    price: 0,
    stock_quantity: 0,
    image_url: "",
    business_id: undefined,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        // setError("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query))
    );

    setFilteredProducts(filtered);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock_quantity" ? Number(value) : value,
    }));
  };

  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.stock_quantity || !newProduct.image_url) {
      alert("Please fill in all required fields.");
      return;
    }

    const product: Product = {
      ...newProduct,
      product_id: products.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setProducts((prev) => [...prev, product]);
    setFilteredProducts((prev) => [...prev, product]);
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      stock_quantity: 0,
      image_url: "",
      business_id: undefined,
    });
  };

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>Error: {error}</div>}

      {/* Add Product Form */}
      <div className={styles.formContainer}>
        <h2>Add a New Product</h2>
        <form onSubmit={handleAddProduct} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Product Name *"
            value={newProduct.name}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <textarea
            name="description"
            placeholder="Description *"
            value={newProduct.description}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price *"
            value={newProduct.price || ""}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <input
            type="number"
            name="stock_quantity"
            placeholder="Stock Quantity *"
            value={newProduct.stock_quantity || ""}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL *"
            value={newProduct.image_url}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <input
            type="number"
            name="business_id"
            placeholder="Business ID (optional)"
            value={newProduct.business_id || ""}
            onChange={handleInputChange}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Add Product
          </button>
        </form>
      </div>

      {/* Search Bar
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name or description..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.input}
        />
      </div>

      <h1 className={styles.heading}>Product List</h1>
      {filteredProducts.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Business ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock Quantity</th>
              <th>Image URL</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.business_id || "N/A"}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock_quantity}</td>
                <td>
                  <a href={product.image_url} target="_blank" rel="noopener noreferrer">
                    View Image
                  </a>
                </td>
                <td>{new Date(product.created_at).toLocaleString()}</td>
                <td>{new Date(product.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noProducts}>No products match your search query or are available.</p>
      )} */}
    </div>
  );
};

export default ProductList;
