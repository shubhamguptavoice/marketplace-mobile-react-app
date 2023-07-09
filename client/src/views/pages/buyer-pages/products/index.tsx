import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import { Avatar, Paper, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';

const ProductsForSell = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [List, setList] = useState([]);

    useEffect(() => {
        dispatch({ type: 'LISTED_ITEMS' });
    }, []);

    const all_Listed_Items = useSelector((state: any) => state?.ListedItemsReducer?.listedItems?.data);
    console.log('all_Listed_Items out', all_Listed_Items);
    useEffect(() => {
        if (all_Listed_Items === undefined) {
            return;
        } else {
            console.log('all_Listed_Items useEffect', all_Listed_Items);
            let newRow = all_Listed_Items.map((values: any, index: any) => ({ ...values, id: index + 1 }));

            setList(newRow);
        }
    }, [all_Listed_Items]);

    return (
        <>
            <MainCard title="Listed Products">
                <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: 'auto' }}>
                    {List.map((values: any, index: any) => {
                        return (
                            <Card sx={{ maxWidth: 282, border: '1px solid #bdc3c7', margin: 1 }}>
                                <CardMedia sx={{ height: 200 }} image={`${values?.base_uri}${values?.img_name[0]}`} title="green iguana" />
                                <CardContent sx={{ width: 282 }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {values?.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {values?.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small" onClick={() => navigate('/product-sammary-page', { state: { values } })}>
                                        Buy Now
                                    </Button>
                                </CardActions>
                            </Card>
                        );
                    })}
                </div>
            </MainCard>
        </>
    );
};
export default ProductsForSell;
