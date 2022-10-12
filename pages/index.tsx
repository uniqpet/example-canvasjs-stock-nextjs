import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";

const CandleChart = dynamic(() => import("../components/CandleChart"), { ssr: false });

const Home: NextPage = () => {
  return (
    <Layout>
      <CandleChart />
    </Layout>
  );
};

export default Home;
