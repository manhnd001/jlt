"use client";

import Grid from "@mui/material/Grid2";
import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";

export default function AudioList({ items }) {
  if (!items.length) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Chưa có bài nghe nào. Hãy thêm bài đầu tiên!
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {items.map((audio) => (
        <Grid xs={12} md={6} key={audio.id ?? audio.title}>
          <Card variant="outlined" sx={{ height: "100%", borderRadius: 3 }}>
            <CardContent>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{audio.title}</Typography>
                  <Chip label="JLPT Listening" color="secondary" size="small" />
                </Stack>
                <Typography variant="subtitle2" color="text.secondary">
                  Văn bản tiếng Nhật
                </Typography>
                <Typography>{audio.script}</Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                  Dịch nghĩa
                </Typography>
                <Typography>{audio.translation}</Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                  File audio
                </Typography>
                <Typography component="a" href={audio.url} target="_blank" rel="noreferrer" color="primary">
                  Nghe ngay
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
