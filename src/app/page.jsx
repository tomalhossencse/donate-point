import Container from "@/componets/Container";
import Banner from "@/componets/home/Banner";
import HowItWork from "@/componets/home/HowItWork";
import RecentDoners from "@/componets/home/RecentDoners";

import Image from "next/image";

export default function Home() {
  return (
    <Container className="min-h-screen pt-20 px-6">
      <Banner />
      <RecentDoners />
      <HowItWork />
    </Container>
  );
}
