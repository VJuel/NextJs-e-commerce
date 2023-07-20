import React, {useContext, useState} from 'react';
import {BtnPayement} from "@/src/components/front/button/BtnPayement";
import {CartContext} from "@/src/components/CartContext";

export default function FormPayement() {
    const {cartProducts} = useContext(CartContext)
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [codePostal, setCodePostal] = useState("");
    const [streetAdress, setStreetAdress] = useState("");
    const [country, setCountry] = useState("");

    return (
        <aside className="flex flex-col flex-grow-1 w-full lg:w-1/3 rounded-xl shadow-xl bg-gray-100 p-4">
            <h2 className="mb-2 text-2xl font-bold">Order information</h2>
            <form method="post" action="/api/checkout" className="formPayement">
                <input type="text" placeholder="Name" name="name" value={name} onChange={(ev) => setName(ev.target.value)}/>
                <input type="text" placeholder="Email" name="email" value={email} onChange={(ev) => setEmail(ev.target.value)}/>
                <input className="!w-1/2 pl-2" type="text" name="city" placeholder="City" value={city} onChange={(ev) => setCity(ev.target.value)}/>
                <input className="!w-1/2" type="text" placeholder="Code postal" name="code postal" value={codePostal} onChange={(ev) => setCodePostal(ev.target.value)}/>
                <input type="text" placeholder="Street adress" name="street adress" value={streetAdress} onChange={(ev) => setStreetAdress(ev.target.value)}/>
                <input className="!mb-10" type="text" placeholder="country" name="country" value={country} onChange={(ev) => setCountry(ev.target.value)}/>
                <input type="hidden" name="products" value={cartProducts.join(',')} onChange={(ev) => setProducts(ev.target.value)}/>
                <BtnPayement type="submit"/>
            </form>
        </aside>
    );
};

