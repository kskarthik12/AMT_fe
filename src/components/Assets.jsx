import React, { useState, useEffect } from 'react';
import '../admin.css';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import ReactSearchBox from "react-search-box";
import { useNavigate } from 'react-router-dom';

function Assets() {
    
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const navigate = useNavigate();
    const companyName = sessionStorage.getItem('company_name'); // Get company name from session storage

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await AxiosService.get(ApiRoutes.ASSETS.path, {
                authenticate: ApiRoutes.ASSETS.authenticate
            });
            if (res.status === 200) {
                const filteredAssets = res.data.assets.filter(asset => asset.company_name === companyName); // Filter by company_name
                setData(filteredAssets);
                setOriginalData(filteredAssets);
            }
        } catch (error) {
            handleRequestError(error);
        }
    };

    const handleRequestError = (error) => {
        toast.error(error.response?.data?.message || error.message);
        if (error.response?.status === 402) {
            logout();
        }
    };

   

    const handleChangeAdd = () => {
        let role = sessionStorage.getItem('role');
        if (role === 'admin')
            navigate('/addassets');
        else
            navigate('/inventory');
    };

    const handleDelete = async (id) => {
        let role = sessionStorage.getItem('role');
        if (role === 'admin') {
            if (!window.confirm("Are you sure?")) return;

            try {
                await AxiosService.delete(`${ApiRoutes.DeleteAsset.path.replace(':id', id)}`, {
                    authenticate: ApiRoutes.DeleteAsset.authenticate
                });

                setData(data.filter(item => item._id !== id));
                toast.success("Asset deleted successfully");

            } catch (error) {
                console.error("Delete request failed:", error);
                if (error.response) {
                    console.error("Server responded with status:", error.response.status);
                    console.error("Response data:", error.response.data);
                }
                toast.error("Failed to delete asset");
            }
        } else {
            navigate('/inventory');
        }
    };

    const handleEdit = (id) => {
        let role = sessionStorage.getItem('role');
        if (role === 'admin')
            navigate(`/editasset/${id}`);
        else
            navigate('/inventory');
    };

    const handleSearch = (query) => {
        if (query.trim() === '') {
            // If search query is empty, reset to original data
            setData(originalData);
        } else {
            // Filter data based on search query
            const filteredData = originalData.filter(item => item.a_name.toLowerCase().includes(query.toLowerCase()));
            setData(filteredData);
        }
    };

    return (
        <main className='main-container'>
            <ReactSearchBox
                placeholder="Search"
                onChange={handleSearch} 
            />
            <Button className='button' variant="primary" type="submit" onClick={handleChangeAdd}>Add Assets</Button>

            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Brand Name</th>
                        <th>Asset Id</th>
                        <th>Purchase Price</th>
                        <th>Selling Price</th>
                        <th>Available Asset</th>
                        <th>Asset Position</th>
                        <th>Last Update</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.a_name}</td>
                            <td>{item.b_name}</td>
                            <td>{item.a_id}</td>
                            <td>{item.purchase_price}</td>
                            <td>{item.selling_price}</td>
                            <td>{item.a_stock}</td>
                            <td>{item.a_position}</td>
                            <td>{item.stock_last_update}</td>
                            <td><Button className='button' variant="secondary" type="submit" onClick={() => handleEdit(item._id)}>Edit</Button></td>
                            <td><Button className='button' variant="danger" type="submit" onClick={() => handleDelete(item._id)}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}

export default Assets;
