import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModes, GridRowModesModel  } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import NoRecordsFound from './NoRecordsFound';
import {getMethod, deleteMethod} from '../services/apiCallService';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoader } from '../store/features/loaderState';

export default function Transactions() {
  const dispatch = useDispatch();
  let history = useNavigate();
  const [transactions, updatetransactions]: any = useState([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    dispatch(setLoader(true));
    deleteMethod("stocks/" + id).then((response) => {
      alert("Item removed")
      updatetransactions(transactions.filter((item:any) => item._id !== id));
      dispatch(setLoader(false));
    }).catch((error) => {
      console.error(error);
      dispatch(setLoader(false));
    })
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = transactions.find((item:any) => item.id === id);
    if (editedRow?.isNew) {
      updatetransactions(transactions.filter((item:any) => item.id !== id));
    }
  };

  const columns: GridColDef<(typeof transactions)[number]>[] = [
    {
      field: 'transaction_date',
      headerName: 'Transaction date',
      type:"date",
      valueGetter: (value) => {return new Date(value)},
      width: 150,
    },
    {
      field: 'stock_name',
      headerName: 'Stock name',
      width: 150,
      renderCell: (params) => (params.value).toUpperCase(),
    },
    {
      field: 'transaction_type',
      headerName: 'Transaction type',
      width: 150,
      type: 'string',
      renderCell: (params) => params.value.charAt(0).toUpperCase() + params.value.slice(1),
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 110,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 110,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 160,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const isLoggedIn = useSelector(
    (state: RootState) => state.userLogin.userLoggedIn
  );

  useEffect(()=>{
    if (isLoggedIn) {
      dispatch(setLoader(true));
      getMethod("stocks/").then((response) => {
        updatetransactions(response.data);
        dispatch(setLoader(false));
      }).catch((err) => {
        console.error(err)
      })
    } else {
      history("/");
    }
    
  },[])

  function DataTable() {
    return (
      <>
        <Box sx={{ height: 'auto', width: '100%' }}>
          <DataGrid
            rows={transactions}
            getRowId={(transactions) => transactions?._id}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
            disableRowSelectionOnClick
            disableColumnSelector={true}
          />
        </Box>
      </>
    )
  }

  return (
    <section className='container'>
      {transactions.length ? DataTable() : <NoRecordsFound></NoRecordsFound>}
      <NavLink className='btn btn-warning text-light mt-2' to="/new-entry">Add a new record</NavLink>
    </section>
    
  );
}
