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
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import ColorBuilder from "../../Components/ColorBuilder/ColorBuilder";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ReusableModal from "../../Components/ReusableModal/ReusableModal";
import ReusableTextField from "../../Components/ReusableTextField/ReusableTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import Mode from "../../Components/ReusableModal/Enum/enum";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { locationService } from "../../Shared/Services/Location/Location";
import Notice from "../../Components/Notice/Notice";
import ReusableDay from "../../Components/ReusableDaySchedule/ReusableDay";
import ReusableSchedule from "../../Components/ReusableDaySchedule/ReusableSchedule";
import ICreateUpdateTeams from "./interface/CreateUpdateTeams.interface";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import TeamService from "../../Shared/Services/Teams/TeamsService";
import { ISelect } from "../../Shared/Interface/ISelect.interface";
import DcService from "../../Shared/Services/Dc/DcService";

const validation = Yup.object().shape({
  TeamId: Yup.number().notRequired(),
  Name: Yup.string().required("Team Name is required"),
  ColorCode: Yup.string().required("Color Code is required"),
  Area: Yup.string().required("Area is required"),
  LocationId: Yup.number()
    .transform((value) => (value === "" ? null : value == 0 ? null : value))
    .nullable()
    .required("Location is required")
    .typeError("Location Type is required"),
  ScheduleDateId: Yup.number()
    .transform((value) => (value === "" ? null : value == 0 ? null : value))
    .nullable()
    .required("Scheduled is required")
    .typeError("Scheduled is required"),
});

function Teams() {
  type FieldName = keyof ICreateUpdateTeams;
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ICreateUpdateTeams>({
    resolver: yupResolver(validation),
  });

  const [page, setPage] = useState(1);
  const [team, setTeam] = useState<ITableData[]>([] as ITableData[]);
  const [modalMode, setModalMode] = useState<Mode>(Mode.CREATE);
  const [open, setOpen] = useState(false);
  const [fieldValues, setFieldValues] = useState<ICreateUpdateTeams>(
    {} as ICreateUpdateTeams
  );
  const [locations, setLocations] = useState<ISelect[]>([] as ISelect[]);
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [previousData, setPreviousData] = useState<ICreateUpdateTeams>(
    {} as ICreateUpdateTeams
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  //const [employee, setEmployee] = useState<ITableData[]>([] as ITableData[]);
  const [state, setState] = useState<IPagination>({
    searchQuery: "",
    pageNumber: 1,
    pageSize: 10,
    pageCount: 0,
    columnToSort: "",
    orderBy: "asc",
  });

  const initialValues: ICreateUpdateTeams = {
    Name: "", // Initial name as an empty string
    ColorCode: "", // Default color code (black)
    Area: "", // Initial area as an empty string
    LocationId: 0, // Set to a default building ID
    ScheduleDateId: 0, // Set to a default schedule date ID
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

  const hasChangesInData = (edited: ICreateUpdateTeams) => {
    const hasChanged = JSON.stringify(previousData) !== JSON.stringify(edited);

    setHasChanges(hasChanged);
  };

  useEffect(() => {
    hasChangesInData(fieldValues);
  }, [fieldValues]);

  async function GetTeamList() {
    const response = await TeamService.GetTeamsList(state);

    const teamList: ITableData[] = response.data.data.map((item: unknown) => {
      const teamsItem = item as ITableData;

      return {
        ...teamsItem,
        ...mapBooleansToIcons(teamsItem),
        ColorCode: (
          <ColorBuilder
            header=""
            value={teamsItem.ColorCode as string}
            row={teamsItem}
          />
        ),
      };
    });

    setTeam(teamList);
    setPage(response.data.count);
  }

  useEffect(() => {
    const fetchData = async () => {
      await GetTeamList();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, state, open, deleteModalOpen]);

  const mapBooleansToIcons = (item: Record<string, unknown>) =>
    Object.fromEntries(
      Object.entries(item).map(([key, value]) => [
        key,
        typeof value === "boolean" ? (
          value ? (
            <CheckBoxOutlinedIcon sx={{ fontSize: 25, color: "#00B050" }} />
          ) : (
            <DangerousIcon color="error" sx={{ fontSize: 25 }} />
          )
        ) : (
          value
        ),
      ])
    );

  const fetchDropdownData = async (): Promise<{
    locations: ISelect[];
  }> => {
    const locations = await DcService.GetDcSelect();

    return { locations };
  };

  const handleOpen = async () => {
    setOpen(true);
    setModalMode(Mode.CREATE);
    const { locations } = await fetchDropdownData();
    setLocations(locations);
  };

  const handleCreateUpdateAsset = async (data: ICreateUpdateTeams) => {
    data.TeamId = fieldValues.TeamId;
    const isDataExist = await TeamService.IsDataExist(data);

    if (isDataExist.data) {
      setSnackbarSeverity("error");
      setIsSnackbarOpen(true);
      setNotificationMessage("Team is Already exist!");
      return;
    }

    let success = false;
    if (modalMode === Mode.CREATE) {
      const response = await TeamService.CreateTeamAsync(data);
      success = response ?? false;
    } else {
      const response = await TeamService.UpdateTeamAsync(data);
      success = response ?? false;
    }

    if (success) {
      onClose();
      setSnackbarSeverity("success");
      setIsSnackbarOpen(true);
      setNotificationMessage(
        modalMode === Mode.CREATE
          ? "Save Sucessfully"
          : "Update Changes Successfully"
      );
    } else {
      onClose();
      setSnackbarSeverity("error");
      setIsSnackbarOpen(true);
      setNotificationMessage("An error occured.");
    }
  };

  const handleGetDetailsToEdit = async (id: unknown[]) => {
    const equpmentMentId = id.length > 0 ? id[0] : null;

    const response = await TeamService.GetTeamById(equpmentMentId as number);
    const { locations } = await fetchDropdownData();

    setLocations(locations);
    setFieldValues(response.data);
    setPreviousData(response.data);
    setOpen(true);
    setModalMode(Mode.EDIT);
  };

  const handleGetDetailsToDelete = async (id: unknown[]) => {
    const equpmentMentId = id.length > 0 ? id[0] : null;

    const response = await TeamService.GetTeamById(equpmentMentId as number);
    fieldValues.TeamId = response.data.TeamId;
    fieldValues.Name = response.data.Name;
    setDeleteModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const response = await TeamService.DeleteTeamAsync(id);
    if (response) {
      onCloseDeleteModal();
      setIsSnackbarOpen(true);
      setSnackbarSeverity("success");
      setNotificationMessage(fieldValues.Name + " is Deleted successfully");
    } else {
      setSnackbarSeverity("error");
      setIsSnackbarOpen(true);
      setNotificationMessage("An error occured");
    }
  };

  const onClose = async () => {
    setOpen(false);
    setFieldValues(initialValues);
    reset();
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleFieldChange = (name: FieldName, value: unknown) => {
    setFieldValues((prev) => ({ ...prev, [name]: value }));
    clearErrors(name);
  };

  const onCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setFieldValues(initialValues);
    setIsUsed(false);
  };

  const handleReset = async () => {
    setFieldValues(initialValues);
  };

  const header: ITableHeader[] = [
    { Name: "Team Name", Key: "Name" },
    { Name: "Color Code", Key: "ColorCode" },
    { Name: "Shift", Key: "Schedule" },
    { Name: "Area", Key: "Area" },
    { Name: "Location", Key: "Location" },
    { Name: "Sun", Key: "Sun" },
    { Name: "Mon", Key: "Mon" },
    { Name: "Tue", Key: "Tue" },
    { Name: "Wed", Key: "Wed" },
    { Name: "Thu", Key: "Thu" },
    { Name: "Fri", Key: "Fri" },
    { Name: "Sat", Key: "Sat" },
  ];

  const filters = [
    { FilterName: "Show All", Value: "" },
    { FilterName: "Group by Team", Value: "Team Name" },
    { FilterName: "Group by Shift", Value: "Shift" },
    { FilterName: "Group by Location", Value: "Location" },
  ];

  const daysOfWeek = [
    { name: "Sun", timeIn: "--", timeOut: "--" },
    { name: "Mon", timeIn: "7:00 AM", timeOut: "5:00 PM" },
    { name: "Tue", timeIn: "7:00 AM", timeOut: "5:00 PM" },
    { name: "Wed", timeIn: "7:00 AM", timeOut: "5:00 PM" },
    { name: "Thu", timeIn: "7:00 AM", timeOut: "5:00 PM" },
    { name: "Fri", timeIn: "7:00 AM", timeOut: "5:00 PM" },
    { name: "Sat", timeIn: "7:00 AM", timeOut: "5:00 PM" },
  ];

  const scheduleEntries = [
    {
      Value: "1",
      Label: "Day shift",
      Icon: <LightModeIcon sx={{ color: "#FFD700" }} />,
    },
    {
      Value: "2",
      Label: "Night shift",
      Icon: <ModeNightIcon sx={{ color: "#C0C0C0" }} />,
    },
    {
      Value: "3",
      Label: "Mid shift",
      Icon: <Brightness4Icon sx={{ color: "#4682B4" }} />,
    },
  ];

  return (
    <>
      <Notice
        IsSnackbarOpen={isSnackbarOpen}
        SuccessMessage={notificationMessage}
        ErrorMessage={notificationMessage}
        Severity={snackbarSeverity}
        handleSnackbarClose={handleSnackbarClose}
      />
      <ReusableTable
        state={state}
        headers={header}
        IdName="TeamId"
        customFilters={filters}
        headerName="Team Masterlist"
        searchName=" Search Team"
        linkName="Switch to Employee"
        link="/Employees"
        data={team}
        handleOpen={handleOpen}
        handleSortChange={handleSortChange}
        handleSetPage={handleSetPage}
        handleSetSearchQuery={handleSetSearchQuery}
        handleSetItemPerPage={handleSetItemPerPage}
        pageNumber={page}
        handleEdit={handleGetDetailsToEdit}
        handleDelete={handleGetDetailsToDelete}
      />
      <ReusableModal
        title={
          modalMode === Mode.CREATE
            ? "Enrollment – Team"
            : modalMode === Mode.EDIT
              ? "Update - Team"
              : "Delete - Team"
        }
        onClose={onClose}
        open={open}
        mode={Mode.CREATE}
        xs={200}
        sm={600}
        md={620}
        xl={750}
      >
        <form noValidate onSubmit={handleSubmit(handleCreateUpdateAsset)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ReusableTextField
                register={register}
                name="Name"
                label="Team Name"
                error={!!errors.Name}
                helperText={errors.Name?.message}
                value={fieldValues.Name}
                onChange={(e) => handleFieldChange("Name", e.target.value)}
                borderRadius="15px"
              />
              <ReusableTextField
                register={register}
                name="ColorCode"
                label="Color Code"
                error={!!errors.ColorCode}
                helperText={errors.ColorCode?.message}
                value={fieldValues.ColorCode}
                isColorPicker={true}
                onChange={(e) => handleFieldChange("ColorCode", e.target.value)}
                borderRadius="15px"
              />
              <ReusableTextField
                register={register}
                name="Area"
                label="Area"
                error={!!errors.Area}
                helperText={errors.Area?.message}
                value={fieldValues.Area}
                onChange={(e) => handleFieldChange("Area", e.target.value)}
                borderRadius="15px"
              />
              <ReusableTextField
                select={true}
                register={register}
                name="LocationId"
                label="Location"
                error={!!errors.LocationId}
                helperText={errors.LocationId?.message}
                value={
                  fieldValues.LocationId === 0
                    ? ""
                    : (fieldValues.LocationId ?? "")
                }
                onChange={(e) =>
                  handleFieldChange("LocationId", e.target.value)
                }
                borderRadius="15px"
                options={locations}
              />
            </Grid>

            {/* Separate column for Schedule */}
            <Grid item xs={12} sm={6}>
              <ReusableTextField
                select={true}
                register={register}
                name="ScheduleDateId"
                label="Schedule"
                error={!!errors.ScheduleDateId}
                helperText={errors.ScheduleDateId?.message}
                value={
                  fieldValues.ScheduleDateId === 0
                    ? ""
                    : (fieldValues.ScheduleDateId ?? "")
                }
                onChange={(e) =>
                  handleFieldChange("ScheduleDateId", e.target.value)
                }
                borderRadius="15px"
                options={scheduleEntries}
              />
              <ReusableDay />
              <Grid item xs={12} sm={12}>
                {fieldValues.ScheduleDateId ? (
                  <ReusableSchedule daysOfWeek={daysOfWeek} height={21} />
                ) : (
                  <></>
                )}
              </Grid>
            </Grid >
          </Grid >
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
        </form >
      </ReusableModal >
      <ReusableModal
        title={"Delete Team"}
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
                if (fieldValues.TeamId) {
                  handleDelete(fieldValues.TeamId);
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

export default Teams;
