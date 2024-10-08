import './index.scss'

export default function FooterText() {
    return (
        <footer id="footer-text" className="text-center text-muted">
            <p className="mb-0">
                Learn about the tech stack used for this project and more at its{' '}
                <a
                    href="https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/examples/counter-react"
                    className="text-muted"
                >
                    GitHub repo
                </a>
                .
            </p>
            <p>
                Built with{' '}
                <a
                    href="https://github.com/mattlean/lean-js-app-starter"
                    className="text-muted"
                >
                    Lean JS App Starter
                </a>
                .
            </p>
        </footer>
    )
}
