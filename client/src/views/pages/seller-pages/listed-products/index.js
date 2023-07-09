import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import Pagination from 'ui-component/pagination/Pagination';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import './listed.scss';

let PageSize = 10;
const BookedItems = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [List, setList] = useState([]);

    useEffect(() => {
        dispatch({ type: 'LISTED_ITEMS' });
    }, []);

    const all_Listed_Items = useSelector((state) => state?.ListedItemsReducer?.listedItems?.data);
    console.log('all_Listed_Items out', all_Listed_Items);
    useEffect(() => {
        if (all_Listed_Items === undefined) {
            return;
        } else {
            console.log('all_Listed_Items useEffect', all_Listed_Items);
            let newRow = all_Listed_Items.map((values, index) => ({ ...values, id: index + 1 }));

            setList(newRow);
        }
    }, [all_Listed_Items]);

    // =================|| SEARCHED DATA ||=============//
    const sortedItems = useSelector((state) => state?.SearchedListedProductsReducer?.searchedItems);

    console.log('sortedItems listed page>>>>>', sortedItems);
    // =================|| PAGINATION ||==================//
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return sortedItems.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <>
            <MainCard title="Listed Products">
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: 'auto'
                    }}
                >
                    {sortedItems.map((values, index) => (
                        <Card
                            onClick={() => navigate('/product-sammary-page', { state: { values } })}
                            sx={{ display: 'flex', background: '#f5f6fa', width: 400, m: 2 }}
                        >
                            <Avatar
                                alt="product pic"
                                sx={{ width: '40%', height: 'auto' }}
                                variant="rounded"
                                src={`${values?.base_uri}${values?.img_name[0]}`}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {`${values?.name}`}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {`${values?.type}`}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Availability : {`${values?.from_date} to ${values?.to_date}`}
                                    </Typography>
                                </CardContent>

                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}></Box>
                            </Box>
                        </Card>
                    ))}
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={sortedItems.length}
                        pageSize={PageSize}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </MainCard>
        </>
    );
};
export default BookedItems;
