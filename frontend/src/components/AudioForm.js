"use client";

import { useState } from "react";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";

const initialForm = { title: "", script: "", translation: "", url: "" };

export default function AudioForm({ onSubmit, isLoading, error }) {
  const [formValues, setFormValues] = useState(initialForm);
  const [touched, setTouched] = useState(false);

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched(true);
    if (Object.values(formValues).some((value) => !value.trim())) {
      return;
    }

    try {
      await onSubmit(formValues);
      setFormValues(initialForm);
      setTouched(false);
    } catch (submitError) {
      console.error(submitError);
    }
  };

  const showValidation = touched && Object.values(formValues).some((value) => !value.trim());

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor: "#fff", p: 3, borderRadius: 3, boxShadow: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Thêm bài nghe mới</Typography>
        <TextField name="title" label="Tiêu đề" value={formValues.title} onChange={handleChange} required fullWidth />
        <TextField
          name="script"
          label="Nội dung tiếng Nhật"
          value={formValues.script}
          onChange={handleChange}
          required
          multiline
          minRows={3}
        />
        <TextField
          name="translation"
          label="Dịch tiếng Việt"
          value={formValues.translation}
          onChange={handleChange}
          required
          multiline
          minRows={3}
        />
        <TextField name="url" label="Liên kết audio" value={formValues.url} onChange={handleChange} required fullWidth />
        {showValidation && <Alert severity="warning">Vui lòng điền đầy đủ thông tin.</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Đang lưu..." : "Lưu bài nghe"}
        </Button>
      </Stack>
    </Box>
  );
}
