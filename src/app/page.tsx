import ProductsManager from "./components/ProductsManager";


const HomePage = () => {
  return (
    <div className='flex items-center flex-col size-10 w-screen p-10 m-10 box-border'>
      <h1>THE BASKET APP</h1>
      <ProductsManager />
    </div>
  );
};

export default HomePage;
