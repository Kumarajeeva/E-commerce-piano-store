import React, { useState, useEffect } from "react";
import {Navbar, Products, Cart, Checkout, ConfirmationPage} from "./components";
import {commerce} from "./library/commerce";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";

const App = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order,setOrder] = useState({});
    const [errorMessage,setErrorMessage] = useState("");

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();

        setProducts(data);
    }   

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());

        console.log(cart);
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart);
    }

    const handleUpdateCartQty = async (productId,quantity) => {
        const { cart } = await commerce.cart.update(productId, {quantity} );

        setCart(cart);
    }

    const handleRemoveFromCart = async (productId,quantity) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    }

    const refreshCart = async() => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart)
    }

    const handleCaptureCheckout = async(checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(cart.line_items);

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} handleEmptyCart={handleEmptyCart} />
                <Routes>
                    <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart}/> } />
                        
                    <Route path="/cart" element={
                        <Cart 
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        /> } 
                    />
                    
                    <Route path="/checkout" element={
                        <Checkout 
                            cart={cart} 
                            order={order}
                            onCaptureChechout={handleCaptureCheckout}
                            error={errorMessage}
                        />} 
                    />

                    <Route path="/confirm" element={
                        <ConfirmationPage 
                            handleEmptyCart={handleEmptyCart}
                        />} 
                    />

                        
                    
                </Routes>
                
            </div>
        </Router>
        
    )
}

export default App