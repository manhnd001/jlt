"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box, Container, Divider, Stack, Typography } from "@mui/material";
import AudioForm from "../components/AudioForm";
import AudioList from "../components/AudioList";
import { createAudio, fetchAudios } from "../state/audioSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { items, status, error, createStatus, createError } = useSelector((state) => state.audio);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAudios());
    }
  }, [dispatch, status]);

  const handleSubmit = (values) => dispatch(createAudio(values)).unwrap();

  return (
    <Box sx={{ background: "linear-gradient(135deg, #fff7f7 0%, #f1f7ff 100%)", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography variant="h3" fontWeight={600} color="primary">
              Luyện nghe tiếng Nhật
            </Typography>
            <Typography color="text.secondary">
              Quản lý các bài nghe ngắn kèm bản dịch để ôn tập JLPT.
            </Typography>
          </Stack>
          <AudioForm onSubmit={handleSubmit} isLoading={createStatus === "loading"} error={createError} />
          <Divider />
          <Stack spacing={2}>
            <Typography variant="h5">Danh sách bài nghe</Typography>
            {status === "loading" && <Typography color="text.secondary">Đang tải danh sách...</Typography>}
            {status === "failed" && <Alert severity="error">{error}</Alert>}
            <AudioList items={items} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
