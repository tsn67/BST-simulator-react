import { create } from "zustand";


export const updateContollerStore = create((set) => ({
    updateStatus: false,
    updateState: () =>
        set((state) => ({updateStatus: !state.updateStatus})),
}));
