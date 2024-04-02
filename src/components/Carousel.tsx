import { useState } from "react";
import React from "react";

export default function Carousel(){

     const [activeImage, setActiveImage] = useState(1);
     const img1 = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
     const img2 = "https://images.unsplash.com/photo-1606117331085-5760e3b58520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
     const img3 = "https://images.unsplash.com/photo-1667971286579-63a5222780ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";

    return (
        <div>
            <div className="carousel">
                <ul className="carousel__slides">
                    <input type="radio" name="radio-buttons" id="img-1" checked={activeImage === 1 } readOnly/>
                </ul>
                <li className="carousel__slide-container">
                    <div className="carousel__silde-img">
                        <img src={img1} alt="scenery"/>
                    </div>
                    <div className="casousel__controls">
                        <label className="carousel__slide_prev" onClick={() => {setActiveImage(3)}}><span>&lsaquo;</span></label>
                    </div>
                </li>
            </div>
        </div>
    );
}