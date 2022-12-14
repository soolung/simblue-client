import "./Footer.scss";
import {useLocation} from "react-router-dom";

export default function Footer() {
    const { pathname } = useLocation();
    if (pathname === "/create") return null;

    return (
        <footer>
            <p>우수경과 김한울애 수행평가 그루브, 수렁.</p>
            <p>
                @soolung
                <a href="https://github.com/soolung" target="_blank"><img alt="github" src="/images/github.svg"/></a>
            </p>
        </footer>
    )
}
