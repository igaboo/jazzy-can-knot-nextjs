import {
  NotificationBanner,
  Navbar,
  Hero,
  ProductBanner,
  Products,
  BulkContact,
  FeaturedPosts,
  Footer,
} from "../components";

import { client } from "../lib/client";

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);

  return {
    props: { products, banner },
  };
};

export default function Home({ products, banner }) {
  return (
    <>
      <NotificationBanner />
      <Navbar />
      <Hero banner={banner && banner[0]} />
      {products
        .filter((product) => product.featured === true)
        .map((product) => {
          return (
            <ProductBanner key={product._id} product={product && product} />
          );
        })}
      <Products
        title="Tie Blankets"
        products={
          products && products.filter((product) => product.featured === false)
        }
      />
      <BulkContact />
      <FeaturedPosts />
      <Footer />
    </>
  );
}
