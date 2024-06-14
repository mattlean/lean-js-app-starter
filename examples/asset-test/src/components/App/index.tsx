import FontTest from '../FontTest'
import PNGTest from '../PNGTest'
import SVGTest from '../SVGTest'

export default function App() {
    return (
        <>
            <h1>LJAS Asset Test</h1>
            <p id="intro">
                This project tests that <strong>Lean JS App Starter</strong> can
                properly load various different assets for a frontend.
            </p>
            <SVGTest />
            <hr />
            <PNGTest />
            <hr />
            <FontTest />
            <footer id="footer-text">
                <p>
                    Check out the{' '}
                    <a href="https://github.com/mattlean/lean-js-app-starter/tree/master/examples/asset-test">
                        source code
                    </a>{' '}
                    for this project on GitHub.
                </p>
                <p>
                    This was built with{' '}
                    <a href="https://github.com/mattlean/lean-js-app-starter">
                        Lean JS App Starter
                    </a>
                    .
                </p>
            </footer>
        </>
    )
}
