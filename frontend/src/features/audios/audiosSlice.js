import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const fetchAudios = createAsyncThunk("audios/fetchAll", async () => {
  const response = await fetch(`${API_BASE_URL}/audio`);
  if (!response.ok) {
    throw new Error("Không thể tải danh sách audio");
  }
  return response.json();
});

export const createAudio = createAsyncThunk("audios/create", async (payload) => {
  const response = await fetch(`${API_BASE_URL}/audio`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Không thể tạo bài luyện nghe");
  }

  return response.json();
});

const audiosSlice = createSlice({
  name: "audios",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudios.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAudios.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAudios.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createAudio.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAudio.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createAudio.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default audiosSlice.reducer;
