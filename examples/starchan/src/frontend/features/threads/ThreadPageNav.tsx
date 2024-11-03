import { Link } from "react-router-dom";

export interface Props {
  isBottom?: boolean;
}

export default function ThreadPageNav({ isBottom }: Props) {
  const jumpTo = isBottom ? (
    <a href="#top">Top</a>
  ) : (
    <a href="#bottom">Bottom</a>
  );

  return (
    <nav>
      {isBottom && <hr />}[
      <Link to="/" onClick={() => scrollTo(0, 0)}>
        Return
      </Link>
      ] [{jumpTo}]{!isBottom && <hr />}
    </nav>
  );
}
