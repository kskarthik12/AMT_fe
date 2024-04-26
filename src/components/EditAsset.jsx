import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';

function EditAsset() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assetData, setAssetData] = useState({
    a_name: '',
    a_sales: '',
    a_stock: '',
    a_id: ''
  });

  useEffect(() => {
    fetchAssetData();
  }, []);

  const fetchAssetData = async () => {
    try {
      const res = await AxiosService.get(`${ApiRoutes.GetAssetById.path.replace(':id', id)}`, {
        authenticate: ApiRoutes.GetAssetById.authenticate
      });

      if (res.status === 200) {
        const data = res.data;
        const defaultAssetData = {
          a_name: data.asset.a_name,
          a_sales: data.asset.a_sales,
          a_stock: data.asset.a_stock,
          a_id: data.asset.a_id,
        };
        setAssetData(defaultAssetData);
      }
    } catch (error) {
      console.error("Failed to fetch asset data:", error);
      toast.error("Failed to fetch asset data");
    }
  };

  const handleEditAsset = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);

        const res = await AxiosService.put(`${ApiRoutes.EditAsset.path.replace(':id', id)}`, data, {
        authenticate: ApiRoutes.EditAsset.authenticate
      });

      if (res.status === 201) {
        toast.success("Asset edited successfully");
        navigate('/inventory'); // Navigate to inventory page after editing
      } else {
        toast.error("Failed to edit asset");
      }
    } catch (error) {
      console.error("Edit request failed:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='loginWrapper'>
      <div className='loginHeader'>
        <h2>Edit Asset</h2>
      </div>
      <Form onSubmit={handleEditAsset}>
        <Form.Group className="mb-3">
          <Form.Label>Asset Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Asset Name" name='a_name' value={assetData.a_name} onChange={(e) => setAssetData({ ...assetData, a_name: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Asset Sold</Form.Label>
          <Form.Control type="number" placeholder="Enter Asset sold Quantity" name='a_sales' value={assetData.a_sales} onChange={(e) => setAssetData({ ...assetData, a_sales: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available Asset</Form.Label>
          <Form.Control type="number" placeholder="Enter Available Asset Quantity" name='a_stock' value={assetData.a_stock} onChange={(e) => setAssetData({ ...assetData, a_stock: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Asset ID</Form.Label>
          <Form.Control type="number" placeholder="Enter Asset ID" name='a_id' value={assetData.a_id} readOnly />
        </Form.Group>

        <Button className='button' variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
}

export default EditAsset;
