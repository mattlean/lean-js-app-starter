/**
 * This component will always throw an error to test frontend error handling.
 * This should only be available in non-production modes.
 */
export default function Fail() {
  throw new Error();
}
