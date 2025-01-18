import { useEffect, useState } from "react";

import { Avatar, Skeleton, Stack } from "@mui/material";
import { useFetchData } from "6pp";

// assets
import { transformImage } from "../../components/lib/features";

import { useErrors } from "../../hooks/hook";
import { server } from "../../constants/config";

// child components
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from "../../components/shared/Table";
import AvatarCard from "../../components/shared/AvatarCard";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "groupChat",
    headerName: "Group",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/chats`,
    "dashboard-chats"
  );

  useErrors([{ isError: error, error }]);

  useEffect(() => {
    if (data && data.chats.length) {
      setRows(
        data.chats.map((i) => ({
          ...i,
          id: i._id,
          avatar: i.avatar.map((el) => transformImage(el, 50)),
          members: i.members.map((el) => transformImage(el.avatar, 50)),
          creator: {
            ...i.creator,
            avatar: transformImage(i.creator.avatar, 50),
          },
        }))
      );
    }
  }, [data]);

  return loading ? (
    <Skeleton height={"100vh"} />
  ) : (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading={"All Chats"} />
    </AdminLayout>
  );
};

export default ChatManagement;
