import React, {useState, useEffect} from "react";
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
    return <div style={{ padding: "20px" }}>Loading products from API...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>Error: {error}</div>;
  }

  // --- UI RENDER (Table Format) ---
  return (
    <div style={{ padding: "20px" }}>
      <h2>Products API List</h2>

      {/* HTML Table to display the product data */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>

        {/* Table Headings tailored for products */}
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
            <th style={{ border: "1px solid #ddd", padding: "10px", width: "5%" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "10px", width: "10%" }}>Image</th>
            <th style={{ border: "1px solid #ddd", padding: "10px", width: "45%" }}>Product Title</th>
            <th style={{ border: "1px solid #ddd", padding: "10px", width: "20%" }}>Category</th>
            <th style={{ border: "1px solid #ddd", padding: "10px", width: "20%" }}>Price</th>
          </tr>
        </thead>

        {/* Table Body (Looping through the products) */}
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={{ borderBottom: "1px solid #ddd" }}>

              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{product.id}</td>

              {/* Product Image: Resized so it fits nicely in the table */}
              <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "50px", height: "50px", objectFit: "contain" }}
                />
              </td>

              <td style={{ border: "1px solid #ddd", padding: "10px" }}><strong>{product.title}</strong></td>

              <td style={{ border: "1px solid #ddd", padding: "10px", textTransform: "capitalize" }}>{product.category}</td>

              {/* Added a dollar sign and styled the price in green */}
              <td style={{ border: "1px solid #ddd", padding: "10px", color: "green", fontWeight: "bold" }}>
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
