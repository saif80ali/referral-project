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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  let history = useNavigate();
  const [trasnactions, updateTrasnactions]: any = useState([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    console.log("clikci", id)
    deleteMethod("stocks/" + id).then((response) => {
      alert("Item removed")
      updateTrasnactions(trasnactions.filter((item:any) => item._id !== id));
    }).catch((error) => {
      console.error(error);
    })
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = trasnactions.find((item:any) => item.id === id);
    if (editedRow?.isNew) {
      updateTrasnactions(trasnactions.filter((item:any) => item.id !== id));
    }
  };

  const capitalizeFirstWord = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const columns: GridColDef<(typeof trasnactions)[number]>[] = [
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
      renderCell: (params) => capitalizeFirstWord(params.value),
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
      getMethod("stocks/").then((response) => {
        updateTrasnactions(response.data);
      }).catch((err) => {
        console.error(err)
      })
    } else {
      localStorage.removeItem("token");
      history("/");
    }
    
  },[])

  function DataTable() {
    return (
      <>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={trasnactions}
            getRowId={(trasnactions) => trasnactions?._id}
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
      {trasnactions.length ? DataTable() : <NoRecordsFound></NoRecordsFound>}
      <NavLink className='btn btn-warning text-light mt-2' to="/new-entry">Add a new record</NavLink>
    </section>
    
  );
}
