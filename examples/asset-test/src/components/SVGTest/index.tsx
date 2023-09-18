import ReactLogo from './react-logo.svg'

export default function SVGLogo() {
    return (
        <div>
            <h2>SVG Test</h2>
            <img src={ReactLogo} alt="React Logo" className="react-logo" />
        </div>
    )
}
