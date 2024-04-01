import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

const Basic = lazy(() => import('@/pages/basic'));
const Clip = lazy(() => import('@/pages/clip'));
const PaintBoard = lazy(() => import('@/pages/paint-board'));
const DrawImage = lazy(() => import('@/pages/draw-image'));
const DownloadImage = lazy(() => import('@/pages/download-image'));
const Game = lazy(() => import('@/pages/game'));

function LazyRoute({ children }: React.PropsWithChildren) {
    return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}

function Routes() {
    const element = useRoutes([
        {
            path: '/basic',
            element: <Basic />,
        },
        {
            path: '/clip',
            element: (
                <LazyRoute>
                    <Clip />
                </LazyRoute>
            ),
        },
        {
            path: '/paint-board',
            element: (
                <LazyRoute>
                    <PaintBoard />
                </LazyRoute>
            ),
        },
        {
            path: '/draw-image',
            element: (
                <LazyRoute>
                    <DrawImage />
                </LazyRoute>
            ),
        },
        {
            path: '/download-image',
            element: (
                <LazyRoute>
                    <DownloadImage />
                </LazyRoute>
            ),
        },
        {
            path: '/game',
            element: (
                <LazyRoute>
                    <Game />
                </LazyRoute>
            ),
        },
    ]);

    return element;
}

export default Routes;
