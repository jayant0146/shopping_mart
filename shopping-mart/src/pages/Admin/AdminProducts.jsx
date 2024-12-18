import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import AdminMenu from "./AdminMenu";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);

    //getall products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-products");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };
    

    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <>
            <div className="row overflow-x-hidden">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9 ">
                    <h1 className="text-center">All Products List</h1>
                    <div className="col-md-3 col-sm-3 mb-4">
                        {products?.map((p) => (
                            <Link
                                key={p._id}
                                to={`/dashboard/admin/product/${p.slug}`}
                                className="product-link"
                            >
                                <div className="card" style={{ width: "18rem", height: "100 %" }}>
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}?t=${Date.now()}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>

                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default AdminProducts;