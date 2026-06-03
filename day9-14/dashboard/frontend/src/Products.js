import React, {useState, useEffect} from "react";
import "./Products.css";

function Products(){
    const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);      // Save the products to state
        setIsLoading(false);    // Turn off the loading screen
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []); // Run only once when the component loads

  // --- CONDITIONAL RENDERING ---
  if (isLoading) {
    return <div className="loading-msg">Loading products from API...</div>;
  }

  if (error) {
    return <div className="error-msg">Error: {error}</div>;
  }

  // --- UI RENDER (Table Format) ---
  return (
    <div className="products-container">
      <h2>Products API List</h2>

      {/* HTML Table to display the product data */}
      <table className="products-table">

        {/* Table Headings tailored for products */}
        <thead>
          <tr className="products-thead">
            <th className="products-th text-center" style={{ width: "5%" }}>ID</th>
            <th className="products-th text-center" style={{ width: "10%" }}>Image</th>
            <th className="products-th" style={{ width: "45%" }}>Product Title</th>
            <th className="products-th" style={{ width: "20%" }}>Category</th>
            <th className="products-th" style={{ width: "20%" }}>Price</th>
          </tr>
        </thead>

        {/* Table Body (Looping through the products) */}
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="product-tr">

              <td className="product-td text-center">{product.id}</td>

              {/* Product Image: Resized so it fits nicely in the table */}
              <td className="product-td product-image">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-img-element"
                />
              </td>

              <td className="product-td product-title-cell"><strong>{product.title}</strong></td>

              <td className="product-td product-category">{product.category}</td>

              {/* Added a dollar sign and styled the price in green */}
              <td className="product-td product-price-cell">
                ${product.price}
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );

}
export default Products;
