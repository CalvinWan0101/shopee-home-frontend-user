import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Close';
import { randomId } from '@mui/x-data-grid-generator';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';

const initialRows: GridRowsProp = [
    {
        id: randomId(),
        name: "Example Coupon 001",
        deadline: new Date(),
        image: "src/assets/testProductImg.jpg",
    },
    {
        id: randomId(),
        name: "Example Coupon 002",
        deadline: new Date(),
    },
];

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add Coupon
            </Button>
        </GridToolbarContainer>
    );
}

export default function SellerCoupon() {
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

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
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
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
        {
            field: 'name',
            headerName: 'Unique name/ID',
            width: 180,
            editable: true,
            flex: 1,
        },
        {
            field: 'couponType',
            headerName: 'Type of Coupon',
            width: 150,
            headerAlign: "center",
            align: "center",
            editable: true,
            type: 'singleSelect',
            valueOptions: ['免運卷', '商品折價卷'],
        },
        {
            field: 'discount',
            headerName: 'Discount',
            width: 150,
            editable: true,
            type: 'number',
            headerAlign: "center",
            align: "center",
            preProcessEditCellProps: (params) => {
                const isPaidProps = params.otherFieldsProps!.couponType;

                var value = params.props.value.toString();
                if (value.includes("元")) {
                    console.log("include 元")
                    value = value.replaceAll("元", "");
                }
                if (value.includes("%")) {
                    console.log("include %")
                    value = value.replaceAll("%", "");
                }
                if (isPaidProps.value == '免運卷') {
                    return { ...params.props, value: `${value}` };
                } else if (isPaidProps.value === '商品折價卷') {
                    return { ...params.props, value: `${value}` };
                }
                return { ...params.props, value: "Undefine" };
            },
            valueGetter(params) {
                const isPaid = params.row.couponType;

                if (isPaid === '免運卷') {
                    if (params.value === "Undefine 元") {
                        return `${params.value}`;
                    }
                    return `${params.value} 元`;
                } else if (isPaid === '商品折價卷') {
                    if (params.value === "Undefine %") {
                        return `${params.value}`;
                    }
                    return `${params.value} %`;
                }
                return "Undefine";
            },

        },
        {
            field: 'deadline',
            headerName: 'Deadline',
            headerAlign: "center",
            align: "center",
            type: 'date',
            width: 180,
            editable: true,
        },
    ];

    return (
        <Box
            sx={{
                height: 450,
                width: '90%',
                margin: 'auto',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
                marginTop: '50px',
                marginBottom: '100px',
            }}
        >
            <Typography variant="h4">
                Coupons
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                hideFooter={true}
                sx={{
                    "& .MuiDataGrid-cell": {
                        border: "1px solid #ccc",
                    },
                    "& .MuiDataGrid-columnHeader": {
                        border: "1px solid #ccc",
                        borderBottom: 0,
                    },
                    border: '1px solid #ccc',
                }}
            />
        </Box>
    );
}