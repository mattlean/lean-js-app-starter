import FontTest from './FontTest'
import SVGLogo from './SVGTest'

export default function App() {
    return (
        <>
            <h1>Lean JS App Starter Asset Test</h1>
            <p>
                This project tests that webpack properly loads various different
                assets for the project.
            </p>
            <hr />
            <SVGLogo />
            <hr />
            <FontTest />
        </>
    )
}
