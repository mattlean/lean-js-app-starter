export default function Footer() {
    return (
        <footer id="bottom" className="footer">
            <p>
                *chan (pronounced as starchan) is a{' '}
                <a href="https://en.wikipedia.org/wiki/Textboard">textboard</a>{' '}
                that demonstrates one of{' '}
                <a href="#">
                    Lean JS App Starter&#39;s full-stack project setups
                </a>
                . It showcases an Express server that acts as a REST API and a
                React server-side renderer. These work in tandem with a React
                frontend.
            </p>
            <nav>
                <ul className="footer__links">
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">*chan GitHub</a>
                    </li>
                    <li>
                        <a href="https://github.com/mattlean/lean-js-app-starter">
                            Lean JavaScript Application Starter
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}
