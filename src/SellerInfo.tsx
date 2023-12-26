import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Close';
import { randomId } from '@mui/x-data-grid-generator';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';

const initialRows: GridRowsProp = [
    {
        id: randomId(),
        information: "Name",
        info_value: "Example name",
    },
    {
        id: randomId(),
        information: "Phone Number",
        info_value: "0123456789",
    },
    {
        id: randomId(),
        information: "Email",
        info_value: "example@gmail.com",
    },
    {
        id: randomId(),
        information: "Address",
        info_value: "Example address",
    },
    {
        id: randomId(),
        information: "Description",
        info_value: "This is an example description",
    }
];

export default function SellerInfomation() {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 120,
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
                ];
            },
        },
        {
            field: 'information',
            headerName: 'Information',
            width: 180,
            editable: false,
        },
        {
            field: 'info_value',
            headerName: 'Information',
            editable: true,
            flex: 1,
        },
    ];

    return (
        <Box
            sx={{
                width: '90%',
                columnWidth: '100%',
                margin: "auto",
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
                marginBottom: "50px",
                marginTop: "50px",
            }}
        >
            <Typography variant="h4">
                Informations
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                hideFooter={true}
                columnHeaderHeight={0}
                slots={{
                    columnHeaders: () => null,
                }}
                sx={{
                    "& .MuiDataGrid-cell": {
                        border: "1px solid #ccc",
                    },
                }}
            />
        </Box>
    );
}