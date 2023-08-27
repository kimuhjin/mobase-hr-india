import { Dialog, Stack } from "@mui/material";

export const ProfileModal = ({ selectedUser, setSelectedUser }) => {
  return (
    <Dialog open={selectedUser !== null} onClose={() => setSelectedUser(null)}>
      <Stack sx={{ width: "400px", height: "300px", padding: "20px" }}>
        {selectedUser && (
          <Stack>
            <img
              src={selectedUser.profileImage}
              alt={selectedUser.name}
              style={{ width: "100px", height: "100px" }}
            />
            <h3>{selectedUser.name}</h3>
          </Stack>
        )}
      </Stack>
    </Dialog>
  );
};
