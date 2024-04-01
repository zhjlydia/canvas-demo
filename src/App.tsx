import './App.less';
import Routes from '@/router/routes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
    useEffect(() => {
        console.log('mount');
        return () => {
            console.log('unmount');
        };
    }, []);
    const navigate = useNavigate();
    return (
        <div className="app">
            <div className="nav-bar">
                <div className="logo">Canvas demo</div>
                <div className="nav-item" onClick={() => navigate('/basic')}>
                    基本绘制
                </div>
                <div className="nav-item" onClick={() => navigate('/clip')}>
                    clip
                </div>
                <div className="nav-item" onClick={() => navigate('/paint-board')}>
                    画板
                </div>
                <div className="nav-item" onClick={() => navigate('/draw-image')}>
                    绘制图像
                </div>
                <div className="nav-item" onClick={() => navigate('/download-image')}>
                    保存图像
                </div>
                <div className="nav-item" onClick={() => navigate('/game')}>
                    动画
                </div>
            </div>
            <div className="main">
                <Routes />
            </div>
        </div>
    );
}

export default App;
