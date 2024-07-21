import AddDataForm from './components/AddDataForm';
import ShowItems from './components/ShowItems';

const HomePage = () => {
  return (
    <div className='flex items-center flex-col size-10 w-screen p-10 m-10 box-border'>
      <h1>Basket App</h1>
      <AddDataForm />
      <ShowItems />
    </div>
  );
};

export default HomePage;
