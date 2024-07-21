import ProductsManager from "./components/ProductsManager";


const HomePage = () => {
  return (
    <div className='flex items-center flex-col size-10 w-screen p-1 m-1 box-border'>
      <h1>My Basket Data</h1>
      <ProductsManager />
    </div>
  );
};

export default HomePage;
