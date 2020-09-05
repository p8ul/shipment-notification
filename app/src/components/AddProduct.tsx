import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ProductContext } from './Context/ProductContext';
import { api } from '../utils/api';

interface IProps {}

const AddProduct: React.FC<IProps> = () => {
  const { setProducts } = React.useContext(ProductContext);
  const [submiting, setSubmiting] = React.useState(false);

  const addProduct = async () => {
    setSubmiting(true);
    await api.product.create({
      name: 'Cycling Jersey Set Bicycle Short Sleeve ',
      description:
        "Lixada Men's Cycling Jersey Set Bicycle Short Sleeve Set Quick-Dry Breathable Shirt+3D Cushion Shorts Padded Pants/Bib Short",
      image:
        'https://www.marketsom.com/wp-content/uploads/2019/06/22895-fdoptm.jpg',
      notifications: [],
    });
    await api.product.list().then((res) => setProducts(res.data));
    setSubmiting(false);
  };
  return (
    <Grid container spacing={3}>
      <Grid className='centered' item xs={12}>
        <Button
          variant='contained'
          size='small'
          disabled={submiting}
          className={'send-button'}
          onClick={addProduct}
        >
          Add dummy product
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddProduct;
