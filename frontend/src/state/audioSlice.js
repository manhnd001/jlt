"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

export const fetchAudios = createAsyncThunk("audio/fetchAll", async () => {
  const response = await fetch(`${API_BASE_URL}/audio`);
  if (!response.ok) {
    throw new Error("Không thể tải danh sách bài nghe");
  }
  return await response.json();
});

export const createAudio = createAsyncThunk("audio/create", async (payload) => {
  const response = await fetch(`${API_BASE_URL}/audio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "" }));
    throw new Error(error.message || "Không thể tạo bài nghe");
  }

  return await response.json();
});

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    createStatus: "idle",
    createError: null,
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
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createAudio.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.items = [action.payload, ...state.items];
      })
      .addCase(createAudio.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.error.message;
      });
  },
});

export default audioSlice.reducer;
