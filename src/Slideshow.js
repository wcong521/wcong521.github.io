import './styles/Slideshow.css';

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import Content from "./Content.js"
import { TbColumns3 } from 'react-icons/tb'

function Slideshow(props) {
    const [slide, setSlide] = useState(props.initial);
    const content = Content[props.type];

    useEffect(() => {
        const handleScroll = (e) => {
            if (Math.abs(e.deltaY) >= 100) paginate(Math.sign(e.deltaY));
        }

        window.addEventListener('wheel', handleScroll);
        return () => window.removeEventListener('wheel', handleScroll);
    }, [slide, content.length])

    const paginate = (direction) => {
        if (direction > 0) {
            if (slide < content.length - 1) setSlide(s => s + 1)
            else setSlide(s => 0)
        }
        if (direction < 0) {
            if (slide > 0) setSlide(s => s - 1)
            else setSlide(s => content.length - 1)
        }
    }

    const renderSlideInfo = () => {
        const nav = []
        for (const [index, item] of content.entries()) {
            console.log(item)
            nav.push(
                <motion.div
                    style={{
                        backgroundColor: content[slide].secondary,
                        opacity: (index === slide) ? 1 : 0.2
                    }}
                    className="nav-item"
                    onClick={(e) => setSlide(index)}
                />
            )
        }
        return (
            <div className="slide-info" style={{ color: content[slide].secondary }}>
                <TbColumns3 className="carousel-icon" size={22} color={content[slide].secondary} onClick={() => props.setScreen({ component: 'carousel', type: props.type })} />
                <div className="slide-info-name">{content[slide].name}</div>
                <div className="slide-info-date">{content[slide].date}</div>
                <div className="slide-nav">{nav}</div>
            </div>
        );
    }

    const handleKeyUp = (e) => {
        console.log(e.key)
        if (e.key === 'Escape') props.setScreen({ component: 'carousel', type: props.type })
    }

    return (
        <AnimatePresence>
            <motion.div
                className="slideshow-container"
                onKeyUp={handleKeyUp}
                tabIndex={0}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: .2 }}
            >
                <div className="logo-small-left" style={{ color: content[slide].secondary }} onClick={() => props.setScreen({ component: 'home' })}>WC</div>
                {renderSlideInfo()}
                <div className="slideshow" style={{ backgroundColor: content[slide].primary }}>
                    <motion.img
                        key={content[slide].id}
                        src={content[slide].full}
                        alt={content[slide].name}
                        initial={{ scale: 1.01 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 1.01 }}
                        transition={{ duration: .5 }}
                        style={{
                            maxWidth: `${100 * content[slide].scale}vw`,
                            maxHeight: `${100 * content[slide].scale}vh`
                        }}
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Slideshow