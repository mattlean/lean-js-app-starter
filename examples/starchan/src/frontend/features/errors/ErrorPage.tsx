import { useEffect } from "react";

export interface Props {
  content?: string;
  heading: string;
}

export default function ErrorPage({ content, heading }: Props) {
  useEffect(() => {
    document.title = "Error | ljas-starchan";
  }, []);

  return (
    <>
      <h1>{heading}</h1>
      {content && (
        <p>
          <i>{content}</i>
        </p>
      )}
      <p>
        <a href="/">Return to the home page.</a>
      </p>
    </>
  );
}
