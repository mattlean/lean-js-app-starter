import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FormInputsState {
  subject: string;
  comment: string;
}

const initialState: FormInputsState = {
  subject: "",
  comment: "",
};

/**
 * The formInputsSlice slice stores the input states for the NewThreadForm and
 * NewReplyForm components.
 *
 * While this does handle client-side input state, the main purpose of using Redux
 * for this instead of the standard React state is to persist input states when
 * server-side rendering. This case occurs when you submit a post form with invalid
 * inputs while JavaScript is disabled, so when the server-side rendering occurs
 * to display an error message, your input state will persist.
 */
export const formInputsSlice = createSlice({
  name: "formInputsSlice",
  initialState,
  reducers: {
    clearForm: () => initialState,
    setComment: (state: FormInputsState, action: PayloadAction<string>) => {
      state.comment = action.payload;
    },
    setSubject: (state: FormInputsState, action: PayloadAction<string>) => {
      state.subject = action.payload;
    },
  },
});

export const { clearForm, setComment, setSubject } = formInputsSlice.actions;

export const formInputsReducer = formInputsSlice.reducer;
