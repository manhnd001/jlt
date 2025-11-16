"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { createAudio, fetchAudios } from "../features/audios/audiosSlice";

const initialFormState = {
  title: "",
  script: "",
  translation: "",
  url: "",
};

export default function Home() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.audios);
  const [formState, setFormState] = useState(initialFormState);
  const [submitMessage, setSubmitMessage] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAudios());
    }
  }, [dispatch, status]);

  const isLoading = status === "loading" && !items.length;

  const formIsValid = useMemo(() => {
    return Object.values(formState).every((value) => value.trim().length > 0);
  }, [formState]);

  const handleChange = (field) => (event) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitMessage(null);

    try {
      await dispatch(createAudio(formState)).unwrap();
      setFormState(initialFormState);
      setSubmitMessage({ type: "success", text: "Đã thêm bài luyện nghe mới!" });
    } catch (err) {
      setSubmitMessage({ type: "error", text: err.message || "Có lỗi xảy ra" });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={5}>
        <Stack spacing={1} textAlign="center">
          <GraphicEqIcon color="primary" sx={{ fontSize: 64, mx: "auto" }} />
          <Typography variant="h3" component="h1">
            Nhật Luyện Thính
          </Typography>
          <Typography color="text.secondary">
            Bộ khung đơn giản để lưu trữ và luyện nghe các đoạn hội thoại tiếng Nhật.
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h6">Thêm bài nghe nhanh</Typography>
            <TextField
              label="Tiêu đề"
              value={formState.title}
              onChange={handleChange("title")}
              required
              fullWidth
            />
            <TextField
              label="Nội dung tiếng Nhật"
              multiline
              minRows={3}
              value={formState.script}
              onChange={handleChange("script")}
              required
              fullWidth
            />
            <TextField
              label="Bản dịch tiếng Việt"
              multiline
              minRows={3}
              value={formState.translation}
              onChange={handleChange("translation")}
              required
              fullWidth
            />
            <TextField
              label="Đường dẫn audio (.mp3)"
              value={formState.url}
              onChange={handleChange("url")}
              required
              fullWidth
            />
            {submitMessage && (
              <Alert severity={submitMessage.type}>{submitMessage.text}</Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<PlaylistAddIcon />}
              disabled={!formIsValid || status === "loading"}
            >
              Lưu bài nghe
            </Button>
          </Stack>
        </Box>

        <Stack spacing={2}>
          <Typography variant="h6">Danh sách bài nghe</Typography>
          {isLoading && (
            <Stack alignItems="center" py={3}>
              <CircularProgress />
            </Stack>
          )}
          {status === "failed" && (
            <Alert severity="error">{error}</Alert>
          )}
          {!isLoading && items.length === 0 && (
            <Alert severity="info">Chưa có bài nghe nào. Hãy thêm bài mới!</Alert>
          )}
          <Stack spacing={2}>
            {items.map((audio) => (
              <Card key={audio.id ?? audio.title} variant="outlined">
                <CardContent>
                  <Typography variant="h6">{audio.title}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {audio.createdAt
                      ? new Date(audio.createdAt).toLocaleString("vi-VN")
                      : "Vừa thêm"}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{audio.script}</Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    {audio.translation}
                  </Typography>
                  <Button
                    href={audio.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mt: 2 }}
                  >
                    Nghe thử
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
