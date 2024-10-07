import { Button } from "@mui/material";
import { IDoorQueue } from "./Interface/DoorQueue.interface";

export default function DoorQueue({handleClick, doorId}: IDoorQueue) {
  return (
        <Button
            onClick={handleClick}
            variant="contained"
            color="primary"
            fullWidth
            sx={{
                textTransform: "none",
                fontWeight: 700,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: { xs: "16px", sm: "16px", md: "16px", xl: "24px" },
                borderRadius: "25px",
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                backgroundColor: "white",
                color: "primary.main",
                padding: "8px 16px",
            }}
        >
        Go to Door {doorId}
    </Button>
  )
}