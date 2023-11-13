import { useFetch } from "./hooks";

const Metrics = () => {
  const { isLoading, error, data } = useFetch("/metrics");

  if (error) return <div>{error}</div>;

  return (
    <>
      <pre>{data}</pre>
      {isLoading && <div className="loading">loading...</div>}
    </>
  );
};

export default Metrics;
