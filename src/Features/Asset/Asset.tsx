import { useEffect, useState } from "react";
import ITableData, {
  IPagination,
  ITableHeader,
} from "../../Components/ReusableTable/interface/IReusableTableProps.interface";
import ReusableTable from "../../Components/ReusableTable/ReusableTable";
import {
  AlertColor,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import ReusableModal from "../../Components/ReusableModal/ReusableModal";
import Mode from "../../Components/ReusableModal/Enum/enum";
import ColorBuilder from "../../Components/ColorBuilder/ColorBuilder";
import { equipmentService } from "../../Shared/Services/Asset/Asset";
import { ISelect } from "../../Shared/Interface/ISelect.interface";
import { locationService } from "../../Shared/Services/Location/Location";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ICreateUpdateAssets from "./interface/ICreateUpdateAssets";
import Notification from "../../Components/Notification/Notification";
import { Utility } from "../../Shared/Utility/Utility";
import ReusableTextField from "../../Components/ReusableTextField/ReusableTextField";
import DcService from "../../Shared/Services/Dc/DcService";

const validation = Yup.object().shape({
  EquipmentId: Yup.number().notRequired(),
  Name: Yup.string().required("Equipment Name is required"),
  Code: Yup.string().required("Equipment Code is required"),
  PurchaseDate: Yup.string().required("PurchaseDate is required"),
  EquipmentStatus: Yup.string().required("Equipment Status is required"),
  BuildingId: Yup.number()
    .transform((value) => (value === "" ? null : value == 0 ? null : value))
    .nullable()
    .required("Equipment Type is required")
    .typeError("Equipment Type is required"),
  EquipmentTypeId: Yup.number()
    .transform((value) => (value === "" ? null : value == 0 ? null : value))
    .nullable()
    .required("Equipment Type is required")
    .typeError("Equipment Type is required"),
});

function Asset() {
  type FieldName = keyof ICreateUpdateAssets;
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ICreateUpdateAssets>({
    resolver: yupResolver(validation),
  });

  const [page, setPage] = useState(1);
  const [asset, setAsset] = useState<ITableData[]>([] as ITableData[]);
  const [modalMode, setModalMode] = useState<Mode>(Mode.CREATE);
  const [open, setOpen] = useState(false);
  const [equipmentTypes, setEquipmenTypes] = useState<ISelect[]>(
    [] as ISelect[]
  );
  const [locations, setLocations] = useState<ISelect[]>([] as ISelect[]);
  const [fieldValues, setFieldValues] = useState<ICreateUpdateAssets>(
    {} as ICreateUpdateAssets
  );
  const [success, setSuccess] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [previousData, setPreviousData] = useState<ICreateUpdateAssets>(
    {} as ICreateUpdateAssets
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const [state, setState] = useState<IPagination>({
    searchQuery: "",
    pageNumber: 1,
    pageSize: 10,
    pageCount: 0,
    columnToSort: "",
    orderBy: "asc",
  });

  const initialValues: ICreateUpdateAssets = {
    EquipmentId: undefined,
    Name: "",
    Code: "",
    EquipmentTypeId: 0,
    BuildingId: 0,
    EquipmentStatus: "",
    PurchaseDate: "",
  };

  function handleSortChange(name: string) {
    let direction: "asc" | "desc" = "asc";

    if (state.orderBy === "asc") {
      direction = "desc";
    }

    setState((prevPagination) => ({
      ...prevPagination,
      columnToSort: name,
    }));

    setState((prevPagination) => ({
      ...prevPagination,
      orderBy: direction,
    }));
  }
  function handleSetPage(pageNumber: number) {
    setState((prevPagination) => ({
      ...prevPagination,
      pageNumber: pageNumber,
    }));
  }

  function handleSetSearchQuery(search: string) {
    setState((prevPagination) => ({
      ...prevPagination,
      searchQuery: search,
    }));
  }

  function handleSetItemPerPage(event: SelectChangeEvent<number>) {
    setState((prevPagination) => ({
      ...prevPagination,
      pageSize: event.target.value as number,
      pageNumber: 1,
    }));
  }

  async function GetAssetList() {
    const response = await equipmentService.GetEquipmentList(state);

    const equipmentList: ITableData[] = response.data.data.map(
      (item: unknown) => {
        const equipmentItem = item as ITableData;

        return {
          ...equipmentItem,
          ColorCode: (
            <ColorBuilder
              header="EquipmentStatus"
              value={
                equipmentItem.EquipmentStatus === "Defective"
                  ? "#C00000"
                  : "#00B050"
              }
              row={equipmentItem}
            />
          ),
          PurchaseDate: Utility.formatDate(
            equipmentItem.PurchaseDate as string
          ),
          IncidentDate: Utility.formatDate(
            equipmentItem.IncidentDate as string
          ),
          ReportedDate: Utility.formatDate(
            equipmentItem.ReportedDate as string
          ),
          Age: Utility.formateAge(equipmentItem.PurchaseDate as string),
        };
      }
    );

    setAsset(equipmentList);
    setPage(response.data.count);
  }

  useEffect(() => {
    const fetchData = async () => {
      await GetAssetList();
    };

    fetchData();
  }, [state, success, open, deleteModalOpen]);

  const fetchEquipmentAndLocationData = async (): Promise<{
    equipmentTypes: ISelect[];
    locations: ISelect[];
  }> => {
    const equipmentTypeList = await equipmentService.GetEquipmentTypesAsync();
    const equipmentTypes: ISelect[] = equipmentTypeList.map((item: unknown) => {
      const typedItem = item as {
        Description: string;
        EquipmentTypeId: string;
      };

      return {
        Label: typedItem.Description,
        Value: typedItem.EquipmentTypeId,
      };
    });

    const locations = await DcService.GetDcSelect();

    return { equipmentTypes, locations };
  };

  const handleOpen = async () => {
    setOpen(true);
    setModalMode(Mode.CREATE);
    const { equipmentTypes, locations } = await fetchEquipmentAndLocationData();
    setEquipmenTypes(equipmentTypes);
    setLocations(locations);
  };

  const handleFieldChange = (name: FieldName, value: unknown) => {
    console.log(value, "this is value");
    setFieldValues((prev) => ({ ...prev, [name]: value }));
    clearErrors(name);
  };

  const handleCreateUpdateAsset = async (data: ICreateUpdateAssets) => {
    data.EquipmentId = fieldValues.EquipmentId;
    const isDataExist = await equipmentService.IsDataExist(data);

    console.log(isDataExist.data, "isExist");

    if (isDataExist.data) {
      setSnackbarSeverity("error");
      setIsSnackbarOpen(true);
      setNotificationMessage("Equipment is Already exist!");
      return;
    }

    let success = false;
    if (modalMode === Mode.CREATE) {
      const response = await equipmentService.CreateEquipmentAsync(data);
      success = response ?? false;
    } else {
      const response = await equipmentService.UpdateEquipmentAsync(
        fieldValues.EquipmentId as number,
        data
      );
      success = response ?? false;
    }

    if (success) {
      onClose();
      setSuccess(true);
      setSnackbarSeverity("success");
      setIsSnackbarOpen(true);
      setNotificationMessage(
        modalMode === Mode.CREATE
          ? "Save Sucessfully"
          : "Update Changes Successfully"
      );
    } else {
      onClose();
      onClose();
      setSuccess(false);
      setSnackbarSeverity("error");
      setIsSnackbarOpen(true);
      setNotificationMessage("An error occured.");
    }
  };

  const handleEdit = async (id: unknown[]) => {
    const equpmentMentId = id.length > 0 ? id[0] : null;
    const response = await equipmentService.GetEquipmentAsync(
      equpmentMentId as number
    );
    const { equipmentTypes, locations } = await fetchEquipmentAndLocationData();

    setEquipmenTypes(equipmentTypes);
    setLocations(locations);
    setFieldValues(response);
    setPreviousData(response);
    setOpen(true);
    setModalMode(Mode.EDIT);
  };

  const handleGetDetailsToDelete = async (id: unknown[]) => {
    const equpmentMentId = id.length > 0 ? id[0] : null;

    const response = await equipmentService.GetEquipmentAsync(
      equpmentMentId as number
    );

    fieldValues.EquipmentId = response.EquipmentId;
    fieldValues.Name = response.Name;
    setDeleteModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const response = await equipmentService.DeleteEquipmentAsync(id);
    if (response) {
      onCloseDeleteModal();
      setSuccess(true);
      setIsSnackbarOpen(true);
      setSnackbarSeverity("success");
      setNotificationMessage(fieldValues.Name + " is Deleted successfully");
    } else {
      setSuccess(false);
      setSnackbarSeverity("error");
      setIsSnackbarOpen(true);
      setNotificationMessage("An error occured");
    }
  };

  const handleReset = async () => {
    setFieldValues(initialValues);
  };

  const hasChangesInData = (edited: ICreateUpdateAssets) => {
    const hasChanged = JSON.stringify(previousData) !== JSON.stringify(edited);

    setHasChanges(hasChanged);
  };

  useEffect(() => {
    hasChangesInData(fieldValues);
  }, [fieldValues]);

  const header: ITableHeader[] = [
    { Name: "Equipment Code", Key: "Code" },
    { Name: "Name", Key: "Name" },
    { Name: "Type", Key: "EquipmentType" },
    { Name: "Location", Key: "Location" },
    { Name: "Purchase Date", Key: "PurchaseDate" },
    { Name: "Age", Key: "Age" },
    { Name: "Condition", Key: "ColorCode" },
    { Name: "Incident Date", Key: "IncidentDate" },
    { Name: "Reported", Key: "ReportedDate" },
    { Name: "Last Assignment", Key: "LastAssignment" },
  ];

  const filters = [
    { FilterName: "Show All", Value: "" },
    { FilterName: "Group by Type", Value: "Type" },
    { FilterName: "Group by Condition", Value: "Condition" },
    { FilterName: "Group by Location", Value: "Location" },
  ];

  const onClose = async () => {
    setOpen(false);
    setFieldValues(initialValues);
    reset();
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const onCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setFieldValues(initialValues);
    setIsUsed(false);
  };

  return (
    <>
      <Notification
        IsSnackbarOpen={isSnackbarOpen}
        SuccessMessage={notificationMessage}
        ErrorMessage={notificationMessage}
        Severity={snackbarSeverity}
        handleSnackbarClose={handleSnackbarClose}
      />
      <ReusableTable
        state={state}
        headers={header}
        IdName="EquipmentId"
        customFilters={filters}
        headerName="Asset List"
        searchName=" Search Asset"
        data={asset}
        handleOpen={handleOpen}
        handleSortChange={handleSortChange}
        handleSetPage={handleSetPage}
        handleSetSearchQuery={handleSetSearchQuery}
        handleSetItemPerPage={handleSetItemPerPage}
        pageNumber={page}
        handleEdit={handleEdit}
        handleDelete={handleGetDetailsToDelete}
      />
      <ReusableModal
        title={
          modalMode === Mode.CREATE
            ? "Enrollment – Equipment"
            : modalMode === Mode.EDIT
              ? "Update - Equipment"
              : "Delete - Equipment"
        }
        onClose={onClose}
        open={open}
        mode={Mode.CREATE}
        xs={200}
        sm={300}
        md={400}
        xl={500}
      >
        <form noValidate onSubmit={handleSubmit(handleCreateUpdateAsset)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* <TextField
                {...register("Code")}
                fullWidth
                label="Equipment Code"
                variant="outlined"
                error={!!errors.Code}
                helperText={errors.Code?.message}
                value={fieldValues.Code}
                onChange={(e) => handleFieldChange("Code", e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: {
                    borderRadius: "15px", // Add border radius here
                  },
                }}
              />
              <TextField
                {...register("Name")}
                fullWidth
                label="Name"
                variant="outlined"
                error={!!errors.Name}
                helperText={errors.Name?.message}
                value={fieldValues.Name}
                onChange={(e) => handleFieldChange("Name", e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: {
                    borderRadius: "15px", // Add border radius here
                  },
                }}
              />
              <TextField
                {...register("EquipmentTypeId")}
                select
                fullWidth
                label="Equipment Type"
                variant="outlined"
                error={!!errors.EquipmentTypeId}
                helperText={errors.EquipmentTypeId?.message}
                value={
                  fieldValues.EquipmentTypeId === 0
                    ? ""
                    : (fieldValues.EquipmentTypeId ?? "")
                }
                onChange={(e) =>
                  handleFieldChange("EquipmentTypeId", e.target.value)
                }
                sx={{ mb: 2 }}
                InputProps={{
                  sx: {
                    borderRadius: "15px", // Add border radius here
                  },
                }}
              >
                {equipmentTypes?.map((item: ISelect) => (
                  <MenuItem
                    key={item.Value} // Ensure `item.Value` is unique for each `MenuItem`
                    value={item.Value}
                  >
                    {item.Label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                {...register("Location")}
                select
                fullWidth
                label="Location"
                variant="outlined"
                error={!!errors.Location}
                helperText={errors.Location?.message}
                value={fieldValues.Location ?? ""}
                onChange={(e) => handleFieldChange("Location", e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: {
                    borderRadius: "15px", // Add border radius here
                  },
                }}
              >
                {locations?.map((item: ISelect) => (
                  <MenuItem
                    key={item.Label} // Ensure `item.Value` is unique for each `MenuItem`
                    value={item.Label}
                  >
                    {item.Label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                {...register("PurchaseDate")}
                type="date"
                fullWidth
                label="Purchase Date"
                variant="outlined"
                //value={""}
                error={!!errors.PurchaseDate}
                helperText={errors.PurchaseDate?.message}
                value={
                  fieldValues.PurchaseDate
                    ? Utility.formatToDateInput(fieldValues.PurchaseDate)
                    : ""
                }
                onChange={(e) =>
                  handleFieldChange("PurchaseDate", e.target.value)
                }
                sx={{ mb: 2 }}
                slotProps={{
                  inputLabel: {
                    shrink: true, // Ensure label is always visible
                  },
                }}
                InputProps={{
                  sx: {
                    borderRadius: "15px", // Add border radius here
                  },
                }}
              /> */}
              <ReusableTextField
                register={register}
                name="Code"
                label="Equipment Code"
                error={!!errors.Code}
                helperText={errors.Code?.message}
                value={fieldValues.Code}
                onChange={(e) => handleFieldChange("Code", e.target.value)}
                borderRadius="15px"
              />
              <ReusableTextField
                register={register}
                fullWidth
                name="Name"
                label="Equipment Name"
                error={!!errors.Name}
                helperText={errors.Name?.message}
                value={fieldValues.Name}
                onChange={(e) => handleFieldChange("Name", e.target.value)}
                borderRadius="15px"
              />
              <ReusableTextField
                select={true}
                register={register}
                name="EquipmentTypeId"
                label="Equipment Type"
                error={!!errors.EquipmentTypeId}
                helperText={errors.EquipmentTypeId?.message}
                value={
                  fieldValues.EquipmentTypeId === 0
                    ? ""
                    : (fieldValues.EquipmentTypeId ?? "")
                }
                onChange={(e) =>
                  handleFieldChange("EquipmentTypeId", e.target.value)
                }
                options={equipmentTypes}
              />
              <ReusableTextField
                select={true}
                register={register}
                name="BuildingId"
                label="Location"
                error={!!errors.BuildingId}
                helperText={errors.BuildingId?.message}
                value={
                  fieldValues.BuildingId === 0
                    ? ""
                    : (fieldValues.BuildingId ?? "")
                }
                onChange={(e) =>
                  handleFieldChange("BuildingId", e.target.value)
                }
                options={locations}
              />
              <ReusableTextField
                type="date"
                register={register}
                name="PurchaseDate"
                label="Purchase Date"
                error={!!errors.PurchaseDate}
                helperText={errors.PurchaseDate?.message}
                value={
                  fieldValues.PurchaseDate
                    ? Utility.formatToDateInput(fieldValues.PurchaseDate)
                    : ""
                }
                onChange={(e) =>
                  handleFieldChange("PurchaseDate", e.target.value)
                }
              />
              <FormControl error={!!errors.EquipmentStatus}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Equipment Status
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  {...register("EquipmentStatus")}
                  value={fieldValues.EquipmentStatus || ""} // Ensure it defaults to an empty string
                  onChange={(e) =>
                    handleFieldChange("EquipmentStatus", e.target.value)
                  }
                >
                  <FormControlLabel
                    value="Working"
                    control={<Radio {...register("EquipmentStatus")} />}
                    label="Working"
                    name="EquipmentStatus"
                  />

                  <FormControlLabel
                    value="Defective"
                    control={<Radio {...register("EquipmentStatus")} />}
                    label="Defective"
                    name="EquipmentStatus"
                  />
                </RadioGroup>
                {errors.EquipmentStatus && (
                  <FormHelperText>
                    {errors.EquipmentStatus?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
              gap: 2,
            }}
          >
            <Button
              onClick={handleReset}
              variant="outlined"
              sx={{
                display: modalMode == Mode.CREATE ? "block" : "none",
                borderRadius: "15px",
              }}
            >
              <Typography>Reset</Typography>
            </Button>
            <Button
              disabled={modalMode === Mode.EDIT ? !hasChanges : false}
              type="submit"
              variant="contained"
              color="primary"
              sx={{ borderRadius: "15px" }}
            >
              <Typography>
                {modalMode == Mode.CREATE ? "Save" : "Update Changes"}
              </Typography>
            </Button>
          </Box>
        </form>
      </ReusableModal>

      <ReusableModal
        title={"Delete Equipment"}
        onClose={onCloseDeleteModal}
        open={deleteModalOpen}
        mode={Mode.DELETE}
        sm={400}
        xs={300}
        md={400}
        xl={450}
      >
        <>
          {!isUsed ? (
            <Box>
              <Typography
                sx={{
                  fontSize: 20,
                  marginTop: 2,
                  marginBottom: 1,
                }}
              >
                Are you sure you want to delete{" "}
                <strong>{fieldValues.Name}</strong>?
              </Typography>
              <Typography>This cannot be undone.</Typography>
            </Box>
          ) : (
            <Box>
              <Typography
                sx={{
                  fontSize: 20,
                  marginTop: 2,
                  marginBottom: 1,
                }}
              >
                <strong>{fieldValues.Name}</strong> is Currently being used in
                other table.
              </Typography>
              <Typography>
                Unable to delete Equipment <strong>{fieldValues.Name}</strong>.
              </Typography>
            </Box>
          )}
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                if (fieldValues.EquipmentId) {
                  handleDelete(fieldValues.EquipmentId);
                }

                // setOpen(true);
                // setHasChanges(true);
              }}
              sx={{
                display: isUsed ? "none" : "block",
                borderRadius: 7,
                marginTop: 3,
                background: "#212C5E",
                fontWeight: "bold",
                letterSpacing: 2,
                width: "50%",
              }}
            >
              Delete
            </Button>
          </Grid>
        </>
      </ReusableModal>
    </>
  );
}
export default Asset;
