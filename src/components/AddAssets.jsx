import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';

function AddAssets() {
  const navigate = useNavigate();

  const handleChangeAdd = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

      if (data.a_id) {
        const res = await AxiosService.post(ApiRoutes.AddAsset.path, data, {
          authenticate: ApiRoutes.AddAsset.authenticate
        });

        if (res.status === 201) {
          toast.success("Asset added successfully");
          navigate('/inventory');
          return; 
        }
      }

      toast.error("Failed to add asset");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='loginWrapper'>
      <div className='loginHeader'>
        <h2>New Asset</h2>
      </div>
      <Form onSubmit={handleChangeAdd}>
        <Form.Group className="mb-3">
          <Form.Label>Asset Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Asset Name" name='a_name' />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Asset Sold</Form.Label>
          <Form.Control type="number" placeholder="Enter Asset sold Quantity" name='a_sales' />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available Asset</Form.Label>
          <Form.Control type="number" placeholder="Enter Available Asset Quantity" name='a_stock' />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Asset ID</Form.Label>
          <Form.Control type="number" placeholder="Enter Asset ID" name='a_id' />
        </Form.Group>

        <Button className='button' variant="primary" type="submit">
          Add Asset
        </Button>
      </Form>
    </div>
  );
}

export default AddAssets;
