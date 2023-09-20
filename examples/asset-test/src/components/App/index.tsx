import FontTest from '../FontTest'
import PNGTest from '../PNGTest'
import SVGTest from '../SVGTest'
import './index.css'

export default function App() {
    return (
        <>
            <h1>Lean JS App Starter Asset Test</h1>
            <p>
                This project tests that webpack properly loads various different
                assets for the project.
            </p>
            <hr />
            <SVGTest />
            <hr />
            <PNGTest />
            <hr />
            <FontTest />
        </>
    )
}
