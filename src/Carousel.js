import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import { useLocomotiveScroll } from 'react-locomotive-scroll'
import LocomotiveScroll from 'locomotive-scroll';
import Content from "./Content.js"

import './styles/Carousel.css';

function Carousel(props) {
    const scrollRef = useRef(null);
    const content = Content[props.type];
    const images = []


    useEffect(() => {

        // preload images for performance
        content.forEach((image) => {
            images.push(new Image().src = image.full)
        })

        const lscroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            direction: 'horizontal'
        });

        lscroll.on('scroll', (obj) => {
            for (const key of Object.keys(obj.currentElements)) {
                if (obj.currentElements[key].el.classList.contains('item-image')) {
                    const progress = obj.currentElements[key].progress;
                    const scaleVal = progress < 0.5 ? clamp(map(progress, 0, 0.5, 0.5, 1), 0.2, 1) : clamp(map(progress, 0.5, 1, 1, 0.5), 0.2, 1);
                    obj.currentElements[key].el.parentNode.style.transform = `scale(${scaleVal})`
                }
            }
        })
        lscroll.update();

    }, [])

    function onClick(e) {

    }

    // Map number x from range [a, b] to [c, d]
    const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

    const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

    return (
        <AnimatePresence>
            <motion.div
                className="carousel-container"
            >
                <div className="logo-small" onClick={() => props.setScreen({ component: 'home' })}>WC</div>
                <main data-scroll-container ref={scrollRef}>
                    <div className="carousel">
                        <motion.div
                            className="gallery"
                            initial={{ scale: .98 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: .15 }}
                        >
                            {
                                content.map((image, index) => {
                                    return (
                                        <div
                                            key={image.id}
                                            className="item"
                                            onClick={() => props.setScreen({
                                                component: 'slideshow',
                                                type: props.type,
                                                initial: index
                                            })}
                                        >
                                            <div className="item-image-container">
                                                <div
                                                    className="item-image"
                                                    style={{ backgroundImage: `url(${image.preview})` }}
                                                    data-scroll
                                                >
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </motion.div>
                    </div>
                </main>
            </motion.div>
        </AnimatePresence>
    );
}

export default Carousel;
