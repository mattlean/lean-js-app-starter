/**
 * Create a div element that contains "Hello World!"
 * @returns A div element that contains "Hello World!"
 */
export default function helloWorld() {
  const helloWorldDiv = document.createElement("div");
  helloWorldDiv.textContent = "Hello World!";

  return helloWorldDiv;
}
