import { ChangeEvent, useEffect, useState } from "react";
import ITableData, {
  IPagination,
  ITableHeader,
} from "../../Components/ReusableTable/interface/IReusableTableProps.interface";
import ReusableTable from "../../Components/ReusableTable/ReusableTable";
import { AlertColor, Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, SelectChangeEvent, Typography } from "@mui/material";
import ColorBuilder from "../../Components/ColorBuilder/ColorBuilder";
import * as Yup from "yup";
import Grid from '@mui/material/Grid2'
import ReusableModal from "../../Components/ReusableModal/ReusableModal";
import Mode from "../../Components/ReusableModal/Enum/enum";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ReusableTextField from "../../Components/ReusableTextField/ReusableTextField";
import { ISelect } from "../../Shared/Interface/ISelect.interface";
import ICreateUserDto from "../../Shared/Services/User/interface/CreateUserDto.interface";
import { UserService } from "../../Shared/Services/User/UserService";
import Notice from "../../Components/Notice/Notice";
import SkillService from "../../Shared/Services/Skill/SkillService";
import ICheckbox from "../../Shared/Interface/Checkbox.interface";
import RolesService from "../../Shared/Services/Role/RoleService";
import TeamService from "../../Shared/Services/Teams/TeamsService";
import DcService from "../../Shared/Services/Dc/DcService";
import UserDesignationService from "../../Shared/Services/UserDesignation/UserDesignationService";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";


const validationSchema = Yup.object().shape({
  EmployeeNumber: Yup.string()
    .transform((value) => (value === 0 ? undefined : value))
    .required("Employee Number is required")
    .typeError("Employee Number is required"),
  EmploymentStatus: Yup.mixed()
    .transform((value) => (value === "" || 0 ? undefined : value))
    .required("Status is required")
    .typeError("Status is required"),
  FirstName: Yup.string().required("First Name is required"),
  LastName: Yup.string().required("Last Name is required"),
  MiddleName: Yup.string().nullable(),
  DesignationId: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === "" || originalValue === 0 ? null : value;
    })
    .nullable(),
  LocationId: Yup.number().
    transform(value => value === 0 ? undefined : value)
    .required("Location is required")
    .typeError("Location is required"),
  TeamId: Yup.number()
    .transform(value => value === 0 ? undefined : value)
    .required("Team is required")
    .typeError("Team is required"),

})

export type ValidationSchemaType = Yup.InferType<typeof validationSchema>;

interface IOptions {
  [key: string]: number[];
}

function Employees() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<ITableData[]>([] as ITableData[]);
  const [modalMode, setModalMode] = useState<Mode>(Mode.CREATE);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(0);

  const [hasTouchedRoles, setHasTouchedRoles] = useState<boolean>(false);
  const [hasTouchedSkills, setHasTouchedSkills] = useState<boolean>(false);

  const [teamDropdown, setTeamDropdown] = useState<ISelect[]>(
    [] as ISelect[]
  );
  const [dcDropdown, setDcDropdown] = useState<ISelect[]>(
    [] as ISelect[]
  );
  const [userDesignationDropdown, setUserDesignationDropdown] = useState<ISelect[]>(
    [] as ISelect[]
  );
  const [skills, setSkills] = useState<ICheckbox[]>(
    [] as ICheckbox[]
  );

  const [roles, setRoles] = useState<ICheckbox[]>(
    [] as ICheckbox[]
  );

  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isUsed, setIsUsed] = useState(false);

  const [option, setOption] = useState<IOptions>({ roles: [], skills: [] });
  const [prevOption, setPrevOption] = useState<IOptions>({ roles: [], skills: [] });

  const [fieldValues, setFieldValues] = useState<ValidationSchemaType>(
    {} as ValidationSchemaType
  );
  const [previousData, setPreviousData] = useState<ValidationSchemaType>(
    {} as ValidationSchemaType
  );

  const hasChangesInData = () => {
    const hasChanged = JSON.stringify(previousData) !== JSON.stringify(fieldValues);
    const hasChangedOption = JSON.stringify(prevOption) !== JSON.stringify(option);

    setHasChanges(hasChanged || hasChangedOption);
  };

  useEffect(() => {
    hasChangesInData();
  }, [fieldValues, option]);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<ValidationSchemaType>({
    resolver: yupResolver(validationSchema)
  });

  const [state, setState] = useState<IPagination>({
    searchQuery: "",
    pageNumber: 1,
    pageSize: 10,
    pageCount: 0,
    columnToSort: "",
    orderBy: "asc",
  });

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
    console.log(name, "ColumnName");
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
    console.log(search, "this is search");
  }

  function handleSetItemPerPage(event: SelectChangeEvent<number>) {
    setState((prevPagination) => ({
      ...prevPagination,
      pageSize: event.target.value as number,
      pageNumber: 1,
    }));
    console.log(event, "item perpage");
  }

  async function GetTeamList() {
    const response = await UserService.GetUsersAsync(state)
    const data: ITableData[] = response.data.data

    const dummyData = data.map((item) => ({
      ...item,
      ColorCode: (
        <ColorBuilder
          header="Team"
          value={item.ColorCode as string}
          row={item}
        />
      ),
    }));

    console.log(response)
    setUsers(dummyData);
    setPage(response.data.count);
  }

  useEffect(() => {
    GetTeamList()
  }, [state]);

  const handleOpen = async () => {
    setOpen(true);
    setModalMode(Mode.CREATE);
    getUserDesignationDto()
    GetSkillDto()
    GetTeamDto()
    GetRoleDto()
    GetDcDto()
    setUserId(0)
  };

  const handleEdit = async (id: unknown[]) => {
    const userId = id.length == 1 ? id[0] as number : 0;
    const response = await UserService.GetUserById(userId as number);

    setOption((prev) => ({
      ...prev,
      ['roles']: response.data.RoleIds,
      ['skills']: response.data.SkillIds
    }))

    setPrevOption((prev) => ({
      ...prev,
      ['roles']: response.data.RoleIds,
      ['skills']: response.data.SkillIds
    }))

    const prev = {
      DesignationId: response.data.DesignationId,
      EmployeeNumber: response.data.EmployeeNumber,
      EmploymentStatus: response.data.EmploymentStatus,
      FirstName: response.data.FirstName,
      LastName: response.data.LastName,
      LocationId: response.data.LocationId,
      MiddleName: response.data.MiddleName,
      TeamId: response.data.TeamId
    }

    setPreviousData(prev)
    reset(prev);
    setFieldValues(prev)
    handleOpen();
    setUserId(userId)
    setModalMode(Mode.EDIT);
  };

  const handleGetDetailsToDelete = async (ids: unknown[]) => {
    const id = ids.length > 0 ? ids[0] : null;
    setUserId(id as number);

    const response = await UserService.GetUserById(id as number);
    const isUsedResponse = await UserService.UsageCheck(id as number);

    fieldValues.EmployeeNumber = response.data.EmployeeNumber;

    if (isUsedResponse.data) {
      setIsUsed(true)
    }

    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    const response = await UserService.DeleteUserAsync(userId);

    if (response.Success) {
      setDeleteModalOpen(false);
      setSnackbarSeverity("success");
      setNotificationMessage(
        "Successfully Deleted"
      );
      setIsSnackbarOpen(true);
      GetTeamList();
    } else {
      setDeleteModalOpen(false);
      setSnackbarSeverity("error");
      setNotificationMessage("An error occured.");
      setIsSnackbarOpen(true);
    }
  };

  const init = {
    DesignationId: 0,
    EmployeeNumber: "",
    EmploymentStatus: "",
    FirstName: "",
    LastName: "",
    LocationId: 0,
    MiddleName: "",
    TeamId: 0
  }

  const onClose = async () => {
    setOpen(false);
    reset(init);

    setOption((prev) => ({
      ...prev,
      ['roles']: [],
      ['skills']: []
    }))

    setFieldValues(init)
    setHasTouchedRoles(false)
    setHasTouchedSkills(false)
  };

  const onCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setFieldValues(init);
    setIsUsed(false);
  };

  const handleCreateUpdateAsset = async (data: ValidationSchemaType) => {
    if (option.roles && option.skills) {
      const user: ICreateUserDto = {
        UserId: userId,
        EmployeeNumber: data.EmployeeNumber,
        EmploymentStatus: data.EmploymentStatus,
        FirstName: data.FirstName,
        LastName: data.LastName,
        MiddleName: data.MiddleName,
        LocationId: data.LocationId,
        RoleIds: option.roles,
        SkillIds: option.skills,
        TeamId: data.TeamId,
        DesignationId: data.DesignationId
      }

      const duplicateRes = await UserService.IsDataExist({
        EmployeeNumber: user.EmployeeNumber,
        FirstName: user.FirstName,
        LastName: user.LastName,
        MiddleName: user.MiddleName,
        UserId: userId
      })

      if (duplicateRes.data) {
        setSnackbarSeverity("error");
        setIsSnackbarOpen(true);
        setNotificationMessage("User is Already exist!");
        return;
      }

      const response = modalMode == Mode.CREATE
        ? await UserService.CreateAsync(user)
        : await UserService.UpdateAsync(user);

      if (response.Success) {
        onClose();
        setSnackbarSeverity("success");
        setIsSnackbarOpen(true);
        setNotificationMessage(
          modalMode === Mode.CREATE
            ? "Save Sucessfully"
            : "Update Changes Successfully"
        );
        GetTeamList();
      } else {
        onClose();
        setSnackbarSeverity("error");
        setIsSnackbarOpen(true);
        setNotificationMessage("An error occured.");
      }
    }
  };

  const header: ITableHeader[] = [
    { Name: "EmployeeNumber", Key: "EmployeeNumber" },
    { Name: "FullName", Key: "FullName" },
    { Name: "Designation", Key: "Designation" },
    { Name: "Ranks", Key: "Ranks" },
    { Name: "Team", Key: "Team" },
    { Name: "Shift", Key: "Shift" },
    { Name: "Location", Key: "Location" },
    { Name: "Skills", Key: "Skills" },
  ];

  const filters = [
    { FilterName: "Show All", Value: "" },
    { FilterName: "Group by Team", Value: "Sort by team" },
    { FilterName: "Group by Rank", Value: "Sort by Rank" },
    { FilterName: "Group by Location", Value: "Sort by Location" },
  ];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked } = e.target;

    switch (name) {
      case "skills":
        setHasTouchedSkills(option["skills"].length == 0);
        break;
      case "roles":
        setHasTouchedRoles(option["roles"].length == 0);
        break;
      default:
        break;
    }

    const roleId = Number(value);
    if (checked) {
      setOption((prev: IOptions) => ({
        ...prev,
        [name]: Array.isArray(prev[name])
          ? [...prev[name], roleId]
          : [roleId],
      }));
    } else {
      setOption((prev: IOptions) => ({
        ...prev,
        [name]: prev[name].filter((id) => id !== roleId)
      }))
    }
  };

  function handleFieldChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    clearErrors(name as keyof ValidationSchemaType)

    setFieldValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function GetSkillDto() {
    const response = await SkillService.GetSkillSelect();

    console.log(response)
    setSkills(response.data)
  }

  async function GetTeamDto() {
    const response = await TeamService.GetSelectTeam();

    setTeamDropdown(response.data);
  }

  async function GetRoleDto() {
    const response = await RolesService.GetSelectRoles();

    setRoles(response.data)
  }

  async function GetDcDto() {
    const response = await DcService.GetDcSelect()

    setDcDropdown(response);
  }

  const getUserDesignationDto = async () => {
    const response = await UserDesignationService.GetUserDesignationSelect()

    setUserDesignationDropdown(response.data)
  }

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

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
        IdName="UserId"
        customFilters={filters}
        headerName="Employee Masterlist"
        searchName=" Search Employee"
        linkName="Switch to Teams"
        link="/Teams"
        data={users}
        handleOpen={handleOpen}
        handleEdit={handleEdit}
        handleDelete={handleGetDetailsToDelete}
        handleSortChange={handleSortChange}
        handleSetPage={handleSetPage}
        handleSetSearchQuery={handleSetSearchQuery}
        handleSetItemPerPage={handleSetItemPerPage}
        pageNumber={page}
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
        xl={900}
        md={900}
      >
        <form noValidate onSubmit={handleSubmit(handleCreateUpdateAsset)}>
          <Grid container spacing={2}>
            <Grid size={4}>
              <ReusableTextField
                fullWidth
                register={register}
                name="EmployeeNumber"
                label="Employee Number"
                error={!!errors.EmployeeNumber}
                helperText={errors.EmployeeNumber?.message}
                value={fieldValues.EmployeeNumber === "" ? "" : fieldValues.EmployeeNumber}
                onChange={(e) =>
                  handleFieldChange(e)
                }
                borderRadius="15px"
              />
              <ReusableTextField
                fullWidth
                register={register}
                name="FirstName"
                label="First Name"
                error={!!errors.FirstName}
                helperText={errors.FirstName?.message}
                value={fieldValues.FirstName === "" ? "" : fieldValues.FirstName}
                onChange={(e) =>
                  handleFieldChange(e)
                }
                borderRadius="15px"
              />
              <ReusableTextField
                register={register}
                name="MiddleName"
                label="Middle Name"
                error={!!errors.MiddleName}
                helperText={errors.MiddleName?.message}
                value={fieldValues.MiddleName == null ? "" : fieldValues.MiddleName}
                onChange={(e) =>
                  handleFieldChange(e)
                }
                borderRadius="15px"
              />
              <ReusableTextField
                fullWidth
                register={register}
                name="LastName"
                label="Last Name"
                error={!!errors.LastName}
                helperText={errors.LastName?.message}
                value={fieldValues.LastName === "" ? "" : fieldValues.LastName}
                onChange={(e) =>
                  handleFieldChange(e)
                }
                borderRadius="15px"
              />
              <ReusableTextField
                select
                register={register}
                name="LocationId"
                label="Location"
                error={!!errors.LocationId}
                helperText={errors.LocationId?.message}
                value={fieldValues.LocationId == null ? "" : fieldValues.LocationId}
                onChange={(e) =>
                  handleFieldChange(e)
                }
                options={dcDropdown}
                borderRadius="15px"
              />

              <ReusableTextField
                select
                register={register}
                name="DesignationId"
                label="Designation"
                error={!!errors.DesignationId}
                helperText={errors.DesignationId?.message}
                value={fieldValues.DesignationId == null ? "" : fieldValues.DesignationId}
                onChange={(e) =>
                  handleFieldChange(e)
                }
                options={userDesignationDropdown}
                borderRadius="15px"
              />
            </Grid>
            <Grid size={8}>
              <ReusableTextField
                select
                register={register}
                name="TeamId"
                label="Team"
                error={!!errors.TeamId}
                helperText={errors.TeamId?.message}
                value={fieldValues.TeamId == null ? "" : fieldValues.TeamId}
                onChange={(e) =>
                  handleFieldChange(e)
                }
                options={teamDropdown}
                borderRadius="15px"
              />

              <FormControl error={!!errors.EmploymentStatus}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Employment Status
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  {...register("EmploymentStatus")}
                  value={fieldValues.EmploymentStatus || ""}
                  onChange={(e) =>
                    handleFieldChange(e)
                  }
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio {...register("EmploymentStatus")} />}
                    label="Working"
                    name="EquipmentStatus"

                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio {...register("EmploymentStatus")} />}
                    label="Defective"
                    name="EquipmentStatus"
                  />
                </RadioGroup>

                {errors.EmploymentStatus && (
                  <FormHelperText>
                    {errors.EmploymentStatus?.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box margin={1}>
                <Typography>Skills</Typography>

                {
                  skills.map(skill => {
                    return <FormControlLabel
                      key={skill.Id}
                      label={skill.Name}
                      control={
                        <Checkbox
                          aria-label={skill.Name}
                          size="medium"
                          value={skill.Id || ''}
                          name="skills"
                          checked={option["skills"].includes(skill.Id) || false}
                          onChange={(e) => handleCheckboxChange(e)}
                        />
                      }
                    />
                  })
                }

                {(option['skills']?.length === 0 && hasTouchedSkills) && (
                  <FormHelperText sx={{ color: "red" }}>
                    Please Select One
                  </FormHelperText>
                )}
                <Typography>Roles</Typography>

                {roles.map(role => (
                  <FormControlLabel
                    key={role.Id}
                    label={role.Name}
                    control={
                      <Checkbox
                        aria-label={role.Name}
                        size="medium"
                        value={role.Id || ''}
                        checked={option["roles"].includes(role.Id) || false}
                        name="roles"
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                    }
                  />
                ))}

                {(option['roles']?.length === 0 && hasTouchedRoles) && (
                  <FormHelperText sx={{ color: "red" }}>
                    Please Select One
                  </FormHelperText>
                )}
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              onClick={() => {
                reset(init)
                setFieldValues(init)
                setHasTouchedRoles(false)
                setHasTouchedSkills(false)
              }}
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
              onClick={() => {
                setHasTouchedRoles(true)
                setHasTouchedSkills(true)
              }}
            >
              <Typography>
                {modalMode == Mode.CREATE ? "Save" : "Update Changes"}
              </Typography>
            </Button>
          </Box>
        </form>
      </ReusableModal >
      <ReusableModal
        title={"Delete User"}
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
                Are you sure you want to delete Employee{" "}
                <strong>{fieldValues.EmployeeNumber}</strong>?
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
                <strong>{fieldValues.EmployeeNumber}</strong> is Currently being used in
                other table.
              </Typography>
              <Typography>
                Unable to delete Equipment <strong>{fieldValues.EmployeeNumber}</strong>.
              </Typography>
            </Box>
          )}
          <Grid
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

                handleDelete()

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

export default Employees;
