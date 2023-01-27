export default function delay(milliseconds = 1000) {
  return new Promise((resolve, reject) => setTimeout(resolve, milliseconds));
}
