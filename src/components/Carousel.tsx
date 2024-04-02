import { useState } from "react";
import React from "react";

export default function Carousel(){

     const [activeImage, setActiveImage] = useState(1);
     const img1 = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
     const img2 = "https://images.unsplash.com/photo-1606117331085-5760e3b58520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
     const img3 = "https://images.unsplash.com/photo-1667971286579-63a5222780ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";

     console.log(activeImage);
    return (
        <div>
            <div className="carousel">
                <ul className="carousel__slides">
                    <input type="radio" name="radio-buttons" id="img-1" checked={activeImage === 1 } readOnly/>
                    <li className="carousel__slide-container">
                        <div className="carousel__silde-img">
                            <img src={img1} alt="scenery"/>
                        </div>
                        <div className="carousel__controls">
                            <label className="carousel__slide-prev" onClick={() => {setActiveImage(3)}}><span>&lsaquo;</span></label>
                            <label className="carousel__slide-next" onClick={() => {setActiveImage(2)}}><span>&rsaquo;</span></label>
                        </div>
                    </li>

                    <input type="radio" name="radio-buttons" id="img-2" checked={activeImage === 2 } readOnly/>
                    <li className="carousel__slide-container">
                        <div className="carousel__silde-img">
                            <img src={img2} alt="scenery 2"/>
                        </div>
                        <div className="carousel__controls">
                            <label className="carousel__slide-prev" onClick={() => {setActiveImage(1)}}><span>&lsaquo;</span></label>
                            <label className="carousel__slide-next" onClick={() => {setActiveImage(3)}}><span>&rsaquo;</span></label>
                        </div>
                    </li>

                    <input type="radio" name="radio-buttons" id="img-3" checked={activeImage === 3 } readOnly/>
                    <li className="carousel__slide-container">
                        <div className="carousel__silde-img">
                            <img src={img3} alt="scenery 3"/>
                        </div>
                        <div className="carousel__controls">
                            <label className="carousel__slide-prev" onClick={() => {setActiveImage(2)}}><span>&lsaquo;</span></label>
                            <label className="carousel__slide-next" onClick={() => {setActiveImage(1)}}><span>&rsaquo;</span></label>
                        </div>
                    </li>

                    <div className="carousel__dots">
                        <label className="carousel__dot" id="img-dot-1" onClick={() => {setActiveImage(1)}}></label>
                        <label className="carousel__dot" id="img-dot-2" onClick={() => {setActiveImage(2)}}></label>
                        <label className="carousel__dot" id="img-dot-3" onClick={() => {setActiveImage(3)}}></label>
                    </div>
                </ul>
            </div>
        </div>
    );
}