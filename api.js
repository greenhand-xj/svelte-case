export const api = (topic = "react") => {
  const controller = new AbortController();
  const signal = controller.signal;
  const promise = fetch(
    `https://api.github.com/search/repositories?q=topic:${topic}`,
    {
      signal
    }
  ).then((res) => res.json());

  return [promise, controller];
};
