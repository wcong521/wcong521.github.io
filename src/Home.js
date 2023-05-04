import { BiPaint } from 'react-icons/bi'
import { MdPiano } from 'react-icons/md'

import './styles/Home.css';

function Home(props) {
    return (
        <div className="Home">
            {/* <div className="logo">
                <img src="./icons/logo.png" alt="w" />
            </div> */}
            <div className="logo">WC</div>
            <div id="links">
                <div className="link" onClick={() => props.setScreen({ component: 'carousel', type: 'art' })}>
                    <span>art</span>
                </div>
                <div className="link" onClick={() => props.setScreen({ component: 'carousel', type: 'music' })}>
                    <span>music</span>
                </div>
                <div className="link" onClick={() => props.setScreen({ component: 'carousel', type: 'design' })}>
                    <span>design</span>
                </div>
                <div className="link" onClick={() => props.setScreen({ component: 'carousel', type: 'photography' })}>
                    <span>photography</span>
                </div>
            </div>
        </div>
    );
}

export default Home;
